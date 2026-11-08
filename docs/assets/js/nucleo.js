// Núcleo compartido: rutas, datos, almacenamiento local, analítica y utilidades.
// Todo lo que se guarda vive en el propio navegador (localStorage / sessionStorage).

export const BASE = new URL('../../', import.meta.url).href;
export const url = (ruta = '') => BASE + ruta.replace(/^\//, '');
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export const params = new URLSearchParams(location.search);
export const MODERACION = 'El vino solo se disfruta con moderación. No compartir con menores de 18 años.';
export const AVISO_DEMO_FORM = 'Demostración: no se ha enviado ningún dato.';

export const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const euros = (n) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
export const fechaLarga = (d) => new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
export const fechaHora = (d) => new Date(d).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
export const hoyISO = () => new Date().toISOString().slice(0, 10);

// ---------- Almacenamiento ----------
export function leer(clave, defecto = null, almacen = localStorage) {
  try { const v = almacen.getItem(clave); return v === null ? defecto : JSON.parse(v); } catch { return defecto; }
}
export function guardar(clave, valor, almacen = localStorage) {
  try { almacen.setItem(clave, JSON.stringify(valor)); } catch { /* almacenamiento lleno o bloqueado */ }
}
export function borrarDatosDemo() {
  try {
    Object.keys(localStorage).filter((k) => k.startsWith('fs_') && k !== 'fs_consentimiento').forEach((k) => localStorage.removeItem(k));
    Object.keys(sessionStorage).filter((k) => k.startsWith('fs_') && k !== 'fs_edad').forEach((k) => sessionStorage.removeItem(k));
  } catch { /* nada */ }
}

// ---------- Datos ----------
const cache = {};
export function cargarJSON(nombre) {
  cache[nombre] ??= fetch(url(`data/${nombre}.json`)).then((r) => { if (!r.ok) throw new Error(nombre); return r.json(); });
  return cache[nombre];
}
export const cargarConfig = () => cargarJSON('config');

export async function topes() {
  const c = await cargarConfig();
  return c.modo_demostracion ? c.topes_demo : c.topes;
}

// ---------- Edad ----------
export function edadDesde(fechaISO, hoy = new Date()) {
  const n = new Date(fechaISO + 'T12:00:00');
  if (Number.isNaN(n.getTime())) return NaN;
  let e = hoy.getFullYear() - n.getFullYear();
  const m = hoy.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < n.getDate())) e--;
  return e;
}

// ---------- Navidad: cinco estados ----------
const md = (d) => (d.getMonth() + 1) * 100 + d.getDate();
const num = (s) => Number(s.replace('-', ''));
export function estadoNavidadPorFecha(cal, d = new Date()) {
  const x = md(d);
  if (x >= num(cal.aviso_desde) && x < num(cal.primeros_desde)) return 'aviso';
  if (x >= num(cal.primeros_desde) && x < num(cal.abierta_desde)) return 'primeros';
  if (x >= num(cal.abierta_desde) && x <= num(cal.abierta_hasta)) return 'abierta';
  if (x >= num(cal.reyes_desde) || x <= num(cal.reyes_hasta)) return 'reyes';
  return 'cerrada';
}
export const ESTADOS_NAVIDAD = ['aviso', 'primeros', 'abierta', 'reyes', 'cerrada'];
export async function estadoNavidad() {
  const c = await cargarConfig();
  const p = new URLSearchParams(location.search).get('estado');
  if (p && ESTADOS_NAVIDAD.includes(p) && c.modo_demostracion) { guardar('fs_navidad_estado', p, sessionStorage); return p; }
  const demo = c.modo_demostracion ? leer('fs_navidad_estado', null, sessionStorage) : null;
  if (demo && ESTADOS_NAVIDAD.includes(demo)) return demo;
  if (c.navidad.estado !== 'auto') return c.navidad.estado;
  return estadoNavidadPorFecha(c.navidad.calendario);
}
export async function navidadActiva() {
  const c = await cargarConfig();
  if (c.navidad.activa === true || c.navidad.activa === false) return c.navidad.activa;
  return (await estadoNavidad()) !== 'cerrada';
}
export function accesoAnticipado() {
  if (params.get('acceso') === 'anticipado') guardar('fs_acceso_anticipado', true, sessionStorage);
  if (leer('fs_acceso_anticipado', false, sessionStorage)) return true;
  return Object.values(leer('fs_contactos', {})).some((c) => c.comunicaciones?.confirmado);
}
export async function navidadComprable() {
  const e = await estadoNavidad();
  return e === 'abierta' || e === 'reyes' || (e === 'primeros' && accesoAnticipado());
}

