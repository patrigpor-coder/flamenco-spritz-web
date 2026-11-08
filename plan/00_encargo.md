# Encargo: web de Flamenco Spritz (prototipo para el TFM)

Construye **de una vez** el prototipo completo de la web de Flamenco Spritz en este repositorio, listo para publicarlo con GitHub Pages:

- **La web de marca.**
- **Las páginas a las que llevan los QR.**
- **El registro de los eventos.**
- **Una tienda online simulada de principio a fin:** catálogo, carrito, pago simulado, confirmación y seguimiento del envío.

Reglas de ejecución:

- No pares entre fases para pedir validación. Para solo si algo te bloquea de verdad.
- **Antes de empezar:** si las imágenes y `creditos.csv` están sueltos en la raíz del repositorio, muévelos con `git mv` a una carpeta `fotos/`, sin cambiarles el nombre. Mueve también este archivo a `plan/00_encargo.md`.
- Las imágenes van en la carpeta `fotos/` de la raíz. Algunas llegarán más tarde: donde falte una, sigue con su hueco marcado y no te pares.
- No tienes acceso al TFM ni al modelo financiero. Todos los datos que necesitas están en el **anexo** del final; lo que no esté ahí no existe.
- Al terminar, entrega el resumen que se pide en «Lo que me entregas».

---

## Rol

Eres el **equipo de dirección de un estudio digital de primer nivel** que ha lanzado webs de marcas premium de bebidas en Europa. Respondes de que esta web esté entre las mejores que el tribunal haya visto en un TFM, y de que cumpla toda la normativa de alcohol, datos y accesibilidad.

El equipo lo forman siete perfiles, y cada decisión pasa por el que corresponda:

1. **Dirección de arte y UX.** Webs editoriales de marcas premium: mucho aire, fotografía grande, tipografía con carácter, microinteracciones discretas. Nada de plantillas genéricas ni de estética de marketplace.
2. **Arquitectura de información.** Cada página tiene un trabajo en el embudo. Desde cualquier página se llega a lo importante en dos clics o menos. Quien llega por un QR, desde el móvil, entiende en 3 segundos qué tiene que hacer.
3. **Front-end sénior, móvil primero.** HTML semántico, CSS moderno y JavaScript sin dependencias innecesarias. Core Web Vitals en verde: LCP por debajo de 2,5 s, CLS por debajo de 0,1 e INP por debajo de 200 ms en un móvil medio.
4. **E-commerce y checkout.** Buenas prácticas de usabilidad de checkout: pocos pasos, progreso visible, errores claros, compra sin cuenta, resumen siempre a la vista. Sabes cómo vende una marca de bebidas premium en España.
5. **Analítica.** GA4, Consent Mode v2, UTM y eventos de comercio electrónico con nombres estándar.
6. **Cumplimiento.** Código de autorregulación del vino (actualización de 2026), RGPD y LSSI, venta a distancia de alcohol y WCAG 2.2 AA.
7. **Redacción de marca en español de España.** Frases cortas, segunda persona, sin jerga ni anglicismos innecesarios.

**Antes de abrir el pull request**, revisa la web como la revisaría el tribunal: con el móvil, escaneando un QR, intentando comprar y buscando errores legales.

---

## Contexto

Somos un equipo del Máster GESCO (EIG-ESIC Granada). Esta web forma parte de nuestro TFM: el plan de marketing de **Flamenco Spritz by Bodegas Muñana**, una bebida a base de vino lista para servir.

**Es un trabajo académico.** La bodega no lo ha encargado ni validado. Por eso es obligatorio:

- **Una franja fija y visible en todas las páginas** y en el pie: «Prototipo académico (TFM del Máster GESCO, ESIC Granada). No es la web oficial de Bodegas Muñana. No se vende ni se envía nada».
- **Ningún dato real de la bodega:** ni contacto, ni dirección, ni teléfono, ni CIF, ni personas.
- **`noindex, nofollow`** en todas las páginas y un `robots.txt` que bloquee el rastreo, para que no se confunda con una web real.

**La web tiene cuatro trabajos, por este orden:**

1. **Mandar gente a un bar o a una tienda.** El 95 % del volumen del año 1 va por distribuidor, así que el localizador es la función más importante.
2. **Construir una base de datos propia:** registros de eventos, festivales y tardeos, y la newsletter.
3. **Vender online.** Es el 5 % de la Original en el año 1 y la mitad de la edición de Navidad. En el prototipo, la compra se simula de principio a fin.
4. **Demostrar al tribunal que el embudo funciona,** con los QR y un panel en directo.

---

## Reglas de trabajo

- **No inventes datos.** Usa solo los datos del anexo. Lo que falte se muestra como `[PENDIENTE]` en la web y se anota en `plan/08_pendientes.md`.
- **El repositorio es público.** No subas nada confidencial: costes de producto, márgenes, cifras internas de la bodega ni nombres de personas reales. Las únicas cifras de presupuesto son las tres partidas del anexo, y solo en `plan/06_stack_web_real.md`.
- **Sin socios, patrocinadores ni nombres de personas reales.** Los influencers son INF01 a INF06 y solo aparecen en `plan/`.
- **Alhambra 1925 es la inspiración, no un modelo para copiar:**
  - Experiencia antes que catálogo.
  - Rutas por barrio.
  - La edición limitada como objeto.
  - Identidad premium ligera.
  - Arraigo en Granada sin folclore.

### Regla de imágenes, obligatoria

- **Solo las imágenes que subimos nosotras** a la carpeta `fotos/` de la raíz, con los nombres del «Banco de imágenes» (anexo). Son fotografías reales, más las piezas de marca del equipo: el logo en sus versiones, el sello, los renders de la botella y el cartel.
- **Tú no creas, generas ni descargas ninguna imagen.** Nunca:
  - Ilustraciones, vectores decorativos ni fondos dibujados.
  - Imágenes generadas por ti o por otra herramienta.
  - Fotos de bancos de imágenes que busques tú.
  - Emojis como imagen.
- **Créditos:** con las fotos subimos `fotos/creditos.csv` (ID, autor, fuente, licencia y enlace). Con él, crea la página /creditos/, enlazada desde el pie.
- **Si falta una foto,** deja un bloque de color neutro con el texto `[FOTO PENDIENTE: ID]`, con la misma proporción que tendrá la foto, y anótalo en pendientes.
- **Vectores permitidos, solo dos:**
  - El logo, en sus versiones (completo, reducido y símbolo), si lo subimos en SVG.
  - Iconos funcionales mínimos de la interfaz (menú, carrito, cerrar, flecha, ubicación), de trazo fino y del color de la marca.
- **Optimización:**
  - Recorta los márgenes transparentes sobrantes de los PNG (la botella y el sello) antes de procesarlos.
  - Pasa cada foto a WebP o AVIF con `srcset` y `sizes`, y ponle `width` y `height` para que no salte la página.
  - Carga diferida en todo lo que no sea la primera pantalla.
  - Deja la carpeta `fotos/` original fuera de `docs/`.
