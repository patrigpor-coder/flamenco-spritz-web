// Panel en directo para la defensa: lee el localStorage de este dispositivo.
import { $, leer, cargarConfig, borrarDatosDemo, guardar } from '../nucleo.js';

const config = await cargarConfig();
$('#panel-fuente').textContent = config.contador_compartido?.activo
  ? 'Contador compartido entre móviles.'
  : 'Sin contador compartido: este panel lee el almacenamiento local de este dispositivo. Los escaneos del tribunal se cuentan en cada móvil (demostración).';

const n = (x) => new Intl.NumberFormat('es-ES').format(x || 0);

function pintar() {
  const m = leer('fs_metricas', { eventos: {}, escaneos: {} });
  const ev = m.eventos;
  const escaneos = Object.values(m.escaneos).reduce((a, b) => a + b, 0);
  const inscripciones = (ev.event_signup || 0) + (ev.event_waitlist || 0);
  const desbloqueos = ev.unlock_code_issued || 0;
  const registros = inscripciones + desbloqueos + (ev.unlock_sold_out || 0) + (ev.newsletter_signup || 0) + (ev.guide_download || 0);
  const compras = ev.purchase || 0;
  const cifra = (v, r) => `<div class="panel-cifra"><div class="valor">${n(v)}</div><div class="rotulo">${r}</div></div>`;
  $('#panel-cifras').innerHTML = cifra(escaneos, 'Escaneos de QR') + cifra(inscripciones, 'Inscripciones a eventos') + cifra(desbloqueos, 'Desbloqueos') + cifra(ev.button_game_try, 'Intentos del pulsador') + cifra(compras, 'Compras simuladas');
  $('#panel-qr').innerHTML = [['qr1_eventos', 'QR 1 · Eventos'], ['qr2_desbloquea', 'QR 2 · Festivales'], ['qr3_navidad', 'QR 3 · Navidad'], ['qr4_panel', 'QR 4 · Panel']].map(([k, r]) => cifra(m.escaneos[k], r)).join('');
  const max = Math.max(escaneos, registros, compras, 1);
  const barra = (v, r) => `<div class="embudo__barra" role="img" aria-label="${r}: ${v}"><div class="embudo__relleno" style="width:${(v / max) * 100}%"></div><span><span>${r}</span><strong>${n(v)}</strong></span></div>`;
  $('#panel-embudo').innerHTML = barra(escaneos, 'Escaneo') + barra(registros, 'Registro') + barra(compras, 'Compra');
}

$('#panel-refrescar').addEventListener('click', pintar);
$('#panel-reset').addEventListener('click', () => {
  if (!confirm('¿Poner a cero todos los contadores y datos de la demo de este dispositivo?')) return;
  borrarDatosDemo();
  guardar('fs_metricas', { eventos: {}, escaneos: {} });
  pintar();
});
window.addEventListener('storage', pintar);
setInterval(pintar, 3000);
pintar();
