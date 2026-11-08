# 07 · Cumplimiento

Qué cumple el prototipo, con qué norma y dónde se ve. **No es asesoramiento jurídico:** antes de publicar la web real, todo esto lo tiene que revisar un profesional. Lo marcado «verificar» no lo hemos podido contrastar con el texto vigente.

## Reglamento (UE) 1169/2011, información alimentaria al consumidor

[eur-lex.europa.eu/eli/reg/2011/1169/oj](https://eur-lex.europa.eu/eli/reg/2011/1169/oj)

- En la venta a distancia, la información obligatoria debe estar disponible antes de comprar. La ficha de compra muestra denominación, formato, graduación (4,5 % vol.) y precio.
- **Ingredientes y alérgenos: [PENDIENTE].** Para bebidas de más de 1,2 % vol. hay régimen específico de ingredientes; verificar qué se exige a una bebida a base de vino y cómo se publica (verificar).
- Denominación: «Bebida refrescante a base de vino» (anexo del encargo). La palabra «refrescante» solo aparece ahí, nunca como argumento.

## Reglamento (CE) 1924/2006, declaraciones nutricionales y de propiedades saludables (art. 4.3)

[eur-lex.europa.eu/eli/reg/2006/1924/oj](https://eur-lex.europa.eu/eli/reg/2006/1924/oj)

- Las bebidas con más de 1,2 % vol. no pueden llevar declaraciones de propiedades saludables. La web no las hace: ni «sin resaca», ni beneficios, ni azúcar, ni calorías.
- El texto del ajo negro («no pica ni repite; es dulce y balsámico») describe el sabor, no la salud.

## Código de autorregulación publicitaria del vino (actualización de 2026)

Federación Española del Vino: [fev.es](https://www.fev.es) · Texto de la actualización de 2026: [PENDIENTE: enlace y artículos concretos].

Lo que aplica la web, según los principios habituales de estos códigos (verificar con el texto de 2026):

- Dirigida a mayores de edad: verificación de edad con fecha de nacimiento a la entrada.
- Mensaje de moderación en todas las páginas, en el pie y junto a cada imagen de producto.
- Sin asociar el consumo a éxito social o sexual, desinhibición, conducción o deporte; sin consumo en cadena (las rutas premian descubrir el local, no beber).
- Personas en fotos: mayores de 25 aparentes; en fotos de banco, sin caras reconocibles.
- La graduación solo como información, nunca como argumento ni comparada.
- Sin descuentos ni urgencias agresivas; «Primero los nuestros» es acceso anticipado sin descuento.
- Nunca producto como premio ni bebida gratis.

## RGPD (Reglamento (UE) 2016/679) y LOPDGDD (Ley Orgánica 3/2018)

[eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj) · [BOE-A-2018-16673](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)

- **El prototipo no envía datos a ningún sitio.** Todo queda en `localStorage` del navegador y se borra con «Borrar mis datos de la demo».
- Consentimientos separados y sin marcar: participar según bases (obligatoria) y comunicaciones comerciales (opcional). En /q/comunidad/?s=cabina, una tercera opcional para reutilizar el vídeo.
- Doble aceptación (simulada) para comunicaciones; se guarda fecha, texto aceptado y QR de origen.
- Una ficha por correo: si vuelve por otro QR, se añade el origen; no se duplica.
- Comprar no depende de dejar datos, ni dejar datos de comprar.
- Política de privacidad en borrador con finalidades y bases jurídicas (/legal/privacidad/).

## LSSI (Ley 34/2002)

[BOE-A-2002-13758](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

- Aviso legal con los datos del titular **[PENDIENTE]** (art. 10): no se publican datos reales de la bodega porque no ha encargado la web.
- Comunicaciones comerciales solo con consentimiento expreso (art. 21).
- Cookies (art. 22.2): banner con aceptar, rechazar y configurar al mismo nivel; GA4 no se carga sin consentimiento ni sin ID real. Política en /legal/cookies/.
- Nada incrustado de terceros (ni mapas, ni vídeos, ni píxeles). Las fuentes se alojan en la propia web.

## Ley 15/2022, integral para la igualdad de trato y la no discriminación

[BOE-A-2022-11589](https://www.boe.es/buscar/act.php?id=BOE-A-2022-11589)

- La noche en Villa Flamenco exige 21 años; el resto, 18. Es una decisión del equipo, justificada en las bases (/legal/bases-pulsador-villa-flamenco/) con el art. 4.2 (diferencia de trato justificada por una finalidad legítima, adecuada, necesaria y proporcionada) y el art. 17 (acceso a bienes y servicios). Medida proporcionada: nadie queda fuera del juego; con 18-20 años el premio es la camiseta.

## Venta a distancia de alcohol: España y Andalucía

- **Consumidores:** Texto Refundido de la Ley General para la Defensa de los Consumidores y Usuarios (RDL 1/2007), información previa y desistimiento de 14 días (art. 102 y ss.). [BOE-A-2007-20555](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555)
- **Menores:** prohibición de venta a menores de 18 años. La web verifica la edad tres veces: al entrar, al comprar (fecha de nacimiento; el checkout se bloquea con menos de 18) y en la entrega (DNI; si no, el pedido vuelve a bodega). En los regalos, quien compra confirma que quien recibe es mayor de 18 y enseñará su DNI.
- **Andalucía:** Ley 4/1997, de prevención y asistencia en materia de drogas, y sus modificaciones, con las limitaciones a la venta y el consumo de alcohol a menores [PENDIENTE: artículo exacto y enlace oficial; verificar si hay normas específicas de venta a distancia].
- **Normativa estatal sobre alcohol y menores:** comprobar si en 2026-2027 hay ley estatal aprobada y sus obligaciones para la venta online (verificar).
- **Fiscalidad y registro** del vendedor de bebidas alcohólicas a distancia [PENDIENTE].

## WCAG 2.2 AA

[w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)

| Criterio | Cómo se cumple |
| --- | --- |
| Contraste (1.4.3, 1.4.11) | Texto morado sobre lino 14,2:1; iris sobre lino 9,0:1; lino sobre iris 9,0:1; el caramelo nunca va como texto sobre lino (2,4:1), solo sobre morado (6,0:1). Comprobado con script (ver abajo) |
| Foco visible (2.4.7, 2.4.11) | Contorno de 3 px en iris (lino sobre fondos oscuros) |
| Teclado (2.1.1) | Todo es enlace, botón o campo nativo; el menú móvil atrapa el foco y se cierra con Escape; la capa de edad es un diálogo modal con el resto `inert` |
| Saltar al contenido (2.4.1) | Enlace «Saltar al contenido» |
| Textos alternativos (1.1.1) | Todas las fotos con `alt`; los huecos de fotos pendientes con `role="img"` y etiqueta |
| Formularios (1.3.1, 3.3.1, 3.3.2) | `label` en cada campo, errores en texto asociados con `aria-describedby` y foco al primer error |
| Tamaño de objetivo (2.5.8) | Botones de 44-52 px de alto |
| Movimiento (2.3.3) | Animaciones desactivadas con `prefers-reduced-motion` |
| Reflujo (1.4.10) | Móvil primero a 390 px; sin desplazamiento horizontal |

## Comprobación de contraste

| Texto / fondo | Ratio | AA texto normal |
| --- | --- | --- |
| Blackberry #2B1E33 / Linen #F7F3EC | 14,2:1 | Sí |
| Deep Iris #5B2A86 / Linen #F7F3EC | 9,0:1 | Sí |
| Linen #F7F3EC / Deep Iris #5B2A86 | 9,0:1 | Sí |
| Deep Iris #5B2A86 / Lino oscuro #EFE8DA | 8,1:1 | Sí |
| Blackberry #2B1E33 / Eucalyptus #A8B88A | 7,4:1 | Sí |
| Caramel #C9973F / Blackberry #2B1E33 | 6,0:1 | Sí |
| Blackberry #2B1E33 / Caramel #C9973F | 6,0:1 | Sí |
| Caramel #C9973F / Linen #F7F3EC | 2,4:1 | **No**: no se usa para texto |
| Eucalyptus #A8B88A / Linen #F7F3EC | 1,9:1 | **No**: solo fondo con texto morado |
| Texto suave #4E4356 / Linen #F7F3EC | 8,4:1 | Sí |
| Error #8A1F2B / Linen #F7F3EC | 8,2:1 | Sí |