- **Etiquetas en las imágenes del producto:** las de la botella son renders, porque el producto aún no existe. Llevan la etiqueta discreta «Imagen ilustrativa del producto».
- **Piezas hechas con IA** (el cartel, y cualquier imagen que `creditos.csv` marque así): llevan «Imagen generada con IA», como en el resto del plan.
- **Fotos de viñedos, bodegas o villas que no sean de Bodegas Muñana:** llevan «Imagen ilustrativa». Nunca se presentan como el viñedo o la villa reales.
- **Personas:** en ninguna foto aparece nadie que aparente menos de 25 años, consumo excesivo, conducción ni deporte. En las fotos de bancos de imágenes no hay caras reconocibles (de espaldas, manos, desenfoque): su licencia no cubre que una persona parezca respaldar un producto. Si `creditos.csv` marca una foto con «cara reconocible» y sin permiso firmado, no la uses y anótala en pendientes.

---

## Marca

- **Claim:** «Desbloquea tu aventura».
- **Idea larga: «La llave».** Cada botella, posavasos o QR abre algo real:
  - Un lugar (**Origen**).
  - Un gesto (**Ritual**).
  - Un plan (**Momento**).
  - Una sorpresa (**Activaciones**).

  La web usa esa metáfora con mesura: en botones como «Desbloquear» y en las transiciones. Sin candados de dibujo.
- **Paleta** (la del manual de marca, tal como está en el TFM):
  - Blackberry Purple #2B1E33: texto y fondos oscuros.
  - Deep Iris #5B2A86: color principal y botones.
  - Classic Linen #F7F3EC: fondo.
  - Caramel Brown #C9973F: acentos y detalles.
  - Eucalyptus Green #A8B88A: estados de éxito y detalles de origen.
  - Un lino más oscuro, #EFE8DA, para bloques.
  - Comprueba el contraste AA de cada combinación de texto y fondo.
- **Tipografía:**
  - Instrument Serif para los titulares y Poppins para el texto.
  - Las dos tienen licencia libre: alójalas en el repositorio, no las cargues desde Google Fonts, por protección de datos.
- **Tono:**
  - Segunda persona y frases cortas. El dato de origen, siempre con su hecho.
  - Sin folclore (lunares, abanicos, «olé»).
  - Sin la palabra «refrescante» como argumento.
  - Sin descuentos ni urgencias agresivas.
  - Nada que sugiera desinhibición, éxito social o sexual, ni consumo en cadena.
  - Ni «sin resaca» ni beneficios para la salud. Tampoco el azúcar.
  - **La graduación (4,5 % vol.) aparece solo como información del producto**, en la ficha y en la tienda. Nunca como argumento ni comparada con otras bebidas.
- **Logo y sello: conviven, cada uno con su papel.**
  - **El logo firma.** Es el flamenco de línea con «FLAMENCO SPRITZ», en tres versiones:

    | Versión | Qué lleva | Dónde va |
    | --- | --- | --- |
    | Completo | Flamenco, «FLAMENCO SPRITZ», «DESBLOQUEA TU AVENTURA» y «BY BODEGAS MUÑANA · 1188 METROS» | Pie, verificación de edad, 404 y cabecera de los correos. Nunca a menos de 200 px de ancho |
    | Reducido | Flamenco y «FLAMENCO SPRITZ» | Cabecera de todas las páginas |
    | Símbolo | Solo el flamenco | Favicon, icono de la web y estados de carga |

    Colores: el flamenco y «FLAMENCO SPRITZ» en Deep Iris #5B2A86, y las dos líneas pequeñas en Blackberry Purple #2B1E33, sobre fondo claro. Sobre foto o fondo oscuro, todo en Classic Linen #F7F3EC. No se recolorea de otra manera.
    Nosotras subimos solo la versión oscura. **La clara la sacas tú,** pasando a #F7F3EC el color del logo: en SVG, con CSS o cambiando el `fill`; en PNG, cambiando el color de los píxeles opacos. Es la única transformación de imagen que haces; no cambies nada más del logo.
  - **El sello certifica y desbloquea.** Es el medallón dorado, el mismo que va en relieve en la botella. Sale solo en momentos de origen o de recompensa:
    - En /origen/, junto a «1.188 metros de altitud».
    - En la ficha de producto.
    - En la tarjeta «Desbloqueo nº X de 100».
    - En la entrada «Tu llave».
    - En el sello de las rutas de «Desbloquea tu barrio».
    - En la confirmación del pedido.

    Siempre dorado y nunca a menos de 64 px de alto.
  - **Nunca juntos como una sola pieza:** ni el sello dentro del logo, ni el sello en la cabecera, ni los dos del mismo tamaño en la misma pantalla. En cada vista manda uno.
  - Donde aparece el logo completo, el claim ya va dentro: no lo repitas en texto al lado.
- **Fórmula del viñedo:** «uno de los viñedos más altos de España, a 1.188 metros de altitud». Nunca «el más alto».
- **Fuera de la web:** Rosé, Pistacho, la versión 0.0 y la lata. Están fuera del horizonte del plan.

---

## Cumplimiento obligatorio

- **Verificación de edad a la entrada:**
  - Fecha de nacimiento, no un simple «sí».
  - Mayores de 18. Se guarda en `sessionStorage`.
  - A quien no la pase, una página neutra sin producto.
- **Edades por mecánica:**
  - 18 años para todo: la web, la compra, la entrega, el registro, el kit y la camiseta.
  - 21 años solo para ganar una noche en Villa Flamenco. Quien gane el pulsador con menos de 21 recibe una camiseta.
  - Justifica los 21 años en las bases legales: es una decisión del equipo, apoyada en la Ley 15/2022 (arts. 4.2 y 17).
- **Mensaje de moderación en todas las páginas,** en el pie y junto a cada imagen de producto: «El vino solo se disfruta con moderación. No compartir con menores de 18 años».
- **Páginas legales,** marcadas como «Borrador académico»:
  - Aviso legal.
  - Privacidad.
  - Cookies.
  - Condiciones de venta.
  - Envíos y verificación de edad.
  - Bases de «Las 100 primeras».
  - Bases del pulsador y de Villa Flamenco.
- **Dos casillas separadas, ninguna marcada de antemano:**
  - Participar en la acción según sus bases (obligatoria).
  - Recibir comunicaciones comerciales (opcional). Se confirma con un correo de doble aceptación, simulado en la demo, y se guarda con la fecha, el texto aceptado y el QR de origen.
  - Solo en /q/comunidad/ aparece una tercera, opcional: el permiso para reutilizar el vídeo de la cabina 360.
- **Comprar nunca depende de dejar los datos,** ni dejar los datos de comprar.
- **Un contacto es una dirección de correo:** si vuelve por otro QR, se actualiza su ficha y se añade el nuevo origen; nunca se crea otra.
- **Cookies y analítica:**
  - Banner con Consent Mode v2.
  - GA4 preparado con un ID de ejemplo (`G-XXXXXXX`); no se carga sin ID real ni sin consentimiento.
