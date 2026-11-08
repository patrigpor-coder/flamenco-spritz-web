# 05 · Plan de medición

## Herramientas

- **GA4** con **Consent Mode v2**. Por defecto, `analytics_storage`, `ad_storage`, `ad_user_data` y `ad_personalization` están denegados. Solo si la persona acepta la analítica se actualiza `analytics_storage`. No hay publicidad.
- El identificador está en `docs/data/config.json` (`ga4_id`). Con el valor de ejemplo `G-XXXXXXX` **no se carga nada**. Para activarlo: poner el ID real y publicar.
- Todos los eventos llevan `demo: true` mientras `modo_demostracion` sea `true`, para filtrarlos en los informes.
- En el prototipo, además, cada evento se cuenta en `localStorage` (`fs_metricas`) para el panel de la defensa. No guarda datos personales.

## Eventos de comercio electrónico (nombres estándar)

| Evento | Dónde | Parámetros |
| --- | --- | --- |
| `view_item_list` | /tienda/ | `item_list_id`, `items` |
| `view_item` | /producto/, /tienda/original/, /tienda/navidad/ | `currency`, `value`, `items` |
| `add_to_cart` | Fichas de compra | `currency`, `value`, `items` |
| `remove_from_cart` | /carrito/ | `items` |
| `view_cart` | /carrito/ | `currency`, `value`, `items` |
| `begin_checkout` | /checkout/ | `currency`, `value`, `items` |
| `add_shipping_info` | Paso 2 → 3 | `shipping_tier`, `value`, `items` |
| `add_payment_info` | Paso 3 (al simular el pago) | `payment_type`, `value`, `items` |
| `purchase` | Pago aceptado | `transaction_id` (FS-DEMO-…), `value`, `shipping`, `tax`, `items` |

`items` usa `item_id` (SKU), `item_name`, `item_variant` (formato), `price`, `quantity` e `item_brand`.

## Eventos propios

| Evento | Cuándo | Parámetros |
| --- | --- | --- |
| `age_gate_pass` | Supera la verificación de edad | `pagina` |
| `qr_landing_view` | Llega con `utm_source=qr` o a una página /q/ (una vez por sesión y URL) | `soporte` (utm_content o s), `pagina`, `campana` |
| `event_signup` | Reserva plaza (o la recibe desde la lista de espera) | `ciudad`, `desde` |
| `event_waitlist` | Entra en lista de espera | `ciudad` |
| `event_confirm` | Confirma la plaza (ve «Tu entrada») | `ciudad` |
| `raffle_entry` | Entra en el sorteo de Villa Flamenco (inscripción entre las 100 primeras de su ciudad, con 21 años o más) | `ciudad`, `orden` |
| `unlock_code_issued` | Recibe «Kit nº X» en un festival o tardeo | `accion`, `numero`, `tipo` |
| `unlock_sold_out` | Se registra con el cupo agotado | `accion`, `tipo` |
| `newsletter_signup` | Confirma la doble aceptación | `origen` |
| `guide_download` | Desbloquea un imán | `iman`, `origen` |
| `locator_search` | Busca en el localizador | `provincia`, `tipo`, `cp` (sí/no), `navidad` |
| `click_directions` | Pulsa «Cómo llegar» | `punto`, `origen` |
| `horeca_lead` | Envía el alta de local | `tipo`, `provincia` |
| `season_page_view` | Ve /navidad/ o /q/temporada/ | `temporada`, `estado`, `local`, `tienda` |
| `checkout_fuera_horario` | Llega al checkout entre las 22:00 y las 8:00 (o con la simulación de la demo) | `value` |
| `community_click` | Pulsa una red o envía el vídeo de la cabina | `red`, `soporte`, `permiso_video` |

**Conversiones clave en GA4:** `purchase`, `event_signup`, `unlock_code_issued`, `newsletter_signup`, `click_directions`, `horeca_lead`.

**Dimensiones personalizadas** (ámbito de evento): `soporte`, `accion`, `ciudad`, `iman`, `origen`, `premio`, `temporada`, `demo`.

## Cuadro de mando en Looker Studio

Fuente: GA4 (conector nativo), filtrando `demo = false` en producción.

| Página del informe | Qué responde | Gráficos |
| --- | --- | --- |
| 1. Embudo | ¿Funciona escaneo → registro → compra? | Embudo de `qr_landing_view` → (`event_signup` + `unlock_code_issued` + `newsletter_signup`) → `purchase`; tasa de cada paso |
| 2. Localizador (trabajo n.º 1) | ¿Mandamos gente a bares y tiendas? | `locator_search` y `click_directions` por provincia y tipo; ratio clic/búsqueda |
| 3. QR por soporte | ¿Qué soporte rinde? | Tabla `utm_campaign` × `utm_content` con escaneos, registros y compras |
| 4. Prelanzamiento | ¿Llegamos a 500 inscritos y 500 en espera? | Indicador por ciudad frente al objetivo (100/200/200 plazas); confirmaciones en 48 h |
| 5. Activaciones | Kits y sorteo | Kits por festival/tardeo frente al cupo; inscritos en el sorteo de Villa Flamenco por ciudad (`raffle_entry`) |
| 6. Tienda | ¿Llegamos al 5 % online? | Ingresos, pedidos, botellas por pedido (supuesto del plan: 5), mix Original/Navidad, abandono por paso |
| 7. Navidad | ¿Se vende la mitad online? | Ventas por estado de campaña; avisos («Avísame») y su conversión |
| 8. Base de datos propia | ¿Crece la base? | Altas de newsletter por origen; imanes descargados; contactos con más de un origen |
| 9. Repetición | El primer indicador a vigilar | Compradores con 2+ pedidos; requiere CRM o `user_id` [PENDIENTE] |

## Objetivos que vigila

- Online: 5 % del volumen el año 1, 7 % el año 2, 10 % el año 3.
- Navidad: la mitad de la edición, online.
- Prelanzamiento: 500 inscritos para 500 plazas y al menos 500 en lista de espera.
- Repetición: primer indicador que hay que vigilar.
