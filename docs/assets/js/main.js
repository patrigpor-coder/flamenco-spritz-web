// Punto de entrada de todas las páginas.
import { $, $$, url, params, leer, guardar, borrarDatosDemo, cargarConfig, track, registrarEscaneo, edadDesde, navidadActiva, leerCarrito, ICONOS } from './nucleo.js';
import { iniciarCaptacion } from './formularios.js';

const ruta = location.pathname;
const exenta = /\/(edad|legal)\//.test(ruta);

// ---------- 1. Origen de la visita (QR y UTM) ----------
(function origen() {
  const claves = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'f', 's', 't', 'd', 'l', 'k', 'g', 'e'];
  const p = claves.filter((k) => params.has(k)).map((k) => `${k}=${params.get(k)}`).join('&');
  if (p) guardar('fs_origen', { pagina: ruta, parametros: p, fecha: new Date().toISOString() }, sessionStorage);
  const esQR = params.get('utm_source') === 'qr' || /\/q\//.test(ruta);
  if (esQR && !sessionStorage.getItem('fs_escaneo:' + location.search)) {
    try { sessionStorage.setItem('fs_escaneo:' + location.search, '1'); } catch { /* nada */ }
    const soporte = params.get('utm_content') || params.get('s') || (params.has('l') ? 'posavasos' : params.has('k') ? 'kit' : params.has('g') ? 'estante' : params.has('t') ? 'tardeo' : 'sin_soporte');
    registrarEscaneo(soporte);
    track('qr_landing_view', { soporte, pagina: ruta, campana: params.get('utm_campaign') || '' });
  }
})();

// ---------- 2. Verificación de edad ----------
function capaEdad() {
  const capa = document.createElement('div');
  capa.className = 'capa-edad';
  capa.setAttribute('role', 'dialog');
  capa.setAttribute('aria-modal', 'true');
  capa.setAttribute('aria-labelledby', 'edad-titulo');
  capa.innerHTML = `
    <div class="capa-edad__caja">
      <img class="capa-edad__logo" src="${url('assets/img/logo/logo_completo.svg')}" width="220" height="207" alt="Flamenco Spritz. Desbloquea tu aventura. By Bodegas Muñana · 1188 metros">
      <h2 id="edad-titulo">Antes de entrar, tu fecha de nacimiento</h2>
      <p>Esta web habla de una bebida a base de vino. Solo pueden entrar personas de 18 años o más.</p>
      <form class="form" id="form-edad" novalidate>
        <fieldset>
          <legend class="sr">Fecha de nacimiento</legend>
          <div class="fecha-campos">
            <div class="campo"><label for="edad-d">Día</label><input id="edad-d" inputmode="numeric" maxlength="2" autocomplete="bday-day" placeholder="DD" required></div>
            <div class="campo"><label for="edad-m">Mes</label><input id="edad-m" inputmode="numeric" maxlength="2" autocomplete="bday-month" placeholder="MM" required></div>
            <div class="campo"><label for="edad-a">Año</label><input id="edad-a" inputmode="numeric" maxlength="4" autocomplete="bday-year" placeholder="AAAA" required></div>
          </div>
        </fieldset>
        <p class="error-campo" id="edad-error" role="alert"></p>
        <button class="btn btn--bloque" type="submit">Desbloquear ${ICONOS.flecha}</button>
      </form>
      <p class="pequeno suave">No guardamos tu fecha: solo recordamos, durante esta visita, que has superado la verificación.</p>
      <p class="franja">Prototipo académico (TFM del Máster GESCO, ESIC Granada). No es la web oficial de Bodegas Muñana. No se vende ni se envía nada.<br>El vino solo se disfruta con moderación. No compartir con menores de 18 años.</p>
    </div>`;
  return capa;
}

