# 01 · Mapa del sitio

Web publicada: `https://patrigpor-coder.github.io/flamenco-spritz-web/` (carpeta `docs/` de la rama `main`).

## Navegación

- **Cabecera (todas las páginas):** logo reducido (vuelve al inicio), menú principal de cinco entradas más «Navidad» solo en temporada, y el carrito siempre visible con su contador. En el móvil, el menú se abre a pantalla completa y añade los accesos secundarios.
  - Tienda · Dónde encontrarlo · Origen · Rituales · Eventos · Navidad (en temporada)
- **Pie (todas las páginas):** logo completo, cuatro columnas (Descubre, Planes, Compra, Información), mensaje de moderación, franja de prototipo académico, «Configurar cookies» y «Borrar mis datos de la demo».
- **Franja fija** de prototipo académico encima de la cabecera en todas las páginas.
- **Regla de los dos clics:** desde cualquier página, el localizador y la tienda están a un clic (cabecera); el producto, los eventos y las legales, a uno o dos (cabecera o pie).

## Árbol y niveles

| Nivel | Ruta | Página | En el menú |
| --- | --- | --- | --- |
| 0 | `/` | Inicio (tras la verificación de edad) | Logo |
| 1 | `/edad/` | Verificación de edad y página neutra | No (capa automática) |
| 1 | `/producto/` | Flamenco Spritz Original | Pie |
| 1 | `/navidad/` | Edición de Navidad (5 estados) | Principal, en temporada |
| 1 | `/origen/` | 1.188 metros | Principal |
| 1 | `/rituales/` | La copa, el hielo y el gesto | Principal |
| 1 | `/momentos/` | Tardeo en cuatro estaciones y «Desbloquea tu barrio» | Pie y menú móvil |
| 1 | `/donde-encontrarlo/` | Localizador | Principal |
| 1 | `/eventos/` | Prelanzamiento | Principal |
| 2 | `/eventos/inscripcion/` | Formulario por ciudad | No |
| 2 | `/eventos/confirmacion/` | «Tu llave» | No (desde el correo) |
| 1 | `/festivales/` | Los tres festivales | Pie y menú móvil |
| 1 | `/tardeos/` | Tardeos de invierno | Pie y menú móvil |
| 1 | `/tienda/` | Catálogo | Principal |
| 2 | `/tienda/original/` | Ficha de compra de la Original | No |
| 2 | `/tienda/navidad/` | Ficha de compra de Navidad | No |
| 1 | `/carrito/` | Carrito | Icono de cabecera |
| 1 | `/checkout/` | Pasos 1 a 3 | No |
| 2 | `/pedido/confirmado/` | Confirmación | No |
| 2 | `/pedido/seguimiento/` | Seguimiento | Pie |
| 1 | `/envios/` | Cómo llega a casa | Pie |
| 1 | `/spritz/` | Página pilar SEO | Pie y menú móvil |
| 1 | `/journal/` | Índice de artículos | Pie y menú móvil |
| 2 | `/journal/spritz-flor-de-sauco/` | Hugo spritz y flor de saúco | No |
| 2 | `/journal/frizzante-o-spritz/` | ¿Vino frizzante o spritz? | No |
| 2 | `/journal/vino-blanco-con-hielo/` | Vino blanco con hielo | No |
| 2 | `/journal/tinto-de-verano-blanco/` | Artículo puente | No |
| 2 | `/journal/del-rebujito-al-spritz/` | Artículo puente | No |
| 1 | `/para-tu-local/` | Alta de hostelería y tiendas gourmet | Pie y menú móvil |
| 1 | `/comunidad/` | Newsletter, canal y hashtags | Pie y menú móvil |
| 1 | `/consumo-responsable/` | Consumo responsable | Pie |
| 1 | `/prensa/` | Prensa | Pie |
| 1 | `/creditos/` | Créditos de las fotos | Pie |
| 2 | `/legal/aviso-legal/` … `/legal/bases-pulsador-villa-flamenco/` | Seis páginas legales (borrador académico) | Pie |
| QR | `/q/desbloquea/` | Festivales: barra, botella gigante, vaso | No |
| QR | `/q/ritual/` | Vaso y posavasos de locales; copa y caja del kit | No |
| QR | `/q/comunidad/` | Rincón y cabina 360 | No |
| QR | `/q/temporada/` | Tardeos y tarjeta de estante gourmet | No |
| Demo | `/demo/panel/` | Panel en directo para la defensa | No |
| Demo | `/1/` `/2/` `/3/` `/4/` | Direcciones cortas de respaldo de los QR del tribunal | No |
| — | `/404.html` | Página no encontrada | — |

## Embudo por página

```
QR / anuncio / influencer
   └─> /q/* o /eventos/  ──> registro (evento, desbloqueo, imán)  ──> correo simulado
           │                                                          │
           ├─> /donde-encontrarlo/  (95 % del volumen: bar o tienda)  │
           └─> /tienda/ ─> /carrito/ ─> /checkout/ ─> /pedido/confirmado/ ─> /pedido/seguimiento/
```

Cada página de QR enlaza, como mínimo, a la tienda y al localizador.
