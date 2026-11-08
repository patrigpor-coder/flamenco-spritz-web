# 08 · Pendientes

Todo lo que en la web aparece como `[PENDIENTE]`, las fotos que faltan y las incoherencias encontradas. Cuando se resuelva un punto, se cambia en la web (o en `docs/data/*.json`) y se tacha aquí.

## 1. Fotos que faltan

La tabla se regenera sola con `python3 scripts/procesar-fotos.py`. En la web, cada una se ve como un bloque neutro con `[FOTO PENDIENTE: ID]` en la proporción final. Las opcionales con sustituto (P02 y P03 → P01; K01 → K02) y el cartel (CART, que si falta no se muestra) no cuentan como pendientes.

<!--fotos-pendientes-->
| ID | Archivo | Qué muestra | Motivo | Páginas con hueco |
| --- | --- | --- | --- | --- |
| P04 | `p04_navidad_botella_caja.png` | Botella de 50 cl con su caja | No subida | /, /navidad/, /q/temporada/, /tienda/ |
| P05 | `p05_navidad_mesa.jpg` | Mesa de diciembre con adultos | No subida | /navidad/ |
| K01 | `k01_kit.jpg` | Copa de balón, posavasos y caja kraft | No subida | /festivales/, /q/desbloquea/ |
| K02 | `k02_copa_hielo.jpg` | Copa de balón con hielo y spritz blanco | No subida | /journal/frizzante-o-spritz/, /journal/vino-blanco-con-hielo/, /q/ritual/, /rituales/ |
| M01 | `m01_terraza_atardecer.jpg` | Terraza al atardecer con adultos | No subida | /, /journal/tinto-de-verano-blanco/ |
| M02 | `m02_tardeo_invierno.jpg` | Interior de bar en invierno | No subida | /q/temporada/, /tardeos/ |
| M03 | `m03_plan_pequeno.jpg` | Dos o tres amigos en una barra o plaza | No subida | /journal/del-rebujito-al-spritz/, /momentos/ |
| O01 | `o01_vinedo_altura.jpg` | Viñedo de altura con montaña | No subida | /origen/, /spritz/ |
| O02 | `o02_bodega.jpg` | Interior de bodega | No subida | /origen/ |
| O03 | `o03_uva_manos.jpg` | Racimo o vendimia a mano | No subida | /journal/spritz-flor-de-sauco/, /origen/ |
| V01 | `v01_villa.jpg` | Casa rural entre viñedos | No subida | /festivales/, /q/desbloquea/ |
| C01 | `c01_granada.jpg` | Granada | No subida | /donde-encontrarlo/, /eventos/ |
| C02 | `c02_malaga.jpg` | Málaga | No subida | /donde-encontrarlo/, /eventos/ |
| C03 | `c03_sevilla.jpg` | Sevilla | No subida | /donde-encontrarlo/, /eventos/ |
| F01 | `f01_festival.jpg` | Público adulto en un festival | No subida | /festivales/ |
| G01 | `g01_tienda_gourmet.jpg` | Estantería de tienda gourmet | No subida | /donde-encontrarlo/, /para-tu-local/ |
| E01 | `e01_envio_caja.jpg` | Caja de envío con botellas | No subida | /envios/, /pedido/seguimiento/ |
<!--/fotos-pendientes-->

Además, en `fotos/creditos.csv` faltan **autor, licencia y enlace** de todas las filas (también de las piezas propias). En /creditos/ las piezas propias salen como «Propia del equipo» y el resto como `[PENDIENTE]`.

## 2. Datos de producto

| Dato | Dónde aparece |
| --- | --- |
| Ingredientes y alérgenos de la Original y de la Edición de Navidad | /producto/, /tienda/original/, /tienda/navidad/ |
| Formato real de la caja de 6 (la demo supone 6 × 4,50 € = 27,00 €, sin descuento) | /tienda/original/, `productos.json` |

## 3. Envíos y venta

| Dato | Dónde |
| --- | --- |
| Gastos de envío y zonas de entrega (en la demo, 0,00 €) | /envios/, carrito, checkout, condiciones de venta |
| Transportista (sin marcas reales) | /envios/, checkout, seguimiento |
| Material exacto del embalaje | /envios/ |
| Qué pasa si no hay nadie en casa | /envios/ |
| Fecha límite de envío para Nochebuena (mediados de diciembre, día exacto) | /navidad/, /envios/ |
| Fecha límite de envío para Reyes | /navidad/, /envios/ |
| Pasarela de pago real (y que admita venta de alcohol) | condiciones de venta, `06_stack_web_real.md` |
| Procedimiento y costes de devolución; plazo y canal para roturas | condiciones de venta |

## 4. Eventos, festivales y tardeos

| Dato | Dónde |
| --- | --- |
| Lugar y hora de los tres eventos de prelanzamiento | /eventos/, «Tu llave», `eventos.json` |
| Fechas exactas de Interestelar, Brisa y Granada Sound | /festivales/, `festivales.json` |
| Fecha exacta de cada tardeo (L01-L09) y en qué mes va cada uno | /tardeos/, /q/temporada/, `eventos.json`, `04_registro_qr.csv` (`d=AAAA-MM-DD`) |
| Mecánica completa y premio de la ruta «Desbloquea tu barrio» | /momentos/ |
| Locales reales que sirven la Original (todos los puntos son ejemplos L01-L09 y G01-G06) | Localizador, rutas, tardeos, `puntos.json` |
| Condiciones comerciales y distribuidor por zona para locales | /para-tu-local/ |

