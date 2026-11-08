import { $, params, cargarJSON, track, esc, enlaceMapas, ICONOS, url } from '../nucleo.js';

const { puntos } = await cargarJSON('puntos');
const form = $('#filtros');
const PREFIJOS = { 18: 'granada', 29: 'malaga', 41: 'sevilla' };

if (params.get('navidad') === '1') $('#f-navidad').checked = true;
if (params.get('provincia')) $('#f-prov').value = params.get('provincia');
if (params.get('cp')) $('#f-cp').value = params.get('cp');

function sincronizarNavidad() {
  const n = $('#f-navidad').checked;
  if (n) $('#f-tipo').value = 'gourmet';
  $('#f-tipo').disabled = n;
}

function pintar() {
  sincronizarNavidad();
  const prov = $('#f-prov').value, tipo = $('#f-tipo').value, cp = $('#f-cp').value.trim(), navidad = $('#f-navidad').checked;
  let lista = puntos.filter((p) => (!prov || p.provincia_id === prov) && (!tipo || p.tipo === tipo) && (!navidad || p.navidad));
  let aviso = '';
  if (/^\d{5}$/.test(cp)) {
    const zona = PREFIJOS[cp.slice(0, 2)];
    if (!zona) {
      aviso = `<div class="aviso"><p>Aún no llegamos a tu código postal. En el primer año estamos en Granada, Málaga y Sevilla. Mientras, puedes <a href="${url('tienda/')}">comprarlo online</a>.</p></div>`;
      lista = [];
    } else {
      lista = lista.filter((p) => p.provincia_id === zona).sort((a, b) => Math.abs(a.cp - cp) - Math.abs(b.cp - cp));
    }
  } else if (cp) {
    aviso = '<div class="aviso aviso--error"><p>Escribe un código postal de 5 cifras.</p></div>';
  }
  $('#resumen-busqueda').textContent = `${lista.length} ${lista.length === 1 ? 'punto encontrado' : 'puntos encontrados'}${navidad ? ' con la Edición de Navidad' : ''}. Todos son ejemplos.`;
  $('#resultados').innerHTML = aviso + (lista.length ? lista.map((p) => `
    <article class="punto">
      <div class="punto__meta"><span class="marca-ejemplo">Ejemplo</span><span>${esc(p.tipo_texto)}</span>${p.navidad ? '<span>· Edición de Navidad</span>' : ''}</div>
      <h3>${esc(p.nombre)}</h3>
      <p style="margin:0">${esc(p.direccion)} · ${esc(p.cp)} ${esc(p.provincia)}</p>
      <div><a class="btn btn--sec" style="min-height:44px;padding:10px 18px" href="${enlaceMapas(p)}" target="_blank" rel="noopener" data-punto="${p.codigo}">${ICONOS.ubicacion} Cómo llegar<span class="sr"> a ${esc(p.nombre)} (se abre la app de mapas)</span></a></div>
    </article>`).join('') : (aviso ? '' : '<p>No hay puntos con esos filtros. Prueba con otra provincia o tipo.</p>'));
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  pintar();
  track('locator_search', { provincia: $('#f-prov').value || 'todas', tipo: $('#f-tipo').value || 'todos', cp: $('#f-cp').value ? 'si' : 'no', navidad: $('#f-navidad').checked });
});
form.addEventListener('change', (ev) => { if (ev.target.id !== 'f-cp') pintar(); });
$('#resultados').addEventListener('click', (ev) => { const a = ev.target.closest('[data-punto]'); if (a) track('click_directions', { punto: a.dataset.punto }); });
pintar();