- **Formularios:**
  - Validación en el navegador.
  - **No envían ningún dato a ningún sitio:** todo se guarda en `localStorage` del propio móvil, y un botón «Borrar mis datos de la demo» lo vacía.
  - Al enviar: «Demostración: no se ha enviado ningún dato».
- **Nada incrustado de terceros:** ni mapas, ni vídeos externos, ni píxeles.
- **Accesibilidad WCAG 2.2 AA:**
  - Contraste, foco visible y navegación por teclado.
  - Textos alternativos y etiquetas en los formularios.
  - Animaciones que respetan `prefers-reduced-motion`.

---

## Técnica

- **Web estática** en HTML, CSS y JavaScript, sin paso de compilación. Si usas una plantilla de componentes, que sea con JavaScript nativo. Nada de frameworks salvo que aporten algo claro y lo justifiques.
- **Móvil primero:** diseña a 390 px y luego amplía.
- **Estructura del repositorio:**
  - `docs/` es la web publicada. En GitHub Pages: «Deploy from a branch», rama `main`, carpeta `/docs`.
  - `docs/assets/` con `css/`, `js/`, `img/`, `fonts/` y `qr/`.
  - `docs/data/` con `productos.json`, `puntos.json` (los puntos de venta, marcados como «Ejemplo»), `eventos.json`, `festivales.json` y `config.json`.
    - `config.json` lleva los interruptores: modo de temporada, modo demostración, Navidad activa sí o no, y los topes de las mecánicas.
  - `plan/` con la documentación.
  - `fotos/` con las imágenes originales que subimos nosotras y su `creditos.csv`. Ya está en el repositorio cuando empiezas.
  - `scripts/procesar-fotos` (Node o Python): convierte lo que hay en `fotos/` en las imágenes de `docs/assets/img/` (recorte de márgenes, WebP o AVIF, tamaños para `srcset`) y regenera /creditos/. Así, cuando subamos más fotos, basta con volver a lanzarlo.
  - `README.md`, que explica cómo lanzar el script y cómo cambiar una foto.
- **Dirección pública:** `https://patrigpor-coder.github.io/flamenco-spritz-web/`. Úsala en todos los QR.
- **Flujo de trabajo:**
  - Commits pequeños y bien descritos, en la rama de esta sesión.
  - Al terminar, abre un pull request a `main` si puedes. Si no, dímelo y lo abro yo.

---

## Mapa del sitio

Navegación principal, con un máximo de seis entradas y el carrito siempre visible:

- Tienda.
- Dónde encontrarlo.
- Origen.
- Rituales.
- Eventos.
- Navidad (solo en temporada).

Lo demás va en el pie.

```
/                          Inicio (tras la verificación de edad)
/edad/                     Verificación de edad (también como capa en la primera visita)
/producto/                 Flamenco Spritz Original
/navidad/                  Edición de Navidad 50 cl (fuera de temporada: «Se abre una vez al año»)
/origen/                   1.188 metros: viñedo, bodega y oficio
/rituales/                 Cómo servirlo: la copa, el hielo y el gesto
/momentos/                 El tardeo en cuatro estaciones y «Desbloquea tu barrio»
/donde-encontrarlo/        Localizador de bares, restaurantes y tiendas gourmet
/eventos/                  Prelanzamiento: Granada, Málaga y Sevilla, con plazas
/eventos/inscripcion/      Formulario por ciudad, con plazas y lista de espera
/eventos/confirmacion/     Confirmación en 48 h y entrada con QR («tu llave»)
/festivales/               Los tres festivales: qué hay en el stand y cómo funciona
/tardeos/                  Tardeos de invierno por ciudad
/tienda/                   Catálogo
/tienda/original/          Ficha de compra de la Original (botella suelta y caja de 6)
/tienda/navidad/           Ficha de compra de la edición de Navidad
/carrito/
/checkout/                 Pasos 1 a 3: datos y edad, envío, pago simulado
/pedido/confirmado/        Confirmación con número de pedido y correo simulado
/pedido/seguimiento/       Seguimiento del envío simulado hasta la entrega
/envios/                   Cómo llega a casa: plazos, embalaje y verificación de edad en la entrega
/spritz/                   Página pilar SEO: qué es un spritz
/journal/                  Índice de artículos
/journal/spritz-flor-de-sauco/
/journal/frizzante-o-spritz/
/journal/vino-blanco-con-hielo/
/journal/tinto-de-verano-blanco/   (contenido puente)
/journal/del-rebujito-al-spritz/   (contenido puente)
/para-tu-local/            Alta de hostelería y tiendas gourmet
/comunidad/                Newsletter, canal de difusión y hashtags
/consumo-responsable/
/prensa/
/creditos/                 Autor y licencia de cada foto
/legal/aviso-legal/  /legal/privacidad/  /legal/cookies/  /legal/condiciones-de-venta/
/legal/bases-100-primeras/  /legal/bases-pulsador-villa-flamenco/
/q/desbloquea/             QR de la barra, la botella gigante y los vasos de los festivales
/q/ritual/                 QR del vaso y el posavasos de los locales, y de la copa y la caja del kit
/q/comunidad/              QR del rincón y la cabina 360 de eventos y festivales
/q/temporada/              QR de los tardeos (por local y fecha) y de la tarjeta de estante gourmet
/demo/panel/               Panel en directo para la defensa (fuera del menú)
/404.html
```

**Mapa de QR,** tal como está en el plan digital. Ningún QR lleva a la portada; el soporte se distingue con parámetros:

| Soporte | Página | Parámetros | Microconversión |
| --- | --- | --- | --- |
| Anuncios, microinfluencers y cartel del prelanzamiento | /eventos/ | `utm_source` = red o INF01…INF06, `utm_campaign=prelanzamiento`, ciudad | Inscripción o lista de espera |
| Puerta de los eventos | No abre página: la entrada con QR solo se valida | Ciudad | Asistencia validada; nadie se registra dos veces |
| Rincón y cabina 360 | /q/comunidad/ | `e` = evento o festival; `s=rincon` o `s=cabina` | Seguir la cuenta, compartir con permiso |
| Barra, botella gigante y vasos de los festivales | /q/desbloquea/ | `f=int`, `bri` o `gso`; `s=barra`, `botella` o `vaso` | Registro (100 primeras y pulsador) |
| Tardeos | /q/temporada/ | `t` = código del local (L01…L09) y `d` = fecha | Registro (20 primeras y pulsador) |
| Vaso y posavasos de los locales | /q/ritual/ | `l` = código del local | Guía de servicio a cambio del correo |
| Copa y caja del kit | /q/ritual/ | `k` = festival o tardeo | Segundo ritual y vuelta a la web |
| Tarjeta de estante de la tienda gourmet | /q/temporada/ | `g` = código de la tienda (G01…) | Guía de regalo, compra online o localizador |

Cada página de QR enlaza, como mínimo, a la tienda y al localizador.

Para cada página, decide la jerarquía de bloques con la arquitectura de información y documéntala en `plan/02_fichas_paginas.md`. Lo mínimo:

### Inicio

