// Ficha de compra: /tienda/original/ y /tienda/navidad/
import { $, $$, params, cargarJSON, anadirAlCarrito, track, itemGA, euros, url, ICONOS, estadoNavidad, navidadComprable } from '../nucleo.js';

const { productos } = await cargarJSON('productos');
const form = $('#form-compra');
const cant = $('#cantidad');
const skuActual = () => (form.querySelector('input[name="sku"]:checked') || form.querySelector('input[name="sku"]')).value;
const producto = () => productos.find((p) => p.sku === skuActual());

if (params.get('formato') === 'caja6') { const r = form.querySelector('input[value="FS-ORIG-CAJA6"]'); if (r) r.checked = true; }

// Galería: miniaturas y, al elegir formato, la foto de ese formato (pack de 4 o caja de 6).
const verFoto = (indice) => {
  $$('[data-galeria]').forEach((g) => (g.hidden = g.dataset.galeria !== indice));
  $$('[data-ver]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.ver === indice)));
};
$$('[data-ver]').forEach((b) => b.addEventListener('click', () => verFoto(b.dataset.ver)));
const fotoDelFormato = () => { const g = $(`[data-galeria][data-sku="${skuActual()}"]`); if (g) verFoto(g.dataset.galeria); };
form.addEventListener('change', (ev) => { if (ev.target.name === 'sku') fotoDelFormato(); });
fotoDelFormato();

const pintarPrecio = () => {
  const n = Math.max(1, Math.min(99, parseInt(cant.value, 10) || 1));
  cant.value = n;
  $('#precio-linea').textContent = euros(producto().precio * n);
};
form.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-cant]');
  if (!b) return;
  cant.value = Math.max(1, Math.min(99, (parseInt(cant.value, 10) || 1) + Number(b.dataset.cant)));
  pintarPrecio();
});
form.addEventListener('change', pintarPrecio);
cant.addEventListener('input', () => { if (cant.value) pintarPrecio(); });
pintarPrecio();

let comprable = true;
if (producto().disponibilidad === 'navidad') {
  comprable = await navidadComprable();
  if (!comprable) {
    const estado = await estadoNavidad();
    $('#estado-navidad').innerHTML = `<div class="aviso"><p><strong>${estado === 'primeros' ? 'Primero los nuestros: estas 72 horas solo compra la newsletter.' : 'Se abre una vez al año.'}</strong> <a href="${url('navidad/')}">${estado === 'primeros' ? 'Comprueba tu acceso' : 'Avísame cuando se abra'}</a>.</p></div>`;
    $('#btn-anadir').setAttribute('aria-disabled', 'true');
    $('#btn-anadir').textContent = 'No disponible ahora';
    $('#campo-cantidad').hidden = true;
  }
}
track('view_item', { currency: 'EUR', value: producto().precio, items: [itemGA(producto())] });

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (!comprable) return;
  const p = producto();
  const n = parseInt(cant.value, 10) || 1;
  anadirAlCarrito(p.sku, n);
  track('add_to_cart', { currency: 'EUR', value: p.precio * n, items: [itemGA(p, n)] });
  $('#anadido').innerHTML = `<div class="aviso aviso--exito desbloqueado" role="status"><p><strong>Añadido:</strong> ${n} × ${p.formato}.</p><div class="acciones" style="margin-top:8px"><a class="btn" href="${url('carrito/')}">Ver carrito ${ICONOS.flecha}</a><a class="btn btn--sec" href="${url('tienda/')}">Seguir comprando</a></div></div>`;
});
