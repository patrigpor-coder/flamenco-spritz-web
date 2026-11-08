#!/usr/bin/env python3
"""
Procesa las fotos de la carpeta fotos/ para la web publicada en docs/.

Qué hace, cada vez que lo lanzas:
  1. Lee fotos/creditos.csv (ID, archivo, fuente, autor, licencia, enlace...).
  2. Para cada imagen que exista en fotos/:
       - PNG con transparencia: recorta los márgenes transparentes sobrantes.
       - Genera WebP y AVIF en varios anchos para srcset (docs/assets/img/).
       - SVG del logo: lo copia y crea la versión clara (#F7F3EC) cambiando el fill.
  3. Escribe docs/data/imagenes.json con medidas y etiquetas.
  4. Reescribe en todas las páginas de docs/ los bloques
        <!--foto id=M01 alt="..." ratio=3/2 sizes="100vw" carga=eager-->...<!--/foto-->
     con la imagen real (<picture> con srcset, width y height) o, si falta,
     con el hueco «[FOTO PENDIENTE: ID]» en la misma proporción.
  5. Regenera la tabla de /creditos/ y la lista de fotos pendientes de
     plan/08_pendientes.md (entre sus marcadores).

Uso:  python3 scripts/procesar-fotos.py          (requiere Pillow: pip install pillow)
      python3 scripts/procesar-fotos.py --forzar (vuelve a generar todas las imágenes)
"""
import csv
import html
import json
import os
import re
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, features
except ImportError:  # pragma: no cover
    sys.exit("Falta Pillow. Instálalo con: pip install pillow")

RAIZ = Path(__file__).resolve().parent.parent
FOTOS = RAIZ / "fotos"
DOCS = RAIZ / "docs"
SALIDA = DOCS / "assets" / "img"
LOGO_DIR = SALIDA / "logo"
FORZAR = "--forzar" in sys.argv

ANCHOS = [320, 480, 640, 800, 1200, 1600, 2000, 2400]
LINO = "#F7F3EC"
MODERACION = "El vino solo se disfruta con moderación. No compartir con menores de 18 años."
AVIF = features.check("avif")

# Sustitutos: si falta la primera, se usa la segunda y no cuenta como pendiente.
SUSTITUTOS = {"P02": "P01", "P03": "P01", "K01": "K02"}
# Opcionales que, si faltan, simplemente no se muestran.
OPCIONALES_SIN_HUECO = {"CART"}
OPCIONALES = {"P02", "P03", "K01", "CART"}
LOGOS = {"LOGO-C", "LOGO-R", "SIMBOLO"}


def leer_creditos():
    ruta = FOTOS / "creditos.csv"
    filas = []
    with open(ruta, encoding="utf-8-sig", newline="") as f:
        lector = csv.reader(f)
        cabecera = next(lector)
        for fila in lector:
            if not fila or not fila[0].strip():
                continue
            fila = (fila + [""] * 10)[:10]
            filas.append({
                "id": fila[0].strip(),
                "archivo": fila[1].strip(),
                "que": fila[2].strip(),
                "fuente": fila[3].strip(),
                "autor": fila[4].strip(),
                "licencia": fila[5].strip(),
                "enlace": fila[6].strip(),
                "cara": fila[7].strip().lower(),
                "permiso": fila[8].strip().lower(),
                "etiqueta": fila[9].strip(),
            })
    return filas


def etiqueta_de(c):
    """Etiqueta visible bajo la imagen, según el encargo."""
    i = c["id"]
    if i in LOGOS or i == "SELLO":
        return ""
    if i.startswith("P0") and i in {"P01", "P02", "P03", "P04"}:
        return "Imagen ilustrativa del producto"
    fuente = c["fuente"].lower()
    if i in {"F02", "CART"} or "con ia" in fuente or "generada con ia" in c["etiqueta"].lower():
        return "Imagen generada con IA"
    if c["etiqueta"]:
        return c["etiqueta"]
    if "bodega" in fuente or "muñana" in fuente:
        return ""
    return "Imagen ilustrativa"


