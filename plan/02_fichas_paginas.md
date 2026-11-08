# 02 · Fichas de página

Una ficha por página. Etapas del embudo del proyecto: prelanzamiento, experiencia y prueba, lanzamiento y compra, fidelización o prescripción. Las fotos se citan por su ID del banco de imágenes; «→» indica el sustituto cuando falta la opcional.

## `/`

| Campo | Valor |
| --- | --- |
| Objetivo | Orientar en 3 segundos: tomarlo cerca o comprarlo |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Los cuatro |
| Bloques (en orden) | Portada con foto de momento y claim · «Qué abre la llave» (4 puertas) · La botella · 1.188 m · Próximo evento (o Navidad en temporada, leído de eventos.json / config.json) · Newsletter |
| Llamada principal | Dónde tomarlo cerca |
| Llamada secundaria | Comprar |
| Microconversión | Clic al localizador o a la tienda; alta en newsletter |
| Evento GA4 | newsletter_signup (origen=inicio) |
| Palabra clave | spritz (marca) |
| Fotos | M01, P03 (→P01), P04, CART (opcional) |

## `/edad/`

| Campo | Valor |
| --- | --- |
| Objetivo | Verificar la mayoría de edad; página neutra si no |
| Etapa del embudo | Todas |
| Territorio | — |
| Bloques (en orden) | Logo completo · fecha de nacimiento (día, mes, año) · página neutra sin producto |
| Llamada principal | Desbloquear |
| Llamada secundaria | — |
| Microconversión | Superar la verificación |
| Evento GA4 | age_gate_pass |
| Palabra clave | — |
| Fotos | LOGO-C |

## `/producto/`

| Campo | Valor |
| --- | --- |
| Objetivo | Explicar la Original con datos de ficha |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | Ritual y Origen |
| Bloques (en orden) | Botella · ficha (denominación, base, sabor, formato, 4,5 % vol., precio, ingredientes y alérgenos [PENDIENTE]) · sello · cómo servirlo · dónde tomarlo |
| Llamada principal | Comprar |
| Llamada secundaria | Dónde tomarlo |
| Microconversión | Ir a la ficha de compra o al localizador |
| Evento GA4 | view_item |
| Palabra clave | spritz, vino blanco afrutado (base) |
| Fotos | P02 (→P01), SELLO |

## `/navidad/`

| Campo | Valor |
| --- | --- |
| Objetivo | Vender la mitad de la edición online y llevar a tiendas gourmet |
| Etapa del embudo | Lanzamiento y compra / fidelización |
| Territorio | Momento (mesa compartida) |
| Bloques (en orden) | Selector demo de 5 estados · botella y precio · bloque por estado (aviso + cuenta atrás, primeros, abierta + cerca de ti, hasta Reyes, cerrada) · sabor · dónde comprar · fechas límite [PENDIENTE] · para regalar · «La mesa de diciembre» |
| Llamada principal | Comprar online / Avísame |
| Llamada secundaria | Tiendas gourmet |
| Microconversión | Compra, aviso o recetas a cambio del correo |
| Evento GA4 | season_page_view, guide_download (aviso-navidad, mesa-diciembre), click_directions |
| Palabra clave | regalos gourmet |
| Fotos | P04, P05 |

## `/origen/`

| Campo | Valor |
| --- | --- |
| Objetivo | Dar razones de origen con datos verificados |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Origen |
| Bloques (en orden) | Cifra 1.188 con sello · finca e IGP · 180 ha · altitud y suelo · bodega DOP Granada (el producto no es DOP/IGP) · línea de tiempo (romanos, Al-Munya, 1845-1850, hoy, 2027) |
| Llamada principal | Dónde tomarlo |
| Llamada secundaria | La Original |
| Microconversión | Clic al localizador |
| Evento GA4 | — |
| Palabra clave | vinos de Granada, vinos andaluces |
| Fotos | O01, O02, O03, SELLO |

## `/rituales/`

| Campo | Valor |
| --- | --- |
| Objetivo | Enseñar a servirlo |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual |
| Bloques (en orden) | Copa · hielo · gesto · combinaciones raras · guía de servicio |
| Llamada principal | Desbloquear la guía |
| Llamada secundaria | Dónde tomarlo |
| Microconversión | Ir a /q/ritual/ y dejar el correo |
| Evento GA4 | — |
| Palabra clave | spritz |
| Fotos | K02 |

## `/momentos/`

