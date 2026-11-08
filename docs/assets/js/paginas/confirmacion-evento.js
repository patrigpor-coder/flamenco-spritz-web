import { $, params, cargarJSON, track, url, esc, qrSVG } from '../nucleo.js';
import { buscarPorCodigo, guardarInscripciones } from '../eventos-datos.js';

const zona = $('#entrada');
const codigo = params.get('c');
const res = codigo && buscarPorCodigo(codigo);
const { prelanzamiento } = await cargarJSON('eventos');

if (!res) {
  zona.innerHTML = `<div class="aviso aviso--error"><p>No encontramos esa reserva en este móvil. Las reservas de la demo se guardan en el navegador donde te inscribiste.</p></div><a class="btn" href="${url('eventos/')}">Ver los eventos</a>`;
} else {
  const { ciudad, r, d } = res;
  const ev = prelanzamiento.find((e) => e.id === ciudad);
  const caducada = r.estado === 'reservada' && Date.now() - new Date(r.fecha).getTime() > 48 * 3600e3;
  if (r.estado === 'cancelada' || caducada) {
    zona.innerHTML = `<div class="aviso aviso--error"><p>Esta reserva ya no está activa: pasaron las 48 horas o la plaza se liberó.</p></div><a class="btn" href="${url('eventos/inscripcion/?ciudad=' + ciudad)}">Volver a inscribirme</a>`;
  } else if (r.estado === 'espera') {
    zona.innerHTML = `<div class="aviso"><p>Sigues en la lista de espera de ${esc(ev.ciudad)}.</p></div>`;
  } else {
    if (r.estado === 'reservada') {
      r.estado = 'confirmada';
      r.confirmada = new Date().toISOString();
      guardarInscripciones(d);
      track('event_confirm', { ciudad });
    }
    const sello = $('#tpl-sello').innerHTML;
    zona.innerHTML = `<div class="tarjeta-codigo desbloqueado">
      ${sello}
      <p class="antetitulo">Tu entrada</p>
      <h2 style="font-size:2.4rem;margin:0">${esc(ev.ciudad)}</h2>
      <p style="margin:4px 0 0">${esc(ev.fecha_texto)} · Lugar y hora: <span class="pendiente">[PENDIENTE]</span></p>
      <div class="qr-entrada">${await qrSVG(r.codigo, 200)}</div>
      <p class="codigo">${esc(r.codigo)}</p>
      <p class="pequeno">${esc(r.email)}</p>
      ${r.sorteo === 'si' ? '<p class="pequeno"><strong>Estás en el sorteo de una noche en Villa Flamenco.</strong></p>' : ''}
      <div class="aviso" style="text-align:left"><p><strong>En la puerta te pediremos el DNI.</strong> La entrada es personal y se valida una sola vez.</p></div>
    </div>`;
  }
}