- **Primera pantalla:** foto de momento a pantalla completa, el claim y dos acciones: «Dónde tomarlo cerca» y «Comprar».
- **Después,** en este orden:
  1. Los cuatro territorios como puertas («Qué abre la llave»).
  2. La botella.
  3. El origen en una cifra (1.188 metros).
  4. El próximo evento o festival, leído de `eventos.json`.
  5. La newsletter.
- **En temporada,** la Navidad sustituye al bloque del evento.

### Producto (/producto/)

Ficha editorial de la Original:

- Botella, sabor (flor de saúco) y formato (25 cl).
- La graduación, solo como dato.
- Cómo servirlo y dónde tomarlo.
- Botones a la tienda y al localizador.
- Ingredientes y alérgenos: `[PENDIENTE]`.

### Navidad (/navidad/)

- La botella grabada de 50 cl y su caja.
- El sabor: ajo negro y miel de lavanda. Sin afirmaciones de salud.
- El precio.
- Dónde comprarla: online y en tiendas gourmet, nunca en bares.
- **La campaña va de octubre al 6 de enero, en cinco estados** que se cambian en `config.json` y, en la demo, con un selector visible:

  | Estado | Cuándo | Qué muestra la página |
  | --- | --- | --- |
  | Aviso | Desde el 20 de octubre | «Se abre una vez al año», la cuenta atrás y «Avísame» |
  | Primero los nuestros | 2 de noviembre, 72 horas | Compra solo para la newsletter, sin descuento |
  | Abierta | Del 5 de noviembre al 25 de diciembre | Compra para todos, la guía de regalo y «Cerca de ti» (tiendas gourmet) |
  | Hasta Reyes | Del 26 de diciembre al 6 de enero | La fecha límite de envío para Reyes y las últimas tiendas |
  | Cerrada | Del 7 de enero al 19 de octubre | «Se abre una vez al año» y «Avísame» |

- **Fechas límite de envío** antes de Nochebuena y antes de Reyes: `[PENDIENTE]`.
- **Imanes:** el aviso de salida y las recetas de «La mesa de diciembre» (tres maridajes con productos de Granada), cada uno a cambio del correo.
- No se desvelan los sabores de los años siguientes.
- Una sección «Para regalar»:
  - Mensaje para quien lo recibe («Tarjeta con origen»).
  - Envío a otra dirección.
  - Aviso de que quien recibe tiene que ser mayor de 18 y enseñar el DNI.

### Origen (/origen/)

- Solo las afirmaciones del anexo, con su fecha o su cifra.
- Una línea de tiempo con datos reales: documentos de 1845 a 1850 y la finca hoy.
- No se usa el año de fundación de 2002: no está verificado.

### Rituales y Momentos

- **Rituales:** la copa de balón, el hielo y el gesto.
- **Momentos:** el tardeo en cuatro estaciones y los planes pequeños. Imán: el calendario de tardeo, a cambio del correo.
- **«Desbloquea tu barrio»:** rutas por barrio con locales de ejemplo, de junio a septiembre. El sello premia descubrir el local, nunca beber. Imán: el mapa de tu barrio.

### Dónde encontrarlo (/donde-encontrarlo/)

- Lista filtrable por provincia (Granada, Málaga y Sevilla en el año 1) y por tipo (bar o restaurante, y tienda gourmet).
- Búsqueda por código postal.
- Un botón «Cómo llegar» que abre la app de mapas del móvil con un enlace, sin mapa incrustado.
- Un filtro «Edición de Navidad», que solo muestra tiendas gourmet.
- Todos los puntos llevan la marca «Ejemplo».

### Eventos (/eventos/)

- Una tarjeta por ciudad (Granada, Málaga y Sevilla), con su fecha y un contador de plazas que baja.
- Al llegar a cero: «Lista de espera abierta».

### Festivales y tardeos

- Explican la mecánica (ver «Mecánicas»).
- Las fechas exactas van como `[PENDIENTE]` en `festivales.json`.

### Para tu local, Comunidad, Consumo responsable y Prensa

- Breves y con su formulario o sus enlaces.
- Las cuentas de redes van como `[PENDIENTE]`.

### Journal y /spritz/

- Artículos completos y útiles, con las palabras clave del anexo en el título, la entradilla y el texto alternativo.
- Datos solo del anexo; si un artículo necesita un dato que no está, `[PENDIENTE]`.
- Los dos artículos puente explican de dónde viene la idea, sin describir el producto con ellos.
- Cada artículo enlaza a la página pilar y al localizador.
- Marcado `schema.org`: `Article`; `Product` en las fichas, con el precio; `BreadcrumbList`.

---

## Mecánicas

Todo se guarda en `localStorage` y funciona en modo demostración. Las cifras de los topes están en `config.json`.

### Registro de los eventos (/eventos/inscripcion/)

- **Plazas por ciudad:**

  | Ciudad | Fecha | Plazas |
  | --- | --- | --- |
  | Granada | 1 de mayo de 2027 | 100 |
  | Málaga | 2 de mayo de 2027 | 200 |
  | Sevilla | 3 de mayo de 2027 | 200 |

  En la demo, topes de 5, 5 y 5.
- **Campos del formulario** (los mismos en todas las mecánicas):
  - Correo.
  - Fecha de nacimiento (18 o más).
  - Código postal.
  - «¿Conocías Flamenco Spritz?».
  - Las dos casillas de consentimiento.
- **Si quedan plazas:**
  1. Pantalla «Plaza reservada: confírmala en 48 horas» y un correo simulado con el botón «Confirmar».
  2. Al confirmar, la entrada con un QR único, presentada como «Tu llave», y el aviso de que en la puerta se pide el DNI.
- **Si no quedan plazas:**
  - «Estás en la lista de espera».
  - En la demo, un botón simula que se libera una plaza y se le ofrece.

### Módulo «Desbloqueo» (festivales y tardeos)

Un solo componente que usan dos páginas: /q/desbloquea/ en los festivales y /q/temporada/ en los tardeos.

| | Festivales (/q/desbloquea/) | Tardeos (/q/temporada/?t=) |
| --- | --- | --- |
| Parámetros | `f=int`, `bri` o `gso`; `s=barra`, `botella` o `vaso`; UTM | `t=L01…L09`; `d` = fecha; UTM |
| Las primeras | 100 por festival | 20 por tardeo |
| Premios del pulsador | Camisetas y dos noches por festival en Villa Flamenco | Camisetas |

- **Paso 1, las primeras:**
  - Las primeras personas registradas reciben un código numerado: «Desbloqueo nº 37 de 100» (o «de 20» en un tardeo).
  - El personal lo valida en la barra con el DNI y entrega el kit: copa de balón serigrafiada, posavasos y caja kraft.
  - Al llegar al tope, ese paso se cierra solo y la página lo dice.
