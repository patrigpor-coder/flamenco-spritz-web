import { $, $$, cargarConfig, guardar } from '../nucleo.js';
import { estadoCiudades } from '../eventos-datos.js';

const config = await cargarConfig();

async function pintar() {
  const cs = await estadoCiudades();
  cs.forEach((c) => {
    const t = $(`[data-ciudad="${c.id}"]`);
    if (!t) return;
    const nota = config.modo_demostracion ? `<br><span class="pequeno suave">Demostración: tope de ${c.tope} (en el evento real, ${c.plazas})</span>` : '';
    $('.plazas', t).innerHTML = c.libres > 0
      ? `Quedan <strong>${c.libres}</strong> de ${c.tope} plazas${nota}`
      : `<strong>Lista de espera abierta</strong> · ${c.espera} en espera${nota}`;
    $('a.btn', t).innerHTML = c.libres > 0 ? 'Reservar plaza' : 'Apuntarme a la lista de espera';
  });
}

$('#reiniciar-eventos')?.addEventListener('click', () => {
  if (confirm('¿Reiniciar las plazas de los eventos en este móvil?')) { guardar('fs_eventos', {}); pintar(); }
});
// Si llega de un anuncio de una ciudad (?ciudad=), esa tarjeta va primero y destacada.
const ciudad = new URLSearchParams(location.search).get('ciudad');
const destacada = ciudad && $(`[data-ciudad="${CSS.escape(ciudad)}"]`);
if (destacada) { destacada.style.order = '-1'; destacada.style.outline = '2px solid var(--iris)'; }
pintar();
window.addEventListener('pageshow', pintar);