| Campo | Valor |
| --- | --- |
| Objetivo | Proponer planes y captar con el calendario y el mapa |
| Etapa del embudo | Fidelización |
| Territorio | Momento |
| Bloques (en orden) | Cuatro estaciones · calendario de tardeo (imán) · «Desbloquea tu barrio» con sello y rutas de ejemplo · mapa de tu barrio (imán) |
| Llamada principal | Desbloquear el calendario |
| Llamada secundaria | Desbloquear el mapa |
| Microconversión | Correo a cambio del imán |
| Evento GA4 | guide_download (calendario-tardeo, mapa-barrio), click_directions |
| Palabra clave | — |
| Fotos | M03, SELLO |

## `/donde-encontrarlo/`

| Campo | Valor |
| --- | --- |
| Objetivo | Mandar gente a un bar o tienda (trabajo n.º 1) |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | Momento |
| Bloques (en orden) | Filtros (provincia, tipo, CP, Navidad) · resultados «Ejemplo» con «Cómo llegar» · ciudades · alta para tu local |
| Llamada principal | Cómo llegar |
| Llamada secundaria | Comprar online |
| Microconversión | Búsqueda y clic a mapas |
| Evento GA4 | locator_search, click_directions |
| Palabra clave | — |
| Fotos | C01, C02, C03, G01 |

## `/eventos/`

| Campo | Valor |
| --- | --- |
| Objetivo | Llenar 500 plazas y 500 en lista de espera |
| Etapa del embudo | Prelanzamiento |
| Territorio | Activaciones |
| Bloques (en orden) | Tarjeta por ciudad con plazas que bajan · cómo funciona (4 pasos) · cartel |
| Llamada principal | Reservar plaza |
| Llamada secundaria | Lista de espera |
| Microconversión | Inscripción |
| Evento GA4 | qr_landing_view (qr1), event_signup |
| Palabra clave | — |
| Fotos | C01, C02, C03, CART (opcional) |

## `/eventos/inscripcion/`

| Campo | Valor |
| --- | --- |
| Objetivo | Registrar y reservar plaza |
| Etapa del embudo | Prelanzamiento |
| Territorio | Activaciones |
| Bloques (en orden) | Ciudad con plazas · campos comunes · dos casillas · resultado (reserva + correo «Confirmar» / lista de espera + liberar plaza en demo) |
| Llamada principal | Reservar plaza |
| Llamada secundaria | Volver a eventos |
| Microconversión | Inscripción o lista de espera |
| Evento GA4 | event_signup, event_waitlist, newsletter_signup |
| Palabra clave | — |
| Fotos | — |

## `/eventos/confirmacion/`

| Campo | Valor |
| --- | --- |
| Objetivo | Entregar la entrada |
| Etapa del embudo | Prelanzamiento |
| Territorio | Activaciones |
| Bloques (en orden) | «Tu llave»: sello, ciudad, QR único, código, aviso DNI |
| Llamada principal | Dónde tomarlo |
| Llamada secundaria | Tienda |
| Microconversión | Confirmación en 48 h |
| Evento GA4 | event_confirm |
| Palabra clave | — |
| Fotos | SELLO |

## `/festivales/`

| Campo | Valor |
| --- | --- |
| Objetivo | Explicar el stand y la mecánica |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Activaciones |
| Bloques (en orden) | Stand (F02, IA) · fechas [PENDIENTE] · las 100 primeras y kit · pulsador y camiseta · Villa Flamenco (21+) · rincón y cabina |
| Llamada principal | Dónde tomarlo |
| Llamada secundaria | Tienda |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | F02, K01 (→K02), K03, V01, F01 |

## `/tardeos/`

| Campo | Valor |
| --- | --- |
| Objetivo | Explicar los tardeos de invierno |
| Etapa del embudo | Fidelización |
| Territorio | Momento y Activaciones |
| Bloques (en orden) | Nueve tardeos por ciudad (fechas [PENDIENTE]) · cómo funciona · camiseta |
| Llamada principal | Dónde tomarlo |
| Llamada secundaria | Tienda |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | M02, K03 |

## `/q/desbloquea/`