// ---------- Temporada (para /q/temporada/ y el inicio) ----------
export async function temporada() {
  const c = await cargarConfig();
  if (c.temporada.modo !== 'auto') return c.temporada.modo;
  if (await navidadActiva()) return 'navidad';
  const m = new Date().getMonth() + 1;
  if (m === 11 || m <= 2) return 'tardeos';
  if (m >= 6 && m <= 9) return 'verano';
  return 'prelanzamiento';
}

// ---------- Analítica (GA4 + Consent Mode v2) ----------
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

export function track(evento, datos = {}) {
  const p = { ...datos, demo: true };
  try { window.gtag('event', evento, p); } catch { /* nada */ }
  const m = leer('fs_metricas', { eventos: {}, escaneos: {} });
  m.eventos[evento] = (m.eventos[evento] || 0) + 1;
  guardar('fs_metricas', m);
}
export function registrarEscaneo(soporte) {
  const m = leer('fs_metricas', { eventos: {}, escaneos: {} });
  m.escaneos[soporte] = (m.escaneos[soporte] || 0) + 1;
  guardar('fs_metricas', m);
}

// Origen de la visita (QR, UTM) para anotarlo en la ficha del contacto
export function origenActual() {
  return leer('fs_origen', { pagina: location.pathname, parametros: '' }, sessionStorage);
}

// ---------- Contactos: una ficha por correo ----------
export const TEXTO_COMUNICACIONES = 'Quiero recibir comunicaciones comerciales de Flamenco Spritz por correo electrónico. Puedo darme de baja cuando quiera.';
export function guardarContacto({ email, nacimiento, cp, conocias, accion, comunicaciones, extra = {} }) {
  const db = leer('fs_contactos', {});
  const clave = email.trim().toLowerCase();
  const ahora = new Date().toISOString();
  const o = origenActual();
  const c = db[clave] || { email: clave, creado: ahora, origenes: [] };
  if (nacimiento) c.nacimiento = nacimiento;
  if (cp) c.cp = cp;
  if (conocias) c.conocias = conocias;
  c.actualizado = ahora;
  c.origenes.push({ fecha: ahora, accion, pagina: o.pagina, qr: o.parametros });
  if (comunicaciones && !c.comunicaciones?.confirmado) {
    c.comunicaciones = { aceptado: ahora, texto: TEXTO_COMUNICACIONES, qr_origen: o.parametros || o.pagina, confirmado: null };
  }
  Object.assign(c, extra);
  db[clave] = c;
  guardar('fs_contactos', db);
  return c;
}
export function confirmarComunicaciones(email) {
  const db = leer('fs_contactos', {});
  const c = db[email.toLowerCase()];
  if (c?.comunicaciones) { c.comunicaciones.confirmado = new Date().toISOString(); guardar('fs_contactos', db); }
  return c;
}
export const contacto = (email) => leer('fs_contactos', {})[email?.toLowerCase()];