- **Paso 2, el pulsador:**
  - Para quien está registrado: un cronómetro que hay que parar en 5,00 segundos exactos. Un intento por persona y día. La precisión exigida (por ejemplo, a la centésima) va en `config.json` y en las bases.
  - **Si acierta:**
    - Gana una camiseta.
    - En los festivales hay además dos noches por festival en Villa Flamenco, la cabaña de la bodega: seis ganadores en total.
    - La noche solo la puede ganar alguien de 21 años o más, que va con un acompañante mayor de edad. Quien tiene entre 18 y 20 recibe una camiseta.
  - **Si falla:** «Vuelve mañana».
- **Después del registro:** el correo simulado de bienvenida con su desbloqueo y el ritual del kit, y los enlaces al localizador y a la tienda.
- **Nunca se da producto como premio** ni se habla de bebida gratis.
- **Modo demostración:**
  - Topes de 5, en lugar de 100 en los festivales y 20 en los tardeos.
  - Un botón para reiniciar.
  - La etiqueta «Demostración» bien visible.
  - **Contador compartido entre móviles:** si se puede con un servicio gratuito que no guarde datos personales, hazlo así. Si no, simúlalo en cada móvil y márcalo como demostración. Explica en el README qué has elegido.

### /q/ritual

- Cómo servirlo: la copa, el hielo y el gesto.
- La guía de servicio (tres rituales para casa) y el calendario de tardeo, a cambio del correo.
- El enlace al localizador y a la tienda.
- **Con `?l=`** (vaso y posavasos de un local): «Estás en un local que lo sirve».
- **Con `?k=`** (copa y caja del kit): «Tu kit abre un segundo ritual», con un ritual que no está en la guía.

### /q/comunidad

- Instagram, TikTok y canal de difusión: las cuentas van como `[PENDIENTE]`.
- Los hashtags del anexo.
- **Con `?s=cabina`:** la invitación a compartir el vídeo de la cabina 360, con la casilla opcional de permiso para reutilizarlo. **Sin premio por publicar.**

### /q/temporada

Cambia de contenido sin reimprimir el QR:

- **Con `?t=` (tardeos, de noviembre a febrero):** el tardeo de ese local y esa fecha, y el módulo «Desbloqueo» con sus topes de tardeo.
- **Con `?g=` (tarjeta de estante de una tienda gourmet):**
  - De octubre a Reyes: la edición de Navidad, «Esta tienda tiene la edición», la guía de regalo, la compra online y el localizador de tiendas.
  - El resto del año: la Original y el localizador.
- **Sin parámetros:** el contenido de la temporada que marque `config.json`.

---

## Tienda simulada: del carrito a la puerta de casa

Es una simulación completa y creíble, pero **no cobra, no pide datos de pago reales y no envía nada**. Arriba de cada paso: «Tienda de demostración: no se cobra ni se envía nada».

### Catálogo (/tienda/)

| Producto | Formato | Precio | Notas |
| --- | --- | --- | --- |
| Flamenco Spritz Original | Botella de 25 cl | 4,50 € la unidad | Con selector de cantidad. El plan supone una media de 5 botellas por pedido |
| Flamenco Spritz Original | Caja de 6 botellas de 25 cl | 27,00 € (6 × 4,50 €) | Supuesto de la demo, sin descuento por volumen; el formato real va a pendientes |
| Edición de Navidad | Botella de 50 cl grabada, con caja | 9,90 € | Solo en temporada; fuera de ella, «Avísame» |

- **Plazo:** envío desde la bodega en 24 a 48 horas (TFM).
- **Gastos de envío y zonas de entrega:** `[PENDIENTE]`. En la demo, «Envío: pendiente de definir (0,00 € en la demostración)».
- **Ficha:** galería de fotos, selector de cantidad, el aviso de mayoría de edad y el bloque «Así llega a casa», que enlaza a /envios/.

### Carrito (/carrito/)

- Cambiar cantidades y eliminar productos.
- Subtotal.
- El aviso «Solo mayores de 18; la entrega se hace con DNI».
- Botones «Seguir comprando» y «Tramitar pedido».
- El carrito se guarda en `localStorage` y su contador se ve en la cabecera.

### Checkout (/checkout/), tres pasos con barra de progreso

Compra como invitado. El resumen del pedido se ve siempre: a la derecha en escritorio y plegable en el móvil.

1. **Datos y edad:**
   - Correo y nombre.
   - Fecha de nacimiento: el checkout se bloquea con menos de 18.
   - Casilla aparte para recibir comunicaciones.
2. **Envío:**
   - Dirección y opción «Es un regalo».
   - Si es regalo: nombre de quien lo recibe, mensaje de la tarjeta y la confirmación obligatoria «Quien recibe es mayor de 18 y enseñará su DNI».
   - Método de entrega: a domicilio, desde la bodega en 24 a 48 horas.
3. **Pago simulado:**
   - Una pasarela claramente simulada, con la cabecera «Pasarela de pago simulada».
   - Tres opciones visuales: tarjeta, pago con el móvil y monedero digital, sin logos ni nombres de marcas reales. **No hay ningún campo donde se pueda escribir un número de tarjeta real:** los datos aparecen ya rellenos y bloqueados con un ejemplo («•••• 4242»).
   - Dos botones: «Simular pago aceptado» y «Simular pago rechazado».
   - El rechazo muestra un error claro y permite reintentar.

### Confirmación (/pedido/confirmado/)

- Número de pedido de demostración (FS-DEMO-000123).
- Resumen del pedido y entrega estimada: de 24 a 48 horas desde la salida de bodega.
- **Una vista previa del correo de confirmación,** como la recibiría el cliente, con su pie legal y el mensaje de moderación.

### Seguimiento (/pedido/seguimiento/)

- **Una línea de tiempo con cinco estados:**
  1. Pedido recibido.
  2. Preparado en bodega.
  3. Enviado.
  4. En reparto.
  5. Entregado.
- Un botón «Avanzar estado (demo)».
- En «En reparto»: «El repartidor te pedirá el DNI. Si quien recibe es menor o no lo enseña, el pedido vuelve a bodega».
- En «Entregado»: una invitación a probar un ritual (enlace a /rituales/) y a dejar el correo para el próximo tardeo.
- El transportista va como `[PENDIENTE]`. No uses marcas reales de transportistas ni de pasarelas.

### Cómo llega a casa (/envios/)

- Embalaje: caja de cartón con protección para el vidrio. El material exacto, `[PENDIENTE]`.
- Verificación de edad en la entrega.
- Plazo: de 24 a 48 horas desde la bodega. Zonas y gastos: `[PENDIENTE]`.
- En Navidad: las fechas límite para Nochebuena y para Reyes.
- Qué pasa si no hay nadie en casa: `[PENDIENTE]`.

### Eventos de GA4 de comercio electrónico

Con los nombres estándar y el parámetro `demo: true`:

- `view_item_list`
- `view_item`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `add_shipping_info`
- `add_payment_info`
- `purchase`

---

## Panel para la defensa (/demo/panel/)

Una pantalla para proyectar en la diapositiva final. Muestra, en grande:

- Escaneos de cada QR del tribunal.
- Inscripciones a los eventos.
- Desbloqueos.
- Intentos del pulsador.
- Compras simuladas.