def excluida(c):
    """Cara reconocible sin permiso firmado: no se usa."""
    return c["cara"].startswith("si") and not c["permiso"].startswith("si")


def recortar_transparencia(im):
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        alfa = im.split()[-1].point(lambda a: 255 if a > 8 else 0)
        caja = alfa.getbbox()
        if caja:
            im = im.crop(caja)
    return im


def procesar_raster(c, origen):
    base = Path(c["archivo"]).stem
    im = Image.open(origen)
    im.load()
    im = recortar_transparencia(im)
    transparente = im.mode == "RGBA"
    if not transparente:
        im = im.convert("RGB")
    ancho, alto = im.size
    anchos = [a for a in ANCHOS if a < ancho] + [ancho]
    variantes = []
    for a in anchos:
        h = round(alto * a / ancho)
        for ext in (["avif"] if AVIF else []) + ["webp"]:
            destino = SALIDA / f"{base}-{a}.{ext}"
            if FORZAR or not destino.exists() or destino.stat().st_mtime < origen.stat().st_mtime:
                peq = im.resize((a, h), Image.LANCZOS) if a != ancho else im
                if ext == "webp":
                    peq.save(destino, "WEBP", quality=80, method=6)
                else:
                    peq.save(destino, "AVIF", quality=55)
        variantes.append(a)
    return {"base": base, "ancho": ancho, "alto": alto, "anchos": variantes,
            "avif": AVIF, "transparente": transparente}


def procesar_svg(c, origen):
    LOGO_DIR.mkdir(parents=True, exist_ok=True)
    base = Path(c["archivo"]).stem
    texto = origen.read_text(encoding="utf-8")
    (LOGO_DIR / f"{base}.svg").write_text(texto, encoding="utf-8")
    # Versión clara: única transformación permitida, todos los fill a Classic Linen.
    claro = re.sub(r'fill="#[0-9a-fA-F]{3,6}"', f'fill="{LINO}"', texto)
    (LOGO_DIR / f"{base}-claro.svg").write_text(claro, encoding="utf-8")
    m = re.search(r'viewBox="([\d.\s-]+)"', texto)
    w = h = None
    if m:
        partes = [float(x) for x in m.group(1).split()]
        w, h = round(partes[2]), round(partes[3])
    return {"base": base, "svg": True, "ancho": w, "alto": h}


ATTR = re.compile(r'(\w+)=("([^"]*)"|\S+)')


def parsear_attrs(texto):
    d = {}
    for m in ATTR.finditer(texto):
        d[m.group(1)] = m.group(3) if m.group(3) is not None else m.group(2)
    return d


def ruta_relativa(pagina):
    profundidad = len(pagina.relative_to(DOCS).parts) - 1
    if pagina.name == "404.html":
        return "/flamenco-spritz-web/"
    return "../" * profundidad


