// /q/comunidad/?e=evento_o_festival&s=rincon|cabina
import { $, $$, params, cargarJSON, guardarContacto, track, esc, AVISO_DEMO_FORM } from '../nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario, bloqueDobleAceptacion } from '../formularios.js';

const e = params.get('e'), s = params.get('s');
if (e) {
  const [{ festivales }, { prelanzamiento }] = await Promise.all([cargarJSON('festivales'), cargarJSON('eventos')]);
  const f = festivales.find((x) => x.codigo === e);
  const ev = prelanzamiento.find((x) => x.id === e);
  const nombre = f ? `${f.nombre} · ${f.ciudad}` : ev ? `Prelanzamiento · ${ev.ciudad}` : e;
  $('#comunidad-contexto').textContent = `${s === 'cabina' ? 'Cabina 360' : 'Rincón Flamenco Spritz'} · ${nombre}`;
}

$$('[data-red]').forEach((a) => a.addEventListener('click', (ev) => {
  ev.preventDefault();
  track('community_click', { red: a.dataset.red, soporte: s || 'web' });
  a.insertAdjacentHTML('beforeend', '<p class="pequeno" role="status" style="margin:4px 0 0">La cuenta aún no existe: está pendiente.</p>');
}, { once: true }));

if (s === 'cabina') {
  $('#cabina').hidden = false;
  const form = $('#form-cabina');
  activarValidacionEnVivo(form);
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!validar(form)) return;
    const d = datosFormulario(form);
    const ahora = new Date().toISOString();
    guardarContacto({
      email: d.email, nacimiento: d.nacimiento, accion: `cabina:${e || 'sin_evento'}`, comunicaciones: d.comunicaciones === 'si',
      extra: d.video === 'si' ? { video_cabina: { permiso: true, fecha: ahora, texto: 'Doy permiso para que Flamenco Spritz reutilice mi vídeo de la cabina 360 en sus redes.' } } : {},
    });
    track('community_click', { red: 'cabina_video', permiso_video: d.video === 'si' });
    form.hidden = true;
    $('#cabina-ok').innerHTML = `<div class="aviso aviso--exito" role="status"><p><strong>Hecho.</strong> Te mandaríamos el vídeo a ${esc(d.email)}. ${d.video === 'si' ? 'Gracias por dejarnos reutilizarlo.' : 'No lo reutilizaremos.'}</p><p class="pequeno">${AVISO_DEMO_FORM}</p></div>` + (d.comunicaciones === 'si' ? bloqueDobleAceptacion(d.email, 'cabina') : '');
  });
}