Lo muestra como un embudo: escaneo, registro y compra. Si no hay contador compartido, lee el `localStorage` del dispositivo que proyecta y lo dice en pantalla. Un botón pone todo a cero antes de la defensa.

---

## Analítica, UTM y QR

- **UTM, la convención del plan digital:**
  - `utm_source=qr`, `utm_medium=offline`, `utm_campaign` = la acción (`prelanzamiento`, `festival`, `tardeo`, `navidad`) y `utm_content` = el soporte (`barra`, `botella`, `vaso`, `rincon`, `cabina`, `posavasos`, `kit`, `estante`).
  - En los anuncios y los enlaces de los microinfluencers, `utm_source` es la red o el código INF01…INF06.
  - Minúsculas, sin tildes y con guion bajo. Lista cerrada de valores, documentada en `plan/03_convencion_utm.md`.
- **Eventos propios de GA4,** además de los de comercio electrónico:
  - `age_gate_pass`
  - `qr_landing_view` (con el parámetro del soporte)
  - `event_signup`
  - `event_waitlist`
  - `event_confirm`
  - `unlock_code_issued`
  - `unlock_sold_out`
  - `button_game_try`
  - `button_game_win`
  - `newsletter_signup` (con un parámetro de origen)
  - `guide_download`
  - `locator_search`
  - `click_directions`
  - `horeca_lead`
  - `season_page_view`
  - `community_click`
- **Registro de QR:** `plan/04_registro_qr.csv`, con una fila por soporte:

  | Acción | Soportes |
  | --- | --- |
  | Prelanzamiento | Anuncios por ciudad, cartel y enlaces de INF01 a INF06 |
  | Eventos | Puerta (solo valida la entrada), rincón y cabina 360 en cada ciudad |
  | Festivales | Barra, botella gigante, vaso, rincón, cabina 360 y kit en cada uno |
  | Tardeos | QR del tardeo en los locales L01 a L09, uno por fecha, y kit |
  | Locales | Vaso y posavasos |
  | Tiendas gourmet | Tarjeta de estante |

  Cada fila lleva la dirección final con sus parámetros y sus UTM, siguiendo el mapa de QR de este encargo. Añade la herramienta `plan/utm.html`, que compone y valida las direcciones.

---

## QR para la defensa

- **Tres QR más uno opcional,** en SVG y PNG, en `docs/assets/qr/tribunal/`:

  | QR | Diapositiva | Destino |
  | --- | --- | --- |
  | 1 | Prelanzamiento | /eventos/ en modo demostración |
  | 2 | Festivales | /q/desbloquea/?f=int en modo demostración |
  | 3 | Navidad | /navidad/ con el acceso anticipado activado |
  | 4 (opcional) | Cierre | /demo/panel/ |

- **UTM de los cuatro:** `utm_source=qr&utm_medium=offline&utm_campaign=defensa_tfm&utm_content=qr1_eventos`, y así con `qr2_desbloquea`, `qr3_navidad` y `qr4_panel`.
- **Comprobación:** descodifica cada QR generado con una librería para confirmar que lleva a la dirección correcta.
- **Para cada QR, indica:**
  - El tamaño mínimo para leerlo proyectado desde el fondo de una sala.
  - Una dirección corta de respaldo.

---

## Documentación en `plan/`

1. **`01_mapa_del_sitio.md`:** el árbol, los niveles y la navegación.
2. **`02_fichas_paginas.md`:** una ficha por página, con estos campos:
   - Objetivo.
   - Etapa del embudo del proyecto: prelanzamiento, experiencia y prueba, lanzamiento y compra, fidelización o prescripción.
   - Territorio.
   - Bloques de contenido.
   - Llamada a la acción principal y secundaria.
   - Microconversión.
   - Evento de GA4.
   - Palabra clave.
   - Fotos que usa, por su ID.
3. **`03_convencion_utm.md`.**
4. **`04_registro_qr.csv`.**
5. **`05_plan_medicion.md`:** los eventos y el cuadro de mando en Looker Studio.
6. **`06_stack_web_real.md`:** la web real con pago no puede ir en GitHub Pages. Compara Shopify, WooCommerce y Webflow en estos puntos:
   - Coste, con fuente y fecha.
   - Verificación de edad en la compra y en la entrega.
   - Pasarela de pago.
   - Localizador.
   - Correo y CRM.
7. **`07_cumplimiento.md`:** qué cumple la web y con qué norma, con enlace:
   - Reglamento 1169/2011.
   - Reglamento 1924/2006 (art. 4.3).
   - Código del vino (actualización de 2026).
   - RGPD y LSSI.
   - Ley 15/2022.
   - Venta a distancia de alcohol en España y en Andalucía.
8. **`08_pendientes.md`:** todo lo `[PENDIENTE]`, las fotos que falten y las incoherencias que encuentres.

---

## Comprobación antes de dar por terminado

- Sirve la web en local y revisa cada página a 390 px, a 768 px y en escritorio.
- **Recorre los cinco caminos completos:**
  1. Escanear el QR de un festival, registrarse, recibir el desbloqueo y jugar al pulsador (una vez con 21 años o más y otra con 20, para ver que a los 20 sale la camiseta y no la noche). Repetirlo con el QR de un tardeo.
  2. Inscribirse a un evento hasta agotar las plazas y entrar en la lista de espera.
  3. Comprar una caja de 6 de la Original y dos botellas sueltas: carrito, checkout, pago aceptado, confirmación y seguimiento hasta «Entregado».
  4. Comprar la edición de Navidad como regalo, con un pago rechazado y después aceptado.
  5. Buscar un punto de venta en el localizador y pulsar «Cómo llegar».
- **Comprueba:**
  - Que no hay enlaces rotos ni errores en la consola.
  - La verificación de edad, el banner de cookies y los bloqueos de edad (18 y 21).
  - Que la franja de prototipo académico y el mensaje de moderación aparecen en todas las páginas.
  - Que no aparecen la graduación ni «refrescante» como argumento, «el viñedo más alto», descuentos, producto como premio, Rosé, Pistacho, 0.0, lata ni nombres de personas reales.
  - Que todas las imágenes salen de `fotos/`, que llevan su etiqueta y que están en /creditos/. Ninguna ilustración ni vector decorativo.
  - Lighthouse en móvil: 90 o más en rendimiento, accesibilidad y buenas prácticas. En SEO, 90 o más sin contar el aviso de `noindex`, que es intencionado.
- Corrige lo que encuentres antes de abrir el pull request.

---

## Lo que me entregas

1. El enlace al pull request, o el aviso de que lo abra yo.
2. Los pasos para activar GitHub Pages.
3. Los QR del tribunal, con su dirección y su `utm_content`.
4. La lista de fotos que faltan, por su ID.
5. El resumen de `plan/08_pendientes.md`.

---

## Anexo · Datos para la web

### Producto

