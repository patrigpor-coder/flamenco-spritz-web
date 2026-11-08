# 06 · Stack de la web real

GitHub Pages sirve archivos estáticos: vale para el prototipo, pero **no puede cobrar, guardar pedidos ni datos personales en un servidor, ni enviar correos**. La web real con venta necesita una plataforma de comercio electrónico.

## Partidas del plan

| Partida | Presupuesto |
| --- | --- |
| Web y tienda online | 8.000 € |
| SEO y contenido | 9.000 € |
| Correo y CRM | 3.000 € |

## Comparativa

Precios consultados el **8 de noviembre de 2026**, de fuentes públicas. Los de terceros no coinciden entre sí; antes de contratar hay que confirmarlos, con IVA, en la página oficial de cada plataforma.

| Criterio | Shopify | WooCommerce (WordPress) | Webflow |
| --- | --- | --- | --- |
| **Coste de la plataforma** | Plan Basic: 29 US$/mes según la página oficial; entre 32 y 39 €/mes con pago mensual, o 24-27 €/mes con pago anual, según fuentes de 2026. Comisión del 2 % si se usa una pasarela externa en Basic | El plugin es gratuito. Hosting de 5 a 15 €/mes para un proyecto pequeño en España; coste anual total estimado entre 150 y 3.000 US$ según plugins de pago | Plan Ecommerce Standard: 29 US$/mes con pago anual o 42 US$/mes mensual; límite de 500 productos y comisión del 2 % por pedido; algunas fuentes citan un tope de ventas anual de 50.000 US$ |
| **Fuente** | [shopify.com/es-es/precios](https://shopify.com/es-es/precios); [m8d.io (sep. 2026)](https://m8d.io/shopify-precios/); [finom.co](https://finom.co/es-es/blog/shopify-precios/) | [seahawkmedia.com (2026)](https://seahawkmedia.com/es/woocommerce/costo-de-woocommerce/); [qualimero.com](https://qualimero.com/en/blog/woocommerce-pricing); [impulsaecommerce.com](https://impulsaecommerce.com/?p=9438) | [digidop.com (2026)](https://www.digidop.com/blog/webflow-site-pricing); [whtop.com](https://www.whtop.com/plans/webflow.com/144115) |
| **Verificación de edad en la compra** | Con app del ecosistema o fecha de nacimiento obligatoria en el checkout (requiere personalizar el checkout; en Basic las opciones son limitadas) [PENDIENTE: elegir app] | Plugin de verificación de edad o campo propio en el checkout; control total del código | Campo personalizado y lógica propia; el checkout es menos flexible |
| **Verificación de edad en la entrega** | Depende del transportista (servicio de entrega con comprobación de DNI); se pasa como instrucción o servicio contratado | Igual: integración con el transportista mediante plugin | Igual, con integración externa |
| **Pasarela de pago** | Pasarela propia o externa (con comisión adicional si es externa en Basic). Verificar que admite venta de alcohol [PENDIENTE] | Cualquier pasarela con plugin; sin comisión de plataforma | Pasarela integrada limitada; comisión de plataforma del 2 % en Standard |
| **Localizador** | App de localizador o sección propia con un JSON como el del prototipo | Plugin de localizador o la misma página estática del prototipo | Colección CMS + página propia; encaja bien con el diseño editorial |
| **Correo y CRM** | Herramienta de correo propia o integraciones con CRM; doble aceptación configurable | Integración con cualquier herramienta de correo o CRM por plugin | Integraciones externas (formularios → herramienta de correo) |
| **Encaje con el diseño editorial** | Bueno con un tema a medida | Total, a cambio de más mantenimiento | Muy alto: es la herramienta más cercana al prototipo |
| **Mantenimiento** | Bajo (alojado) | Alto (actualizaciones, seguridad, copias) | Bajo (alojado) |

## Recomendación del equipo

**Shopify Basic** para el año 1: el volumen online es pequeño (5 %), el mantenimiento es mínimo y deja la mayor parte de los 8.000 € para diseño a medida, verificación de edad y la integración con el transportista. El contenido editorial (journal, /spritz/) puede vivir en el propio Shopify o en una capa editorial aparte si el SEO lo pide. Revisar en el año 2 (7 % online) si compensa pasar a un plan superior.

**Pendiente antes de decidir:** confirmar precios oficiales con IVA, que la pasarela acepte venta de bebidas alcohólicas, y qué transportista hace entrega con verificación de DNI.

## Qué se aprovecha del prototipo

- Arquitectura, fichas de página y textos (`plan/`).
- `docs/data/*.json` como modelo de datos (productos, puntos, eventos, festivales, configuración).
- Convención UTM, registro de QR y plan de medición.
- Las páginas /q/ como plantillas para la plataforma elegida.