// ---------- Carrito ----------
export const leerCarrito = () => leer('fs_carrito', []);
export function guardarCarrito(c) {
  guardar('fs_carrito', c.filter((l) => l.cantidad > 0));
  document.dispatchEvent(new CustomEvent('carrito'));
}
export function anadirAlCarrito(sku, cantidad = 1) {
  const c = leerCarrito();
  const l = c.find((x) => x.sku === sku);
  if (l) l.cantidad = Math.min(99, l.cantidad + cantidad); else c.push({ sku, cantidad });
  guardarCarrito(c);
}
export async function lineasCarrito() {
  const { productos } = await cargarJSON('productos');
  return leerCarrito().map((l) => ({ ...l, producto: productos.find((p) => p.sku === l.sku) })).filter((l) => l.producto);
}
/** Miniatura de una imagen procesada (o null si la foto aún no está). */
export async function srcImagen(id, ancho = 320) {
  const m = (await cargarJSON('imagenes'))[id];
  if (!m || m.svg) return null;
  const a = m.anchos.find((x) => x >= ancho) || m.anchos[m.anchos.length - 1];
  return url(`assets/img/${m.base}-${a}.webp`);
}
export const miniatura = async (p) => {
  const s = await srcImagen(p.imagen, 160);
  return s ? `<img src="${s}" alt="" width="56" height="72" loading="lazy">` : `<span class="pequeno suave" style="display:grid;place-items:center;height:100%;font-size:.6rem;text-align:center">[FOTO PENDIENTE: ${p.imagen}]</span>`;
};
export const itemGA =(p, cantidad = 1) => ({ item_id: p.sku, item_name: p.nombre, item_variant: p.formato, price: p.precio, quantity: cantidad, item_brand: 'Flamenco Spritz' });

// ---------- Interfaz ----------
export const ICONOS = {
  flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  ubicacion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
};

export function mensaje(el, texto, tipo = '') {
  el.innerHTML = `<div class="aviso ${tipo ? 'aviso--' + tipo : ''}" role="status"><p>${texto}</p></div>`;
}

export function correoSimulado({ asunto, para, cuerpo, logo = true }) {
  return `<article class="correo desbloqueado" aria-label="Vista previa del correo: ${esc(asunto)}">
    <div class="correo__meta"><span><strong>Correo simulado</strong> · no se ha enviado</span><span>Para: ${esc(para)}</span><span>Asunto: ${esc(asunto)}</span></div>
    ${logo ? `<div class="correo__cabeza"><img src="${url('assets/img/logo/logo_completo.svg')}" width="220" height="207" alt="Flamenco Spritz. Desbloquea tu aventura. By Bodegas Muñana · 1188 metros"></div>` : ''}
    <div class="correo__cuerpo">${cuerpo}</div>
    <div class="correo__pie"><p>${MODERACION}</p><p>Prototipo académico (TFM del Máster GESCO, ESIC Granada). No es la web oficial de Bodegas Muñana. No se vende ni se envía nada. Puedes darte de baja en cualquier momento.</p></div>
  </article>`;
}

export function codigoAleatorio(n = 6) {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const buf = new Uint32Array(n);
  crypto.getRandomValues(buf);
  return [...buf].map((x) => a[x % a.length]).join('');
}

export async function qrSVG(texto, tam = 200) {
  const { default: qrcode } = await import('./vendor/qrcode.mjs');
  const q = qrcode(0, 'M');
  q.addData(texto);
  q.make();
  const n = q.getModuleCount();
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += `M${x + 4} ${y + 4}h1v1h-1z`;
  return `<svg viewBox="0 0 ${n + 8} ${n + 8}" width="${tam}" height="${tam}" role="img" aria-label="Código QR de ${esc(texto)}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#2B1E33"/></svg>`;
}

export function enlaceMapas(p) {
  const etiqueta = encodeURIComponent(p.nombre);
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Macintosh/.test(ua)) return `https://maps.apple.com/?ll=${p.lat},${p.lng}&q=${etiqueta}`;
  if (/Android/.test(ua)) return `geo:${p.lat},${p.lng}?q=${p.lat},${p.lng}(${etiqueta})`;
  return `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=17/${p.lat}/${p.lng}`;
}