- **Flamenco Spritz Original:**
  - Bebida refrescante a base de vino, lista para servir: vino blanco moscatel Flamenco de Bodegas Muñana con agua carbonatada y flor de saúco. «Refrescante» va en la denominación, nunca como argumento.
  - Botella de vidrio de 25 cl, estética retro, la marca en relieve sobre el vidrio y cierre de chapa.
  - 4,5 % vol., solo como información.
  - Precio de venta al público: 4,50 € con IVA.
  - Firma: «Flamenco Spritz by Bodegas Muñana», con el aval de la bodega visible.
  - Ingredientes y alérgenos: `[PENDIENTE]`.
- **Lanzamiento:** mayo de 2027 en Granada, Málaga y Sevilla. Año 2: Cádiz, Madrid y Baleares.
- **Canal:**
  - El 95 % del volumen del año 1 va por distribuidor, sobre todo a hostelería; las tiendas gourmet son la parte menor.
  - Online: el 5 % el año 1, el 7 % el año 2 y el 10 % el año 3. Envío desde la bodega en 24 a 48 horas.
- **Fuera del horizonte del plan:** Rosé, Pistacho, 0.0 y lata. No aparecen.

### Edición de Navidad

- Botella de vidrio grabada de 50 cl, con caja especial. 4,5 % vol.
- Sabor del año 1: ajo negro y miel de lavanda. Para describirlo: el ajo negro no pica ni repite; es dulce y balsámico.
- 9,90 € con IVA.
- Se vende la mitad online y la mitad en tiendas gourmet, nunca en hostelería.
- Botella para compartir en la mesa, no para una persona.
- Cada Navidad, un sabor nuevo, que no se desvela antes de su campaña.
- **Calendario:**

  | Fecha | Qué pasa |
  | --- | --- |
  | 20 de octubre | Anticipación y lista de aviso |
  | 2 de noviembre | «Primero los nuestros»: la newsletter compra 72 horas antes, sin descuento |
  | 5 de noviembre | Abierta a todos; recordatorio a quien abrió el correo y no compró |
  | 1 de diciembre | «Una botella para la mesa» |
  | Mediados de diciembre | Fecha límite de envío para Nochebuena (día exacto `[PENDIENTE]`) |
  | Del 26 de diciembre al 6 de enero | «Hasta Reyes»: último día de envío y últimas tiendas |

### Origen (solo estas afirmaciones)

- La finca Peñas Prietas, en Cortes y Graena (Granada), junto a Sierra Nevada, dentro de la IGP Altiplano de Sierra Nevada.
- La bodega está registrada en la DOP Granada. **Flamenco Spritz no es un producto DOP ni IGP:** no lo presentes así.
- Documentos de la explotación de hacia 1845-1850.
- La finca tiene 180 hectáreas, no todas de viñedo.
- **«Uno de los viñedos más altos de España, a 1.188 metros de altitud».**
  - Nunca «el más alto».
  - Los 1.188 metros son un dato comunicado por la bodega, así que se presentan como tal («según la bodega»).
  - No los atribuyas a la IGP, cuyo pliego habla de «en torno a 1.000 m» para toda la zona.
- **Por qué importa la altitud:** las oscilaciones térmicas y el suelo calcáreo dan a la uva un perfil propio.
- **Historia antigua,** presentada como relato de la zona:
  - En época romana estas tierras ya se explotaban, por su cercanía a Guadix.
  - El nombre Muñana viene del árabe hispano «Al-Munya», las casas de campo con cultivo artesanal.
- **No uses** la fecha de fundación (2002), los propietarios sucesivos ni ningún nombre de persona o familia: no están verificados.

### Personas (ficticias; solo para las fichas de `plan/`)

| Persona | Motivación | Qué la convence | Dónde la encuentra la web |
| --- | --- | --- | --- |
| Celia, 23, Granada | Pertenencia: llegar la primera | Ritual y Momento | QR de los festivales, el pulsador y el evento de Granada |
| Paola, 37, Sevilla | Criterio: razones de origen | Origen: el viñedo, la bodega y el aval | /origen/, el journal y la newsletter |
| Rosa, 52, Málaga | Criterio y cuidado; compra para otros | Momento: la mesa compartida | /navidad/, la guía de regalo y el localizador de tiendas gourmet |
| Nerea, 31, Madrid | Criterio y pertenencia | Momento: el plan que ella propone | Año 2, con la expansión. No hace falta en el prototipo |

### Imanes de correo (siempre contenido útil, nunca descuento)

| Imán | Dónde se pide |
| --- | --- |
| Guía de servicio: tres rituales para casa | /q/ritual/ |
| Calendario de tardeo: un plan por estación con locales que lo sirven | /q/ritual/ y el journal |
| Mapa de tu barrio: las rutas de junio a septiembre | /momentos/ |
| Aviso de la edición de Navidad | /navidad/, desde octubre |
| Recetas de «La mesa de diciembre» | /navidad/ |

### Objetivos que toca la web

- Online: el 5 % del volumen el año 1, el 7 % el año 2 y el 10 % el año 3.
- Navidad: la mitad de la edición se vende online.
- Prelanzamiento: 500 inscritos para 500 plazas y al menos 500 en lista de espera.
- Repetición: el primer indicador que hay que vigilar.

### Partidas del plan (solo para comparar el stack en `plan/06_stack_web_real.md`)

- Web y tienda online: 8.000 €.
- SEO y contenido: 9.000 €.
- Correo y CRM: 3.000 €.

### Eventos de prelanzamiento

| Ciudad | Fecha | Plazas |
| --- | --- | --- |
| Granada | 1 de mayo de 2027 | 100 |
| Málaga | 2 de mayo de 2027 | 200 |
| Sevilla | 3 de mayo de 2027 | 200 |

Inscripción en la web, lista de espera, confirmación en 48 horas y entrada con QR, con el DNI en la puerta.

### Festivales (fechas exactas pendientes)

| Festival | Ciudad | Mes | Días | Código |
| --- | --- | --- | --- | --- |
| Interestelar | Sevilla | Mayo de 2027 | 2 | `int` |
| Brisa | Málaga | Julio de 2027 | 3 | `bri` |
| Granada Sound | Granada | Septiembre de 2027 | 2 | `gso` |

Stand de 24 m²: las 100 primeras de cada festival reciben el kit y después está el pulsador.

### Tardeos

Nueve tardeos, tres por ciudad, de noviembre de 2027 a febrero de 2028, en locales que ya venden la Original (L01 a L09). Las 20 primeras reciben el kit.

### Premios

- **Kit:** copa de balón serigrafiada, posavasos y caja kraft.
- **Camiseta.**
- **Noche en Villa Flamenco,** la cabaña de la bodega:
  - Dos noches por festival y seis ganadores en total.
  - Para personas de 21 años o más, con un acompañante mayor de edad.
- Nunca producto.

### Territorios y series

- **Origen:** 1.188 m, el viñedo en cuatro estaciones, la bodega.
- **Ritual:** la copa, el hielo y el gesto; las combinaciones raras.
- **Momento:** el tardeo en cuatro estaciones; los planes pequeños; la mesa compartida de diciembre.
- **Activaciones:** eventos, las 100 primeras, el pulsador, Villa Flamenco, tardeos y «Desbloquea tu barrio».