def bloque_foto(attrs, manifiesto, prefijo):
    pedido = attrs.get("id", "")
    final = pedido
    if final not in manifiesto and pedido in SUSTITUTOS:
        final = SUSTITUTOS[pedido]
    clase = attrs.get("clase", "")
    ratio = attrs.get("ratio", "")
    alt = html.escape(attrs.get("alt", ""), quote=True)
    estilo = f' style="aspect-ratio:{ratio}"' if ratio else ""
    if final not in manifiesto:
        if pedido in OPCIONALES_SIN_HUECO or attrs.get("opcional") == "1":
            return ""
        r = ratio or "3/2"
        return (f'<figure class="foto foto--pendiente {clase}" style="aspect-ratio:{r}">'
                f'<div class="foto-hueco" role="img" aria-label="Foto pendiente {final}">'
                f'<span>[FOTO PENDIENTE: {final}]</span></div></figure>')
    m = manifiesto[final]
    sizes = attrs.get("sizes", "100vw")
    carga = attrs.get("carga", "lazy")
    ajuste = attrs.get("ajuste", "")
    ruta = f"{prefijo}assets/img/"
    srcset_w = ", ".join(f'{ruta}{m["base"]}-{a}.webp {a}w' for a in m["anchos"])
    fuente_avif = ""
    if m.get("avif"):
        srcset_a = ", ".join(f'{ruta}{m["base"]}-{a}.avif {a}w' for a in m["anchos"])
        fuente_avif = f'<source type="image/avif" srcset="{srcset_a}" sizes="{sizes}">'
    medio = [a for a in m["anchos"] if a >= 800] or m["anchos"]
    src = f'{ruta}{m["base"]}-{medio[0]}.webp'
    prioridad = ' fetchpriority="high"' if carga == "eager" else ""
    carga_attr = 'loading="eager"' if carga == "eager" else 'loading="lazy"'
    clases = f"foto {clase}" + (" foto--contener" if ajuste == "contener" else "")
    etiqueta = m.get("etiqueta", "")
    if attrs.get("sin_etiqueta") == "1":
        etiqueta = ""
    pie = ""
    if etiqueta or m.get("producto"):
        textos = []
        if etiqueta:
            textos.append(f'<span class="foto-etiqueta">{etiqueta}</span>')
        if m.get("producto") and attrs.get("sin_moderacion") != "1":
            textos.append(f'<span class="foto-moderacion">{MODERACION}</span>')
        pie = f'<figcaption>{"".join(textos)}</figcaption>'
    return (f'<figure class="{clases.strip()}"{estilo}><picture>{fuente_avif}'
            f'<img src="{src}" srcset="{srcset_w}" sizes="{sizes}" width="{m["ancho"]}" height="{m["alto"]}" '
            f'alt="{alt}" {carga_attr} decoding="async"{prioridad}></picture>{pie}</figure>')


MARCA = re.compile(r"<!--foto (.*?)-->(.*?)<!--/foto-->", re.S)


def reescribir_paginas(manifiesto):
    cambiadas = 0
    for pagina in DOCS.rglob("*.html"):
        texto = pagina.read_text(encoding="utf-8")
        if "<!--foto " not in texto:
            continue
        prefijo = ruta_relativa(pagina)

        def sustituir(m):
            attrs = parsear_attrs(m.group(1))
            return f"<!--foto {m.group(1)}-->{bloque_foto(attrs, manifiesto, prefijo)}<!--/foto-->"

        nuevo = MARCA.sub(sustituir, texto)
        if nuevo != texto:
            pagina.write_text(nuevo, encoding="utf-8")
            cambiadas += 1
    return cambiadas


def usos_por_id():
    usos = {}
    for pagina in DOCS.rglob("*.html"):
        texto = pagina.read_text(encoding="utf-8")
        for m in MARCA.finditer(texto):
            i = parsear_attrs(m.group(1)).get("id")
            ruta = "/" + str(pagina.relative_to(DOCS).parent).replace("\\", "/") + "/"
            ruta = ruta.replace("/./", "/")
            usos.setdefault(i, set()).add("/" if ruta in ("/./", "//") else ruta)
    return usos


def tabla_creditos(creditos, manifiesto, motivos):
    filas = []
    for c in creditos:
        if c["id"] in manifiesto:
            estado = "Publicada"
        elif c["id"] in motivos:
            estado = motivos[c["id"]]
        else:
            estado = "Pendiente de subir"
        enlace = (f'<a href="{html.escape(c["enlace"])}" rel="noopener nofollow">Ver fuente</a>'
                  if c["enlace"] else "—")
        filas.append(
            "<tr>"
            f'<th scope="row">{html.escape(c["id"])}</th>'
            f'<td>{html.escape(c["que"])}</td>'
            f'<td>{html.escape(c["autor"] or "—")}</td>'
            f'<td>{html.escape(c["fuente"] or "[PENDIENTE]")}</td>'
            f'<td>{html.escape(c["licencia"] or ("Propia del equipo" if "propia" in c["fuente"].lower() or "render" in c["fuente"].lower() else "[PENDIENTE]"))}</td>'
            f"<td>{enlace}</td>"
            f'<td>{html.escape(etiqueta_de(c) or "—")}</td>'
            f"<td>{estado}</td>"
            "</tr>")
    return ('<div class="tabla-scroll" tabindex="0" role="region" aria-label="Créditos de las imágenes">'
            '<table class="tabla"><thead><tr><th scope="col">ID</th><th scope="col">Qué muestra</th>'
            '<th scope="col">Autor</th><th scope="col">Fuente</th><th scope="col">Licencia</th>'
            '<th scope="col">Enlace</th><th scope="col">Etiqueta en la web</th><th scope="col">Estado</th>'
            '</tr></thead><tbody>' + "".join(filas) + "</tbody></table></div>")


