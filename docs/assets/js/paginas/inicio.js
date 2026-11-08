import { $, cargarJSON, navidadActiva, fechaLarga, url, ICONOS, esc } from '../nucleo.js';

if (await navidadActiva()) {
  $('#bloque-evento').hidden = true;
  $('#bloque-navidad').hidden = false;
} else {
  const [ev, fe] = await Promise.all([cargarJSON('eventos'), cargarJSON('festivales')]);
  const hoy = new Date(new Date().toDateString());
  const citas = [
    ...ev.prelanzamiento.map((e) => ({ fecha: new Date(e.fecha + 'T12:00:00'), titulo: `Prelanzamiento en ${e.ciudad}`, cuando: fechaLarga(e.fecha + 'T12:00:00'), texto: `${e.plazas} plazas, con entrada nominal y DNI en la puerta.`, enlace: url(`eventos/inscripcion/?ciudad=${e.id}`), boton: 'Reservar plaza' })),
    ...fe.festivales.map((f) => ({ fecha: new Date(f.mes + '-28T12:00:00'), titulo: `${f.nombre} · ${f.ciudad}`, cuando: `${f.mes_texto} · fechas exactas [PENDIENTE]`, texto: 'Stand de 24 m²: las 100 primeras reciben el kit y después está el pulsador.', enlace: url('festivales/'), boton: 'Cómo funciona' })),
  ].filter((c) => c.fecha >= hoy).sort((a, b) => a.fecha - b.fecha);
  const c = citas[0];
  if (c) {
    $('#t-temporada').textContent = c.titulo;
    $('#proximo-evento').innerHTML = `<p class="cifra" style="font-size:clamp(2.6rem,8vw,4.5rem)">${esc(c.cuando).replace('[PENDIENTE]', '<span class="pendiente">[PENDIENTE]</span>')}</p>
      <p>${esc(c.texto)}</p>
      <div class="acciones"><a class="btn" href="${c.enlace}">${c.boton} ${ICONOS.flecha}</a><a class="btn btn--sec" href="${url('eventos/')}">Todos los eventos</a></div>`;
  }
}
