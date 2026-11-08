# Flamenco Spritz · prototipo web (TFM)

> **Prototipo académico** (TFM del Máster GESCO, ESIC Granada). No es la web oficial de Bodegas Muñana. No se vende ni se envía nada.

Web de marca, páginas de los QR, registro de eventos y tienda simulada de principio a fin para el plan de marketing de **Flamenco Spritz by Bodegas Muñana**.

- **Dirección pública:** https://patrigpor-coder.github.io/flamenco-spritz-web/
- **Encargo original:** [`plan/00_encargo.md`](plan/00_encargo.md)
- **Pendientes:** [`plan/08_pendientes.md`](plan/08_pendientes.md)

## Estructura

```
docs/                 La web publicada (GitHub Pages sirve esta carpeta)
  assets/css/         main.css (un solo archivo, móvil primero)
  assets/js/          main.js (entrada), nucleo.js, formularios.js, desbloqueo.js…
  assets/js/paginas/  Un módulo por página que lo necesita
  assets/img/         Imágenes generadas por el script (no editar a mano)
  assets/fonts/       Instrument Serif y Poppins (OFL), alojadas aquí
  assets/qr/tribunal/ QR de la defensa (SVG y PNG)
  data/               productos, puntos, eventos, festivales, config e imagenes (.json)
  1/ 2/ 3/ 4/         Direcciones cortas de respaldo de los QR del tribunal
fotos/                Originales que sube el equipo + creditos.csv (NO se publica)
plan/                 Documentación del TFM (01 a 08, registro de QR, utm.html)
scripts/              procesar-fotos.py y generar-qr-tribunal.py
```

No hay paso de compilación: el HTML de `docs/` es la web. JavaScript nativo en módulos, sin frameworks. La única librería externa es `qrcode-generator` (MIT), alojada en `docs/assets/js/vendor/`, para dibujar el QR único de cada entrada.

## Activar GitHub Pages

1. Fusiona el pull request en `main`.
2. En GitHub: **Settings → Pages**.
3. En «Build and deployment», **Source: Deploy from a branch**.
4. **Branch: `main`**, carpeta **`/docs`**, y **Save**.
5. Espera uno o dos minutos y abre https://patrigpor-coder.github.io/flamenco-spritz-web/

## Fotos: cómo añadir o cambiar una

1. Copia la imagen en `fotos/` **con el nombre exacto del banco de imágenes** (por ejemplo, `m01_terraza_atardecer.jpg`). Para cambiar una, sustituye el archivo con el mismo nombre.
2. Rellena su fila en `fotos/creditos.csv`: autor, fuente, licencia, enlace, `cara_reconocible` y `permiso_firmado`. Una foto con cara reconocible y sin permiso firmado **no se publica**.
3. Lanza el script:

   ```bash
   pip install pillow
   python3 scripts/procesar-fotos.py
   ```

   - Recorta los márgenes transparentes de los PNG (botella, sello).
   - Genera WebP y AVIF en varios anchos para `srcset`, con `width` y `height`.
   - Sustituye en todas las páginas el hueco `[FOTO PENDIENTE: ID]` por la foto, con su etiqueta («Imagen ilustrativa del producto», «Imagen generada con IA» o «Imagen ilustrativa») y, en las de producto, el mensaje de moderación.
   - Crea la versión clara del logo (#F7F3EC).
   - Regenera la tabla de /creditos/ y la lista de fotos pendientes de `plan/08_pendientes.md`.
   - Con `--forzar` vuelve a generar todas las imágenes.
4. Revisa en local, haz commit de `fotos/`, `docs/` y `plan/` y súbelo.

En el HTML, cada foto es un bloque como este (el script rellena lo de dentro):

```html
<!--foto id=M01 alt="Terraza al atardecer…" carga=eager sizes="100vw"--> … <!--/foto-->
```

## Probar en local

```bash
npx http-server . -p 8080 -c-1
```

Abre http://localhost:8080/docs/ (o sirve la carpeta padre con un enlace `flamenco-spritz-web → docs` para que la 404 funcione igual que en GitHub Pages).

## Interruptores (`docs/data/config.json`)

| Clave | Qué hace |
| --- | --- |
| `modo_demostracion` | `true`: topes de 5, etiquetas «Demostración», botones de reinicio, selector de estados de Navidad, «Simular sorteo» en /eventos/ y la casilla de horario |
| `temporada.modo` | `auto` o `prelanzamiento`, `festivales`, `tardeos`, `navidad`, `verano`: qué muestra /q/temporada/ sin parámetros |
| `navidad.activa` | `auto` (según el estado), `true` o `false`: entrada del menú y bloque del inicio |
| `navidad.estado` | `auto` (por fecha) o `aviso`, `primeros`, `abierta`, `reyes`, `cerrada` |
| `topes` / `topes_demo` | Plazas por ciudad, primeras de festival (100) y de tardeo (20), y cuántas primeras inscripciones de cada ciudad entran en el sorteo de Villa Flamenco (100; 3 en la demo) |
| `edades` | 18 para todo; 21 para el sorteo de Villa Flamenco |
| `horario_venta` | Horario de pedidos y entregas (8:00 a 22:00, hora de Madrid). `simular_fuera_de_horario: true` simula la noche en la demo; también hay una casilla en el carrito y en el checkout |
| `ga4_id` | ID de GA4. Con `G-XXXXXXX` no se carga nada |

## Contador compartido entre móviles: qué hemos elegido

**Simulado en cada móvil.** Para compartir el contador entre los móviles del tribunal haría falta un servicio externo que reciba peticiones desde la web. Los gratuitos sin registro no garantizan disponibilidad ni que no registren IP u otros datos, y cualquier petición a un tercero contradice la regla de «no enviar ningún dato a ningún sitio». Por eso:

- Cada móvil guarda sus registros y contadores en su `localStorage`.
- Las mecánicas llevan la etiqueta «Demostración» y el panel /demo/panel/ dice en pantalla que lee el almacenamiento del dispositivo que proyecta.
- Para la defensa: escanear los QR también con el portátil o móvil que proyecta, o hacer el recorrido en ese dispositivo.

## Datos de la demo

Nada sale del navegador. El botón «Borrar mis datos de la demo» del pie lo vacía todo, y «Poner todo a cero» en /demo/panel/ reinicia los contadores antes de la defensa.

## QR de la defensa

`docs/assets/qr/tribunal/` (regenerables con `pip install segno && python3 scripts/generar-qr-tribunal.py`). Comprobados descodificándolos con una librería.

| QR | Destino | Respaldo corto |
| --- | --- | --- |
| 1 · Prelanzamiento | /eventos/ · `utm_content=qr1_eventos` | `patrigpor-coder.github.io/flamenco-spritz-web/1` |
| 2 · Festivales | /q/desbloquea/?f=int&s=barra · `qr2_desbloquea` | `…/flamenco-spritz-web/2` |
| 3 · Navidad | /navidad/?estado=primeros&acceso=anticipado · `qr3_navidad` | `…/flamenco-spritz-web/3` |
| 4 · Cierre (opcional) | /demo/panel/ · `qr4_panel` | `…/flamenco-spritz-web/4` |

Tamaño mínimo proyectado: el QR debe ocupar al menos **un tercio del alto de la diapositiva** y medir en pantalla **unos 70 cm de lado para leerse a 7 m** (regla práctica de distancia ÷ 10; para el fondo de una sala de 10 m, ~1 m). Fondo blanco, margen blanco alrededor y sin nada encima.