## 5. Comunicación

| Dato | Dónde |
| --- | --- |
| Cuentas de Instagram y TikTok, y enlace del canal de difusión | /comunidad/, /q/comunidad/ |
| Contacto de prensa y dossier | /prensa/ |
| Recursos de consumo responsable (programas del sector y de las administraciones) | /consumo-responsable/ |

## 6. Legal

| Dato | Dónde |
| --- | --- |
| Titular de la web real: razón social, NIF, domicilio, registro y contacto | Aviso legal, privacidad, condiciones de venta, correo de confirmación |
| Organizador de las acciones | Bases de «Las 100 primeras» y del pulsador |
| Delegado de protección de datos, plazos de conservación y encargados del tratamiento | Privacidad |
| Fiscalidad de los premios en especie | Bases del pulsador |
| Jurisdicción aplicable | Aviso legal |
| Texto y artículos del Código del vino (actualización de 2026) | `07_cumplimiento.md` |
| Artículo exacto y enlace de la Ley 4/1997 de Andalucía; normativa estatal vigente sobre alcohol y menores; requisitos de la venta a distancia de alcohol | `07_cumplimiento.md` |
| Revisión jurídica de las 21 años de Villa Flamenco y de todas las páginas legales | Bases del pulsador |

## 7. Contenido del journal

Datos que los artículos necesitarían y no están en el anexo (se muestran como `[PENDIENTE: fuente]`):

- Etimología de «spritz» y su historia (/spritz/).
- Origen del hugo spritz (/journal/spritz-flor-de-sauco/).
- Presión y regulación del vino frizzante (/journal/frizzante-o-spritz/).
- Origen documentado del tinto de verano y del rebujito (artículos puente).
- Los rituales, las recetas de «La mesa de diciembre» y la guía de servicio son propuestas del equipo, **pendientes de validar con la bodega**.

## 8. Medición

- ID real de GA4 (en `config.json`; con `G-XXXXXXX` no se carga nada).
- Indicador de repetición: necesita CRM o `user_id` en la web real.

## 9. Incoherencias y decisiones encontradas

1. **Contador compartido entre móviles.** No hay un servicio gratuito que podamos garantizar sin datos personales y sin depender de un tercero; los contadores son locales de cada móvil y van marcados como demostración. El panel lo dice en pantalla. Ver README.
2. **`robots.txt` en un sitio de proyecto.** GitHub Pages publica esta web en una subcarpeta (`/flamenco-spritz-web/`); los rastreadores solo leen el `robots.txt` de la raíz del dominio (`patrigpor-coder.github.io/robots.txt`). El de `docs/` se deja por coherencia, pero lo que protege de verdad es el `noindex, nofollow` de cada página. Si se quiere bloquear también en la raíz, hay que crear el repositorio `patrigpor-coder.github.io` con su propio `robots.txt`.
3. **`utm_campaign` sin valor para soportes permanentes.** El plan da `prelanzamiento`, `festival`, `tardeo` y `navidad`; el vaso y el posavasos de los locales y la tarjeta de estante no pertenecen a ninguna. Se han añadido `locales` y `gourmet` (ver `03_convencion_utm.md`).
4. **`utm_content` del QR de tardeo.** La lista del plan no tiene un valor propio para el QR del tardeo; se usa `barra`. Si se prefiere distinguirlo, añadir `tardeo` a la lista cerrada.
5. **Cartel (CART).** El banco pide «solo la versión sin Rosé ni Pistacho»; cuando se suba, comprobarlo antes de publicar.
6. **Stand de festival (F02).** Es una imagen generada con IA en la que aparecen caras de personas generadas (no reales) y producto servido. Se publica con «Imagen generada con IA», como pide el encargo, pero conviene revisar con el criterio del código del vino que nadie aparente menos de 25 años.
7. **Edades y premios.** El anexo dice que quien gana el pulsador «gana una camiseta» y que en festivales hay «además» dos noches. La web da la camiseta a todo acierto y, en festivales, añade la noche a quien tiene 21 o más mientras queden noches de ese festival (por orden de acierto). Confirmar que es la mecánica deseada.
8. **Tardeos por mes.** Se sabe que son tres por ciudad entre noviembre de 2027 y febrero de 2028, pero no en qué mes va cada uno: en la web no se asigna mes.
9. **Navidad en 2026.** Con `estado: auto`, hoy (noviembre de 2026) la web muestra la campaña «Abierta», aunque la primera Navidad real del producto sería la de 2027. Para la defensa se puede fijar el estado en `config.json` o con el selector de la demo.
10. **Logo reducido en la cabecera.** Es una composición vertical (flamenco sobre el nombre); a 56 px de alto el nombre queda pequeño. Si el equipo tiene una versión horizontal, mejoraría la cabecera.