export function verificarFecha(d, m, a) {
  const dd = Number(d), mm = Number(m), aa = Number(a);
  const f = new Date(aa, mm - 1, dd);
  if (!dd || !mm || !aa || aa < 1900 || f.getDate() !== dd || f.getMonth() !== mm - 1 || f > new Date()) return { error: 'Revisa la fecha: día, mes y año (por ejemplo, 07 03 1990).' };
  const iso = `${aa}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  return { edad: edadDesde(iso) };
}

function iniciarEdad() {
  if (exenta) { document.documentElement.classList.remove('edad-pendiente'); return Promise.resolve(); }
  const estado = sessionStorage.getItem('fs_edad');
  if (estado === 'ok') { document.documentElement.classList.remove('edad-pendiente'); return Promise.resolve(); }
  if (estado === 'no') { location.replace(url('edad/?estado=no')); return new Promise(() => {}); }
  return new Promise((resolver) => {
    const capa = capaEdad();
    const hermanos = [...document.body.children];
    hermanos.forEach((h) => h.setAttribute('inert', ''));
    document.body.append(capa);
    document.documentElement.classList.remove('edad-pendiente');
    document.body.style.overflow = 'hidden';
    const campos = ['d', 'm', 'a'].map((k) => $('#edad-' + k, capa));
    campos.forEach((c, i) => c.addEventListener('input', () => { if (c.value.length === c.maxLength && campos[i + 1]) campos[i + 1].focus(); }));
    setTimeout(() => campos[0].focus(), 50);
    $('#form-edad', capa).addEventListener('submit', (ev) => {
      ev.preventDefault();
      const r = verificarFecha(...campos.map((c) => c.value));
      const err = $('#edad-error', capa);
      if (r.error) { err.textContent = r.error; campos.forEach((c) => c.setAttribute('aria-invalid', 'true')); campos[0].focus(); return; }
      if (r.edad < 18) { sessionStorage.setItem('fs_edad', 'no'); location.replace(url('edad/?estado=no')); return; }
      sessionStorage.setItem('fs_edad', 'ok');
      track('age_gate_pass', { pagina: ruta });
      capa.remove();
      hermanos.forEach((h) => h.removeAttribute('inert'));
      document.body.style.overflow = '';
      ($('main h1') || $('main'))?.focus?.();
      resolver();
    });
  });
}

// ---------- 3. Cookies: Consent Mode v2 y GA4 ----------
async function cargarGA4() {
  const c = await cargarConfig();
  const id = c.ga4_id;
  if (!id || id === 'G-XXXXXXX' || !/^G-[A-Z0-9]{6,}$/.test(id)) return; // Sin ID real no se carga nada.
  if (document.getElementById('ga4')) return;
  const s = document.createElement('script');
  s.id = 'ga4'; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(s);
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

function aplicarConsentimiento(c) {
  window.gtag('consent', 'update', { analytics_storage: c.analitica ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (c.analitica) cargarGA4();
}

export function bannerCookies(forzar = false) {
  const previo = leer('fs_consentimiento');
  if (previo && !forzar) { aplicarConsentimiento(previo); return; }
  $('.banner-cookies')?.remove();
  const b = document.createElement('section');
  b.className = 'banner-cookies';
  b.setAttribute('aria-labelledby', 'cookies-titulo');
  b.innerHTML = `
    <h2 id="cookies-titulo">Cookies y analítica</h2>
    <p>Guardamos en tu navegador lo necesario para que funcione la demo (edad, carrito y registros). Con tu permiso, mediríamos las visitas con Google Analytics 4. En este prototipo no se carga porque no hay un identificador real. <a href="${url('legal/cookies/')}">Más información</a>.</p>
    <div class="opciones" hidden id="cookies-opciones">
      <label class="casilla"><input type="checkbox" checked disabled><span>Necesarias para que funcione la web (siempre activas).</span></label>
      <label class="casilla"><input type="checkbox" id="cookies-analitica" ${previo?.analitica ? 'checked' : ''}><span>Analítica (GA4), con datos agregados.</span></label>
    </div>
    <div class="acciones">
      <button type="button" class="btn btn--sec" data-c="rechazar">Rechazar</button>
      <button type="button" class="btn btn--sec" data-c="configurar" aria-expanded="false" aria-controls="cookies-opciones">Configurar</button>
      <button type="button" class="btn" data-c="aceptar">Aceptar</button>
    </div>`;
  document.body.append(b);
  b.addEventListener('click', (ev) => {
    const acc = ev.target.closest('[data-c]')?.dataset.c;
    if (!acc) return;
    if (acc === 'configurar') {
      const op = $('#cookies-opciones', b);
      if (op.hidden) { op.hidden = false; ev.target.textContent = 'Guardar selección'; ev.target.setAttribute('aria-expanded', 'true'); return; }
      return decidir({ analitica: $('#cookies-analitica', b).checked });
    }
    decidir({ analitica: acc === 'aceptar' });
  });
  function decidir(c) {
    c.fecha = new Date().toISOString();
    guardar('fs_consentimiento', c);
    aplicarConsentimiento(c);
    b.remove();
  }
}

// ---------- 4. Cabecera: menú, carrito y Navidad ----------
function iniciarCabecera() {
  const btn = $('.btn-menu');
  const menu = $('#menu-movil');
  if (btn && menu) {
    const cerrar = () => { menu.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; btn.focus(); };
    btn.addEventListener('click', () => { menu.classList.add('abierto'); btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('a, button', menu)?.focus(); });
    $('.btn-cerrar-menu', menu)?.addEventListener('click', cerrar);
    menu.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') cerrar();
      if (ev.key === 'Tab') {
        const f = $$('a, button', menu); const pri = f[0], ult = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === pri) { ev.preventDefault(); ult.focus(); }
        else if (!ev.shiftKey && document.activeElement === ult) { ev.preventDefault(); pri.focus(); }
      }
    });
  }
  const pintar = () => {
    const n = leerCarrito().reduce((s, l) => s + l.cantidad, 0);
    $$('.contador-carrito').forEach((c) => { c.textContent = n; n ? c.removeAttribute('data-vacio') : c.setAttribute('data-vacio', ''); });
    $$('.enlace-carrito').forEach((a) => a.setAttribute('aria-label', n ? `Carrito, ${n} ${n === 1 ? 'artículo' : 'artículos'}` : 'Carrito, vacío'));
  };
  pintar();
  document.addEventListener('carrito', pintar);
  window.addEventListener('storage', pintar);
  navidadActiva().then((activa) => { if (activa) $$('[data-nav-navidad]').forEach((e) => (e.hidden = false)); }).catch(() => {});
}

// ---------- 5. Pie: borrar datos y cookies ----------
function iniciarPie() {
  document.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-borrar-demo]')) {
      if (confirm('¿Borrar todos los datos de la demo guardados en este móvil (registros, carrito, pedidos y contactos)?')) {
        borrarDatosDemo();
        alert('Hecho: se han borrado los datos de la demo de este navegador.');
        location.reload();
      }
    }
    if (ev.target.closest('[data-cookies]')) bannerCookies(true);
  });
}

// ---------- 6. Aparición discreta ----------
function iniciarRevelado() {
  const els = $$('.revelar');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('visible')); return; }
  const io = new IntersectionObserver((ent) => ent.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}

// ---------- Arranque ----------
iniciarCabecera();
iniciarPie();
iniciarRevelado();
iniciarCaptacion();
cargarConfig().then((c) => { if (c.modo_demostracion) $$('[data-solo-demo]').forEach((e) => (e.hidden = false)); }).catch(() => {});
const pagina = document.body.dataset.pagina;
const moduloPagina = pagina ? import(`./paginas/${pagina}.js`).catch((e) => console.warn('Módulo de página no disponible:', pagina, e)) : null;
iniciarEdad().then(() => { if (!exenta || !/\/edad\//.test(ruta)) bannerCookies(); });
export { moduloPagina };
