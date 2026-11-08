# 03 · Convención UTM

Convención del plan digital aplicada a todos los QR y enlaces de Flamenco Spritz. El registro completo, fila a fila, está en `04_registro_qr.csv`, y la herramienta `utm.html` (en esta misma carpeta, se abre con el navegador) compone y valida las direcciones.

## Reglas

1. **Minúsculas, sin tildes, sin espacios.** Para unir palabras, guion bajo: `defensa_tfm`, `paid_social`.
2. **Ningún QR lleva a la portada.** Cada soporte lleva a su página (ver «Mapa de QR» en `00_encargo.md`).
3. **Lista cerrada.** Solo se usan los valores de las tablas. Si hace falta uno nuevo, se añade aquí antes de imprimir.
4. **Los parámetros de página** (`f`, `s`, `t`, `d`, `l`, `k`, `g`, `e`, `ciudad`) van antes de las UTM.
5. **Dominio:** `https://patrigpor-coder.github.io/flamenco-spritz-web/`.

## utm_source

| Valor | Cuándo |
| --- | --- |
| `qr` | Cualquier QR impreso o proyectado |
| `instagram`, `tiktok` | Anuncios en esas redes |
| `inf01` … `inf06` | Enlaces de los microinfluencers INF01 a INF06 (en minúsculas) |

## utm_medium

| Valor | Cuándo |
| --- | --- |
| `offline` | QR en soporte físico o proyectado |
| `paid_social` | Anuncios de pago en redes |
| `influencer` | Enlaces de los microinfluencers |

## utm_campaign (la acción)

| Valor | Acción |
| --- | --- |
| `prelanzamiento` | Eventos de Granada, Málaga y Sevilla (mayo de 2027) |
| `festival` | Interestelar, Brisa y Granada Sound |
| `tardeo` | Tardeos de invierno (noviembre de 2027 a febrero de 2028) |
| `navidad` | Campaña de la Edición de Navidad (20 de octubre a 6 de enero) |
| `locales` | Soportes permanentes de hostelería (vaso y posavasos). *Añadido por el equipo web: el plan no tenía campaña para soportes permanentes* |
| `gourmet` | Tarjeta de estante permanente en tiendas gourmet. *Añadido por el mismo motivo* |
| `defensa_tfm` | Los cuatro QR de la defensa ante el tribunal |

## utm_content (el soporte)

| Valor | Soporte |
| --- | --- |
| `barra` | QR de la barra (festivales) y QR del tardeo en el local |
| `botella` | Botella gigante del stand |
| `vaso` | Vaso del festival o vaso del local |
| `rincon` | Rincón de eventos y festivales |
| `cabina` | Cabina 360 |
| `posavasos` | Posavasos del local |
| `kit` | Copa y caja kraft del kit |
| `estante` | Tarjeta de estante de la tienda gourmet |
| `cartel` | Cartel del prelanzamiento *(añadido)* |
| `anuncio` | Pieza de anuncio en redes *(añadido)* |
| `enlace` | Enlace de un microinfluencer *(añadido)* |
| `qr1_eventos`, `qr2_desbloquea`, `qr3_navidad`, `qr4_panel` | QR del tribunal |

## Parámetros de página

| Parámetro | Página | Valores |
| --- | --- | --- |
| `ciudad` | /eventos/, /eventos/inscripcion/ | `granada`, `malaga`, `sevilla` |
| `f` | /q/desbloquea/ | `int` (Interestelar), `bri` (Brisa), `gso` (Granada Sound) |
| `s` | /q/desbloquea/ | `barra`, `botella`, `vaso` |
| `s` | /q/comunidad/ | `rincon`, `cabina` |
| `e` | /q/comunidad/ | código de evento (`granada`, `malaga`, `sevilla`) o de festival (`int`, `bri`, `gso`) |
| `t` | /q/temporada/ | `L01` … `L09` |
| `d` | /q/temporada/ | fecha del tardeo, `AAAA-MM-DD` |
| `l` | /q/ritual/ | `L01` … `L09` |
| `k` | /q/ritual/ | `int`, `bri`, `gso` o `tardeo` |
| `g` | /q/temporada/ | `G01` … `G06` |
| `estado`, `acceso` | /navidad/ | solo en modo demostración: `aviso`, `primeros`, `abierta`, `reyes`, `cerrada`; `acceso=anticipado` |

## Ejemplos

```
https://patrigpor-coder.github.io/flamenco-spritz-web/q/desbloquea/?f=gso&s=vaso&utm_source=qr&utm_medium=offline&utm_campaign=festival&utm_content=vaso
https://patrigpor-coder.github.io/flamenco-spritz-web/eventos/?ciudad=malaga&utm_source=inf03&utm_medium=influencer&utm_campaign=prelanzamiento&utm_content=enlace
```
