import { $, $$, cargarConfig, cargarJSON, estadoNavidad, accesoAnticipado, guardar, contacto, track, url, esc, ICONOS, enlaceMapas } from '../nucleo.js';
import { htmlCaptacion, iniciarCaptacion } from '../formularios.js';

const config = await cargarConfig();
const cal = config.navidad.calendario;
const zona = $('#navidad-estado');

if (!(config.modo_demostracion && config.navidad.selector_visible_en_demo)) $('#selector-navidad').hidden = true;
else {
  $('#selector-navidad').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-estado]');
    if (!b) return;
    guardar('fs_navidad_estado', b.dataset.estado, sessionStorage);
    const u = new URL(location.href); u.searchParams.delete('estado'); history.replaceState(null, '', u);
    pintar();
  });
}

function proxima(mmdd) {
  const [m, d] = mmdd.split('-').map(Number);
  const hoy = new Date();
  let f = new Date(hoy.getFullYear(), m - 1, d);
  if (f <= hoy) f = new Date(hoy.getFullYear() + 1, m - 1, d);
  return f;
}

let reloj;
function cuentaAtras(objetivo) {
  clearInterval(reloj);
  const pintarCA = () => {
    const el = $('#cuenta');
    if (!el) return clearInterval(reloj);
    const ms = Math.max(0, objetivo - new Date());
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
    el.innerHTML = `<div><strong>${d}</strong><span>días</span></div><div><strong>${h}</strong><span>horas</span></div><div><strong>${m}</strong><span>min</span></div>`;
    el.setAttribute('aria-label', `Faltan ${d} días, ${h} horas y ${m} minutos`);
  };
  pintarCA();
  reloj = setInterval(pintarCA, 30000);
}

const avisame = (titulo) => `<h2 style="font-size:2rem">${titulo}</h2>
  <p>Déjanos tu correo y te avisamos el día que se abra. Nada más.</p>
  ${htmlCaptacion({ id: 'avisame', iman: 'aviso-navidad', origen: 'navidad', boton: 'Avísame', exito: 'Te avisaremos cuando se abra la edición.' })}`;

const comprar = `<div class="acciones"><a class="btn" href="${url('tienda/navidad/')}">Comprar online ${ICONOS.flecha}</a><a class="btn btn--sec" href="${url('donde-encontrarlo/?navidad=1')}">Tiendas gourmet</a></div>`;

async function tiendas(titulo) {
  const { puntos } = await cargarJSON('puntos');
  const g = puntos.filter((p) => p.navidad);
  return `<h3 style="margin-top:32px">${titulo}</h3><ul class="lista-datos">${g.map((p) => `<li><span>${esc(p.nombre)} · ${esc(p.barrio)} (${esc(p.provincia)}) <span class="marca-ejemplo">Ejemplo</span></span><span><a href="${enlaceMapas(p)}" target="_blank" rel="noopener" data-direcciones="${p.codigo}">Cómo llegar</a></span></li>`).join('')}</ul>`;
}

async function pintar() {
  const estado = await estadoNavidad();
  $$('#selector-navidad [data-estado]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.estado === estado)));
  $('#guia-regalo').hidden = !(estado === 'abierta' || estado === 'reyes');
  track('season_page_view', { temporada: 'navidad', estado });
  let html = '';
  if (estado === 'aviso') {
    html = `<p class="antetitulo">Se abre una vez al año</p><p>Faltan para «Primero los nuestros»:</p><div class="cuenta-atras" id="cuenta" role="timer"></div>${avisame('Avísame')}`;
  } else if (estado === 'cerrada') {
    html = `<p class="antetitulo">Se abre una vez al año</p><p>La campaña va de octubre al 6 de enero. Cada Navidad, un sabor nuevo.</p>${avisame('Avísame')}`;
  } else if (estado === 'primeros') {
    html = `<p class="antetitulo">Primero los nuestros · 72 horas</p><p>Durante tres días, la edición se abre solo para quien está en la newsletter. Mismo precio: sin descuento. El 5 de noviembre se abre para todos.</p>`;
    if (accesoAnticipado()) {
      html += `<div class="aviso aviso--exito"><p><strong>Tienes acceso anticipado.</strong> Ya puedes comprar.</p></div>${comprar}`;
    } else {
      html += `<form class="form" id="form-acceso" novalidate><div class="campo"><label for="acc-email">Tu correo de la newsletter</label><input id="acc-email" type="email" required autocomplete="email"></div><button class="btn" type="submit">Comprobar mi acceso</button><p class="nota-demo-form">Se comprueba solo en este móvil.</p></form><div id="acceso-msg" aria-live="polite"></div>`;
    }
  } else if (estado === 'abierta') {
    html = `<p class="antetitulo">Abierta · hasta el 25 de diciembre</p><p>Para comprar online o en tiendas gourmet. Mira la guía de regalo más abajo.</p>${comprar}${await tiendas('Cerca de ti: tiendas gourmet con la edición')}`;
  } else if (estado === 'reyes') {
    html = `<p class="antetitulo">Hasta Reyes · del 26 de diciembre al 6 de enero</p><p>Último día de envío para Reyes: <span class="pendiente">[PENDIENTE]</span>. Después, quedan las tiendas.</p>${comprar}${await tiendas('Las últimas tiendas')}`;
  }
  zona.innerHTML = html;
  if (estado === 'aviso') cuentaAtras(proxima(cal.primeros_desde));
  iniciarCaptacion(zona);
  $('#form-acceso')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = $('#acc-email').value.trim();
    const c = contacto(email);
    if (c?.comunicaciones?.confirmado) { guardar('fs_acceso_anticipado', true, sessionStorage); pintar(); }
    else $('#acceso-msg').innerHTML = `<div class="aviso aviso--error"><p>Ese correo no está confirmado en la newsletter de este móvil. La compra se abre a todos el 5 de noviembre. <a href="${url('comunidad/')}">Suscríbete</a> para la próxima.</p></div>`;
  });
}

zona.addEventListener('click', (ev) => { const a = ev.target.closest('[data-direcciones]'); if (a) track('click_directions', { punto: a.dataset.direcciones, origen: 'navidad' }); });
pintar();
