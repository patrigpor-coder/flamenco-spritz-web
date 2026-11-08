import { $, cargarJSON, esc, enlaceMapas, track } from '../nucleo.js';

const { puntos, rutas_barrio: rutas } = await cargarJSON('puntos');
const zona = $('#mapa-barrio');
zona.innerHTML = rutas.map((r) => `<div class="tarjeta" style="margin-bottom:12px"><p class="antetitulo">${esc(r.ciudad)} · ${esc(r.meses)}</p><h3>${esc(r.barrio)}</h3><ol>${r.locales.map((c) => {
  const p = puntos.find((x) => x.codigo === c);
  return `<li>${esc(p.nombre)} · ${esc(p.barrio)} — <a href="${enlaceMapas(p)}" target="_blank" rel="noopener" data-punto="${c}">Cómo llegar</a></li>`;
}).join('')}</ol><span class="marca-ejemplo">Ejemplo</span></div>`).join('');
zona.addEventListener('click', (ev) => { const a = ev.target.closest('[data-punto]'); if (a) track('click_directions', { punto: a.dataset.punto, origen: 'mapa_barrio' }); });