def reemplazar_entre(texto, inicio, fin, contenido):
    patron = re.compile(re.escape(inicio) + r".*?" + re.escape(fin), re.S)
    return patron.sub(lambda _: f"{inicio}\n{contenido}\n{fin}", texto)


def main():
    SALIDA.mkdir(parents=True, exist_ok=True)
    creditos = leer_creditos()
    manifiesto, motivos = {}, {}
    for c in creditos:
        origen = FOTOS / c["archivo"]
        if not c["archivo"] or not origen.exists():
            continue
        if excluida(c):
            motivos[c["id"]] = "Excluida: cara reconocible sin permiso firmado"
            print(f"  ! {c['id']}: cara reconocible sin permiso firmado, no se usa")
            continue
        if origen.suffix.lower() == ".svg":
            datos = procesar_svg(c, origen)
        else:
            datos = procesar_raster(c, origen)
        datos["etiqueta"] = etiqueta_de(c)
        datos["producto"] = c["id"] in {"P01", "P02", "P03", "P04"}
        manifiesto[c["id"]] = datos
        print(f"  ✓ {c['id']:8} {c['archivo']}")

    (DOCS / "data").mkdir(exist_ok=True)
    (DOCS / "data" / "imagenes.json").write_text(
        json.dumps(manifiesto, ensure_ascii=False, indent=2), encoding="utf-8")

    n = reescribir_paginas(manifiesto)
    print(f"Páginas actualizadas: {n}")

    # /creditos/
    pag_creditos = DOCS / "creditos" / "index.html"
    if pag_creditos.exists():
        t = pag_creditos.read_text(encoding="utf-8")
        t = reemplazar_entre(t, "<!--creditos-->", "<!--/creditos-->",
                             tabla_creditos(creditos, manifiesto, motivos))
        pag_creditos.write_text(t, encoding="utf-8")

    # Pendientes de fotos en plan/08_pendientes.md
    usos = usos_por_id()
    lineas = []
    for c in creditos:
        if c["id"] in manifiesto:
            continue
        if c["id"] in SUSTITUTOS and SUSTITUTOS[c["id"]] in manifiesto:
            continue  # opcional con sustituto: no cuenta como pendiente
        if c["id"] in OPCIONALES_SIN_HUECO:
            continue
        donde = ", ".join(sorted(usos.get(c["id"], []))) or "—"
        motivo = motivos.get(c["id"], "No subida")
        lineas.append(f"| {c['id']} | `{c['archivo']}` | {c['que']} | {motivo} | {donde} |")
    plan = RAIZ / "plan" / "08_pendientes.md"
    if plan.exists():
        t = plan.read_text(encoding="utf-8")
        tabla = ("| ID | Archivo | Qué muestra | Motivo | Páginas con hueco |\n"
                 "| --- | --- | --- | --- | --- |\n" + "\n".join(lineas))
        t = reemplazar_entre(t, "<!--fotos-pendientes-->", "<!--/fotos-pendientes-->", tabla)
        plan.write_text(t, encoding="utf-8")
    print(f"Fotos pendientes: {len(lineas)}")


if __name__ == "__main__":
    main()