### Palabras clave (Ahrefs, 10 de octubre de 2026, búsquedas al mes)

| Palabra clave | Búsquedas | Uso en la web |
| --- | --- | --- |
| spritz | 11.000 | /spritz/ |
| hugo spritz | 7.000 | Artículo de la flor de saúco |
| vino frizzante | 3.100 | Artículo «¿Frizzante o spritz?» |
| vino blanco afrutado | 1.200 | Describe la base, no el producto |
| regalos gourmet | 1.400 | /navidad/ |
| vino blanco con hielo | 350 | Artículo propio |
| tinto de verano blanco | 150 | Artículo puente |
| rebujito | 13.000 | Artículo puente |
| vinos de Granada | 100 | /origen/ |
| vinos andaluces | 150 | /origen/ |

- **Fuera:** graduación, «sin alcohol», «bebidas refrescantes», calorías, lata y «sin resaca».

### Hashtags

#FlamencoSpritz, #DesbloqueaTuAventura, #1188metros, #DesbloqueaTuBarrio, #TardeoDeInvierno.

### Mensaje de moderación

«El vino solo se disfruta con moderación. No compartir con menores de 18 años».

### Banco de imágenes

Nombres exactos de la carpeta `fotos/`, en JPG o PNG, del tamaño indicado o mayor.

| ID | Archivo | Qué muestra | Dónde se usa | Tamaño mínimo |
| --- | --- | --- | --- | --- |
| LOGO-C | `logo_completo.svg` | Logo completo, con claim y firma (vectorial, fondo transparente) | Ver «Logo y sello» en Marca | Vectorial |
| LOGO-R | `logo_reducido.svg` | Flamenco y «FLAMENCO SPRITZ» (vectorial) | Cabecera | Vectorial |
| SIMBOLO | `simbolo.svg` | Solo el flamenco de línea, en Deep Iris (vectorial) | Favicon e icono | Vectorial |
| SELLO | `sello.png` (fondo transparente, sin texto) | El medallón dorado con el flamenco sobre la flor de saúco | /origen/ junto a «1.188 metros de altitud», el sello de «Desbloquea tu barrio», la tarjeta «Desbloqueo nº X de 100», la entrada «Tu llave» y el correo de confirmación del pedido. Los textos que lo acompañan los escribe la web con su tipografía, nunca dentro de la imagen. No se usa como favicon | Unos 570 × 680 px: no lo muestres a más de 300 px de alto |
| P01 | `p01_original_frontal.png` | Botella Original de frente, fondo transparente | Tienda, producto y carrito | Unos 680 × 2.180 px |
| P02 | `p02_original_tres_cuartos.png` (opcional) | Botella Original en tres cuartos | Ficha de producto. Si no está, usa P01 y no lo anotes como pendiente | 2.000 px de alto |
| P03 | `p03_original_relieve.jpg` (opcional) | Primer plano del relieve sobre el vidrio de la botella, con luz lateral | Producto e inicio. Si no está, usa P01 en su lugar y no lo anotes como pendiente | 2.000 px de ancho |
| P04 | `p04_navidad_botella_caja.png` | Botella de 50 cl con su caja, fondo transparente | Navidad y tienda | 2.000 px de alto |
| P05 | `p05_navidad_mesa.jpg` | Mesa de diciembre con dos o más adultos, sin personajes navideños | Navidad | 2.400 px de ancho |
| K01 | `k01_kit.jpg` (opcional) | Foto real de la copa de balón, los posavasos y la caja kraft, sin producto | Festivales y /q/desbloquea. Si no está, usa K02 y no lo anotes como pendiente | 2.000 px de ancho |
| K02 | `k02_copa_hielo.jpg` | Copa de balón con hielo, servida con un spritz blanco sin marcas | Rituales y /q/ritual | 2.000 px de ancho |
| K03 | `k03_camiseta.png` | La camiseta del premio, por delante y por detrás, sobre fondo blanco | El pulsador en /q/desbloquea/ y /q/temporada/, /festivales/ y /tardeos/. Muéstrala dentro de un bloque blanco, no sobre el lino | 1.100 px de ancho |
| M01 | `m01_terraza_atardecer.jpg` | Terraza al atardecer con adultos de más de 25 años, sin marcas visibles | Primera pantalla del inicio | 2.400 px de ancho |
| M02 | `m02_tardeo_invierno.jpg` | Interior de bar con luz cálida, adultos, invierno | Tardeos y /q/temporada | 2.400 px de ancho |
| M03 | `m03_plan_pequeno.jpg` | Dos o tres amigos en una barra o una plaza, de tarde | Momentos | 2.000 px de ancho |
| O01 | `o01_vinedo_altura.jpg` | Viñedo de altura con montaña al fondo | Origen y /spritz/ | 2.400 px de ancho |
| O02 | `o02_bodega.jpg` | Interior de bodega (barricas o depósitos) | Origen | 2.000 px de ancho |
| O03 | `o03_uva_manos.jpg` | Racimo o vendimia a mano, sin caras reconocibles | Origen y journal | 2.000 px de ancho |
| V01 | `v01_villa.jpg` | Casa o cabaña rural entre viñedos, de noche o al atardecer | Villa Flamenco | 2.000 px de ancho |
| C01 | `c01_granada.jpg` | Granada (vista reconocible) | Eventos y localizador | 2.000 px de ancho |
| C02 | `c02_malaga.jpg` | Málaga | Eventos y localizador | 2.000 px de ancho |
| C03 | `c03_sevilla.jpg` | Sevilla | Eventos y localizador | 2.000 px de ancho |
| F01 | `f01_festival.jpg` | Público adulto en un festival al aire libre, sin logos | Festivales | 2.400 px de ancho |
| F02 | `f02_stand_festival.jpg` | Recreación del stand de festival: barra, botella gigante, flamenco y cabina 360 | Primera imagen de /festivales/, dentro del ancho de la página y no a pantalla completa. Lleva «Imagen generada con IA» | 1.440 × 779 px |
| G01 | `g01_tienda_gourmet.jpg` | Estantería de tienda gourmet | Localizador, Navidad y /para-tu-local/ | 2.000 px de ancho |
| E01 | `e01_envio_caja.jpg` | Caja de envío con botellas protegidas | /envios/ y seguimiento | 2.000 px de ancho |
| CART | `cartel_vertical.jpg` (opcional) | El cartel «Desbloquea tu aventura», **solo la versión sin Rosé ni Pistacho** | Eventos e inicio en el prelanzamiento. Si no está, esas páginas van sin cartel y no lo anotes como pendiente | 1.080 × 1.920 px |

Etiquetas:

- Las de producto (P01 a P04) llevan «Imagen ilustrativa del producto».
- Las fotos que no son de Bodegas Muñana ni nuestras llevan «Imagen ilustrativa».
- El cartel y el stand (F02) llevan «Imagen generada con IA».

`fotos/creditos.csv` dice de dónde sale cada una. Lo que no esté subido se queda como `[FOTO PENDIENTE: ID]`.