| Campo | Valor |
| --- | --- |
| Objetivo | Registrar en el festival y entregar el kit |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Activaciones |
| Bloques (en orden) | Contexto del QR · kit · módulo Desbloqueo (paso 1, tarjeta con sello, correo de bienvenida) · pulsador · enlaces |
| Llamada principal | Desbloquear |
| Llamada secundaria | Pulsador |
| Microconversión | Registro (100 primeras) e intento |
| Evento GA4 | qr_landing_view, unlock_code_issued, unlock_sold_out, button_game_try, button_game_win |
| Palabra clave | — |
| Fotos | K01 (→K02), K03, V01, SELLO |

## `/q/temporada/`

| Campo | Valor |
| --- | --- |
| Objetivo | Cambiar el contenido sin reimprimir el QR |
| Etapa del embudo | Fidelización / compra |
| Territorio | Momento |
| Bloques (en orden) | ?t= tardeo + Desbloqueo (20 primeras) · ?g= tienda gourmet (Navidad o la Original) · sin parámetros: temporada de config.json |
| Llamada principal | Desbloquear / Comprar online |
| Llamada secundaria | Localizador |
| Microconversión | Registro o compra |
| Evento GA4 | season_page_view, unlock_code_issued, button_game_try |
| Palabra clave | — |
| Fotos | M02, P04, P01, K03, SELLO |

## `/q/ritual/`

| Campo | Valor |
| --- | --- |
| Objetivo | Convertir el vaso, el posavasos o el kit en una visita útil |
| Etapa del embudo | Fidelización |
| Territorio | Ritual |
| Bloques (en orden) | Contexto (?l= local / ?k= kit con segundo ritual) · tres pasos · guía de servicio y calendario a cambio del correo |
| Llamada principal | Desbloquear la guía |
| Llamada secundaria | Localizador / tienda |
| Microconversión | Correo |
| Evento GA4 | guide_download (guia-servicio) |
| Palabra clave | — |
| Fotos | K02 |

## `/q/comunidad/`

| Campo | Valor |
| --- | --- |
| Objetivo | Seguir la cuenta y compartir con permiso |
| Etapa del embudo | Prescripción |
| Territorio | Activaciones |
| Bloques (en orden) | Redes [PENDIENTE] · hashtags · ?s=cabina: vídeo con casilla de reutilización (sin premio) |
| Llamada principal | Enviarme el vídeo |
| Llamada secundaria | Localizador / tienda |
| Microconversión | Seguir o compartir |
| Evento GA4 | community_click |
| Palabra clave | — |
| Fotos | — |

## `/tienda/`

| Campo | Valor |
| --- | --- |
| Objetivo | Mostrar el catálogo |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | — |
| Bloques (en orden) | Tres productos con precio y graduación · ventajas (24-48 h, sin cuenta, DNI) |
| Llamada principal | Ver producto |
| Llamada secundaria | — |
| Microconversión | Ir a ficha |
| Evento GA4 | view_item_list |
| Palabra clave | — |
| Fotos | P01, P04 |

## `/tienda/original/`

| Campo | Valor |
| --- | --- |
| Objetivo | Vender la Original |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | — |
| Bloques (en orden) | Galería · formato (botella o caja de 6) · cantidad · precio · aviso 18 · «Así llega a casa» |
| Llamada principal | Añadir al carrito |
| Llamada secundaria | Ver carrito |
| Microconversión | Añadir al carrito |
| Evento GA4 | view_item, add_to_cart |
| Palabra clave | — |
| Fotos | P01, P02, P03 |

## `/tienda/navidad/`

| Campo | Valor |
| --- | --- |
| Objetivo | Vender la Edición de Navidad |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | Momento |
| Bloques (en orden) | Botella · disponibilidad según estado · cantidad · aviso 18 · «Así llega a casa» |
| Llamada principal | Añadir al carrito |
| Llamada secundaria | Avísame (fuera de temporada) |
| Microconversión | Añadir al carrito |
| Evento GA4 | view_item, add_to_cart |
| Palabra clave | regalos gourmet |
| Fotos | P04 |

## `/carrito/`

| Campo | Valor |
| --- | --- |
| Objetivo | Revisar y tramitar |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | — |
| Bloques (en orden) | Líneas con cantidades y eliminar · subtotal · envío pendiente · aviso DNI |
| Llamada principal | Tramitar pedido |
| Llamada secundaria | Seguir comprando |
| Microconversión | Iniciar checkout |
| Evento GA4 | view_cart, remove_from_cart |
| Palabra clave | — |
| Fotos | P01 (miniatura) |

## `/checkout/`

