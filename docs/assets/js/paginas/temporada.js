// /q/temporada/: cambia de contenido sin reimprimir el QR.
//   ?t=L01&d=2027-11-20  → tardeo de ese local y fecha, con el registro de las 20 primeras (kit)
//   ?g=G01               → tarjeta de estante de una tienda gourmet
//   sin parámetros       → lo que marque config.json (temporada)
import { $, params, cargarJSON, temporada, navidadActiva, track, esc, url, ICONOS } from '../nucleo.js';
import { iniciarDesbloqueo } from '../desbloqueo.js';

const { puntos } = await cargarJSON('puntos');
const ante = $('#temporada-ante'), h1 = $('#temporada-h1'), entr = $('#temporada-entradilla');
const t = params.get('t'), g = params.get('g');

if (t) {
  const local = puntos.find((p) => p.codigo === t && p.tipo === 'bar');
  const dRaw = params.get('d') || '';
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(dRaw) ? new Date(dRaw + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : null;
  ante.textContent = 'Tardeo de invierno';
  h1.textContent = local ? `${local.nombre}` : 'Tardeo de invierno';
  entr.innerHTML = local
    ? `${esc(local.barrio)} (${esc(local.provincia)}) · ${fecha ? esc(fecha) : 'fecha <span class="pendiente">[PENDIENTE]</span>'} · <span class="marca-ejemplo">Ejemplo</span><br>Regístrate: las 20 primeras reciben el kit.`
    : 'No reconocemos este local. Prueba con el QR del tardeo.';
  $('#temporada-acciones').hidden = true;
  $('#temporada-tardeo').hidden = false;
  track('season_page_view', { temporada: 'tardeo', local: t });
  if (local) await iniciarDesbloqueo({ tipo: 'tardeo', clave: `tardeo:${t}:${dRaw || 'sin_fecha'}`, titulo: `Tardeo · ${local.nombre}`, sufijoCodigo: t });
} else if (g) {
  const tienda = puntos.find((p) => p.codigo === g && p.tipo === 'gourmet');
  const enNavidad = await navidadActiva();
  ante.textContent = tienda ? `${tienda.nombre} · ${tienda.barrio} (${tienda.provincia})` : 'Tienda gourmet';
  if (enNavidad) {
    h1.textContent = 'Esta tienda tiene la edición';
    entr.textContent = 'La Edición de Navidad: una botella grabada de 50 cl para la mesa. Cómprala aquí, en la tienda, o pídela online.';
    $('#temporada-navidad').hidden = false;
  } else {
    h1.textContent = 'La Original, en esta tienda';
    entr.textContent = 'Flor de saúco, en botella de 25 cl. Llévatela de aquí o pídela online.';
    $('#temporada-original').hidden = false;
  }
  track('season_page_view', { temporada: enNavidad ? 'navidad' : 'original', tienda: g });
} else {
  const tem = await temporada();
  track('season_page_view', { temporada: tem });
  const textos = {
    navidad: ['Edición de Navidad', 'Una botella para la mesa', 'Se abre una vez al año.'],
    tardeos: ['Tardeo de invierno', 'Nueve tardes, tres ciudades', 'De noviembre a febrero, en locales que ya lo sirven.'],
    festivales: ['Festivales', 'Tres festivales, un stand', 'Interestelar, Brisa y Granada Sound.'],
    verano: ['Desbloquea tu barrio', 'Rutas por barrio', 'De junio a septiembre: descubre locales de tu barrio.'],
    prelanzamiento: ['Prelanzamiento', 'Tres ciudades, una primera vez', 'Granada, Málaga y Sevilla, en mayo de 2027.'],
  };
  const enlaces = { navidad: 'navidad/', tardeos: 'tardeos/', festivales: 'festivales/', verano: 'momentos/', prelanzamiento: 'eventos/' };
  const [a, b, c] = textos[tem] || textos.prelanzamiento;
  ante.textContent = a; h1.textContent = b;
  entr.innerHTML = `${c} <a class="enlace-flecha" href="${url(enlaces[tem] || 'eventos/')}">Ver más ${ICONOS.flecha}</a>`;
  if (tem === 'navidad') $('#temporada-navidad').hidden = false;
  else $('#temporada-original').hidden = false;
}
