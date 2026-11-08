// Checkout en tres pasos: datos y edad, envío y pago simulado. Compra como invitado.
import { $, $$, lineasCarrito, guardarCarrito, track, itemGA, euros, url, esc, leer, guardar, guardarContacto, navidadComprable, miniatura } from '../nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario } from '../formularios.js';
import { guardarPedido, nuevoNumero } from '../pedidos.js';

const lineas = await lineasCarrito();
if (!lineas.length) location.replace(url('carrito/'));
if (lineas.some((l) => l.producto.disponibilidad === 'navidad') && !(await navidadComprable())) location.replace(url('carrito/'));

const total = lineas.reduce((s, l) => s + l.producto.precio * l.cantidad, 0);
const items = lineas.map((l) => itemGA(l.producto, l.cantidad));
const datos = leer('fs_checkout', {}, sessionStorage);

// Resumen siempre visible: a la derecha en escritorio, plegable en el móvil.
const minis = await Promise.all(lineas.map((l) => miniatura(l.producto)));
$('#resumen-lineas').innerHTML = lineas.map((l, i) => `<div class="linea-pedido"><div class="mini">${minis[i]}</div><div><p style="margin:0;font-weight:500">${esc(l.producto.formato)}</p><p class="pequeno suave" style="margin:0">${l.cantidad} × ${euros(l.producto.precio)}</p></div><strong>${euros(l.producto.precio * l.cantidad)}</strong></div>`).join('');
$('#resumen-totales').innerHTML = `<div><span>Subtotal</span><span>${euros(total)}</span></div><div><span>Envío</span><span class="pequeno" style="text-align:right">Pendiente de definir<br>(0,00 € en la demostración)</span></div><div class="total"><span>Total (IVA incluido)</span><span>${euros(total)}</span></div>`;
$('#resumen-total').textContent = euros(total);
if (matchMedia('(max-width: 959px)').matches) $('#resumen').removeAttribute('open');

track('begin_checkout', { currency: 'EUR', value: total, items });

const pasos = { 1: $('#paso-1'), 2: $('#paso-2'), 3: $('#paso-3') };
function ir(n) {
  Object.entries(pasos).forEach(([k, el]) => (el.hidden = Number(k) !== n));
  $$('.progreso li').forEach((li) => {
    const k = Number(li.dataset.paso);
    li.classList.toggle('hecho', k < n);
    if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  const h = pasos[n].querySelector('h2');
  h.setAttribute('tabindex', '-1');
  h.focus();
}

// Rellenar lo que ya hubiera escrito en esta sesión
Object.entries(datos).forEach(([k, v]) => {
  const c = document.querySelector(`[name="${k}"]`);
  if (!c || c.type === 'radio') return;
  if (c.type === 'checkbox') c.checked = v === 'si'; else c.value = v;
});
$('#bloque-regalo').hidden = !$('#ck-regalo').checked;
$('#ck-regalo').addEventListener('change', (ev) => { $('#bloque-regalo').hidden = !ev.target.checked; });

[pasos[1], pasos[2]].forEach((f) => activarValidacionEnVivo(f));

pasos[1].addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (!validar(pasos[1])) return;
  Object.assign(datos, datosFormulario(pasos[1]));
  if (!pasos[1].querySelector('#ck-com').checked) datos.comunicaciones = 'no';
  guardar('fs_checkout', datos, sessionStorage);
  ir(2);
});

pasos[2].addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (!validar(pasos[2])) return;
  Object.assign(datos, datosFormulario(pasos[2]));
  if (!$('#ck-regalo').checked) { datos.regalo = 'no'; delete datos.destinatario; delete datos.mensaje; delete datos.destinatario_mayor; }
  guardar('fs_checkout', datos, sessionStorage);
  track('add_shipping_info', { currency: 'EUR', value: total, shipping_tier: 'domicilio_24_48h', items });
  ir(3);
});

$$('[data-volver]').forEach((b) => b.addEventListener('click', () => ir(Number(b.dataset.volver))));

const metodo = () => $('input[name="metodo"]:checked').value;
let infoPago = false;
function pagoInfo() {
  if (infoPago) return;
  infoPago = true;
  track('add_payment_info', { currency: 'EUR', value: total, payment_type: metodo(), items });
}

$('#pago-ko').addEventListener('click', () => {
  pagoInfo();
  $('#error-pago').innerHTML = `<div class="aviso aviso--error" role="alert" tabindex="-1"><p><strong>Pago rechazado (simulado).</strong> La entidad no ha autorizado el cargo. No se ha cobrado nada. Puedes reintentarlo o elegir otro método.</p></div>`;
  $('#error-pago .aviso').focus();
  $('#pago-ok').textContent = 'Reintentar: simular pago aceptado';
});

$('#pago-ok').addEventListener('click', () => {
  pagoInfo();
  const numero = nuevoNumero();
  const ahora = new Date().toISOString();
  const pedido = {
    numero, fecha: ahora, total, metodo: metodo(),
    lineas: lineas.map((l) => ({ sku: l.sku, nombre: l.producto.nombre, formato: l.producto.formato, precio: l.producto.precio, cantidad: l.cantidad })),
    cliente: { email: datos.email, nombre: datos.nombre },
    envio: { direccion: datos.direccion, cp: datos.cp, ciudad: datos.ciudad },
    regalo: datos.regalo === 'si' ? { destinatario: datos.destinatario, mensaje: datos.mensaje || '' } : null,
    comunicaciones: datos.comunicaciones === 'si',
    estado: 0, historial: [ahora],
  };
  guardarPedido(pedido);
  if (pedido.comunicaciones) guardarContacto({ email: datos.email, nacimiento: datos.nacimiento, cp: datos.cp, accion: 'compra', comunicaciones: true });
  track('purchase', { transaction_id: numero, currency: 'EUR', value: total, shipping: 0, tax: 0, items });
  guardarCarrito([]);
  sessionStorage.removeItem('fs_checkout');
  location.href = url(`pedido/confirmado/?n=${encodeURIComponent(numero)}`);
});