| Campo | Valor |
| --- | --- |
| Objetivo | Cerrar la compra en 3 pasos |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | — |
| Bloques (en orden) | Progreso · 1 datos y edad · 2 envío y regalo · 3 pasarela simulada · resumen siempre visible |
| Llamada principal | Continuar / Simular pago |
| Llamada secundaria | Volver |
| Microconversión | Compra simulada |
| Evento GA4 | begin_checkout, add_shipping_info, add_payment_info, purchase |
| Palabra clave | — |
| Fotos | P01 (miniatura) |

## `/pedido/confirmado/`

| Campo | Valor |
| --- | --- |
| Objetivo | Confirmar y tranquilizar |
| Etapa del embudo | Fidelización |
| Territorio | — |
| Bloques (en orden) | Sello · número FS-DEMO · resumen · entrega estimada · vista previa del correo |
| Llamada principal | Seguir mi pedido |
| Llamada secundaria | Cómo servirlo |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | SELLO |

## `/pedido/seguimiento/`

| Campo | Valor |
| --- | --- |
| Objetivo | Mostrar el envío hasta la entrega |
| Etapa del embudo | Fidelización |
| Territorio | Ritual |
| Bloques (en orden) | Cinco estados · aviso DNI en reparto · ritual y próximo tardeo al entregar |
| Llamada principal | Avanzar estado (demo) |
| Llamada secundaria | Prueba un ritual |
| Microconversión | Correo para el próximo tardeo |
| Evento GA4 | newsletter_signup (seguimiento_entregado) |
| Palabra clave | — |
| Fotos | E01 |

## `/envios/`

| Campo | Valor |
| --- | --- |
| Objetivo | Explicar plazos, embalaje y verificación de edad |
| Etapa del embudo | Lanzamiento y compra |
| Territorio | — |
| Bloques (en orden) | Plazo · zonas y gastos [PENDIENTE] · embalaje · DNI en la entrega · fechas de Navidad |
| Llamada principal | Ir a la tienda |
| Llamada secundaria | Seguir un pedido |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | E01 |

## `/spritz/`

| Campo | Valor |
| --- | --- |
| Objetivo | Captar búsquedas de «spritz» |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual |
| Bloques (en orden) | Índice · qué es · tres piezas · cómo se sirve · variantes · spritz de altura · preguntas |
| Llamada principal | Dónde tomarlo |
| Llamada secundaria | La Original |
| Microconversión | Clic al localizador |
| Evento GA4 | — |
| Palabra clave | spritz |
| Fotos | O01 |

## `/journal/`

| Campo | Valor |
| --- | --- |
| Objetivo | Índice de artículos |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual y Momento |
| Bloques (en orden) | Seis artículos · calendario de tardeo (imán) |
| Llamada principal | Leer |
| Llamada secundaria | Desbloquear calendario |
| Microconversión | Correo |
| Evento GA4 | guide_download |
| Palabra clave | — |
| Fotos | — |

## `/journal/spritz-flor-de-sauco/`

| Campo | Valor |
| --- | --- |
| Objetivo | Posicionar «hugo spritz» |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual |
| Bloques (en orden) | Qué es · qué aporta el saúco · cómo servirlo · versión lista para servir |
| Llamada principal | Qué es un spritz |
| Llamada secundaria | Localizador |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | hugo spritz |
| Fotos | O03 |

## `/journal/frizzante-o-spritz/`

| Campo | Valor |
| --- | --- |
| Objetivo | Posicionar «vino frizzante» |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual |
| Bloques (en orden) | Definiciones · tabla comparativa · cuál elijo |
| Llamada principal | Qué es un spritz |
| Llamada secundaria | Localizador |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | vino frizzante |
| Fotos | K02 |

## `/journal/vino-blanco-con-hielo/`

| Campo | Valor |
| --- | --- |
| Objetivo | Posicionar «vino blanco con hielo» |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Ritual |
| Bloques (en orden) | Se puede · qué vino (blanco afrutado) · cómo hacerlo |
| Llamada principal | Qué es un spritz |
| Llamada secundaria | Localizador |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | vino blanco con hielo, vino blanco afrutado |
| Fotos | K02 |

## `/journal/tinto-de-verano-blanco/`

| Campo | Valor |
| --- | --- |
| Objetivo | Puente: de dónde viene la idea |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Momento |
| Bloques (en orden) | Costumbre · versión blanca · la intuición compartida |
| Llamada principal | Qué es un spritz |
| Llamada secundaria | Localizador |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | tinto de verano blanco |
| Fotos | M01 |

## `/journal/del-rebujito-al-spritz/`

| Campo | Valor |
| --- | --- |
| Objetivo | Puente: de dónde viene la idea |
| Etapa del embudo | Experiencia y prueba |
| Territorio | Origen y Momento |
| Bloques (en orden) | Qué es el rebujito · qué comparten · qué los separa |
| Llamada principal | Origen |
| Llamada secundaria | Localizador |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | rebujito |
| Fotos | M03 |

## `/para-tu-local/`

| Campo | Valor |
| --- | --- |
| Objetivo | Captar hostelería y tiendas gourmet |
| Etapa del embudo | Prescripción |
| Territorio | — |
| Bloques (en orden) | Qué recibes · formulario del local |
| Llamada principal | Enviar solicitud |
| Llamada secundaria | — |
| Microconversión | Alta de local |
| Evento GA4 | horeca_lead |
| Palabra clave | — |
| Fotos | G01 |

## `/comunidad/`

| Campo | Valor |
| --- | --- |
| Objetivo | Newsletter, canal y hashtags |
| Etapa del embudo | Fidelización / prescripción |
| Territorio | Activaciones |
| Bloques (en orden) | Newsletter · redes [PENDIENTE] · hashtags |
| Llamada principal | Suscribirme |
| Llamada secundaria | — |
| Microconversión | Alta en newsletter |
| Evento GA4 | newsletter_signup (comunidad) |
| Palabra clave | — |
| Fotos | — |

## `/consumo-responsable/`

| Campo | Valor |
| --- | --- |
| Objetivo | Compromisos de consumo responsable |
| Etapa del embudo | Todas |
| Territorio | — |
| Bloques (en orden) | Lo que hacemos · lo que pedimos · recursos [PENDIENTE] |
| Llamada principal | — |
| Llamada secundaria | — |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | — |

## `/prensa/`

| Campo | Valor |
| --- | --- |
| Objetivo | Datos esenciales y logos |
| Etapa del embudo | Prescripción |
| Territorio | Origen |
| Bloques (en orden) | Ficha · descargas de logo · contacto [PENDIENTE] |
| Llamada principal | Descargar logo |
| Llamada secundaria | — |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | LOGO-C, LOGO-R, SIMBOLO |

## `/creditos/`

| Campo | Valor |
| --- | --- |
| Objetivo | Autor y licencia de cada foto |
| Etapa del embudo | — |
| Territorio | — |
| Bloques (en orden) | Tabla regenerada por el script · etiquetas · tipografías · código |
| Llamada principal | — |
| Llamada secundaria | — |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | Todas (tabla) |

## `/legal/*`

| Campo | Valor |
| --- | --- |
| Objetivo | Cumplimiento (borrador académico) |
| Etapa del embudo | Todas |
| Territorio | — |
| Bloques (en orden) | Aviso legal · privacidad · cookies · condiciones de venta · bases 100 primeras · bases pulsador y Villa Flamenco |
| Llamada principal | — |
| Llamada secundaria | — |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | — |

## `/demo/panel/`

| Campo | Valor |
| --- | --- |
| Objetivo | Demostrar al tribunal que el embudo funciona |
| Etapa del embudo | Demostración |
| Territorio | — |
| Bloques (en orden) | Cifras grandes · QR del tribunal · embudo escaneo-registro-compra · poner a cero |
| Llamada principal | Poner a cero |
| Llamada secundaria | Actualizar |
| Microconversión | — |
| Evento GA4 | qr_landing_view (qr4) |
| Palabra clave | — |
| Fotos | — |

## `/404.html`

| Campo | Valor |
| --- | --- |
| Objetivo | Recuperar al perdido |
| Etapa del embudo | — |
| Territorio | — |
| Bloques (en orden) | Logo completo · «Esta puerta no abre nada» · inicio, localizador y tienda |
| Llamada principal | Volver al inicio |
| Llamada secundaria | Dónde tomarlo |
| Microconversión | — |
| Evento GA4 | — |
| Palabra clave | — |
| Fotos | LOGO-C |

## Transversal a todas las páginas

- Franja de prototipo académico, mensaje de moderación en el pie y `noindex, nofollow`.
- `qr_landing_view` en cualquier página a la que se llegue con `utm_source=qr` o desde `/q/`.
- `age_gate_pass` al superar la verificación de edad.
