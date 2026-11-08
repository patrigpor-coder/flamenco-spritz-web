import { $, lineasCarrito, leerCarrito, guardarCarrito, track, itemGA, euros, url, esc, navidadComprable, miniatura, iniciarSimuladorHorario } from '../nucleo.js';

const zona = $('#lineas-carrito');
let primera = true;

async function pintar() {
  const lineas = await lineasCarrito();
  const subtotal = lineas.reduce((s, l) => s + l.producto.precio * l.cantidad, 0);
  const navidadBloqueada = lineas.some((l) => l.producto.disponibilidad === 'navidad') && !(await navidadComprable());
  if (primera) { track('view_cart', { currency: 'EUR', value: subtotal, items: lineas.map((l) => itemGA(l.producto, l.cantidad)) }); primera = false; }
  if (!lineas.length) {
    zona.innerHTML = `<p class="entradilla">Tu carrito está vacío.</p><a class="btn" href="${url('tienda/')}">Ir a la tienda</a>`;
  } else {
    const minis = await Promise.all(lineas.map((l) => miniatura(l.producto)));
    zona.innerHTML = lineas.map((l, i) => `
      <div class="linea-pedido" style="grid-template-columns:56px 1fr auto">
        <div class="mini">${minis[i]}</div>
        <div>
          <p style="margin:0;font-weight:500">${esc(l.producto.nombre)}</p>
          <p class="pequeno suave" style="margin:0">${esc(l.producto.formato)} · ${euros(l.producto.precio)}</p>
          <div style="display:flex;gap:12px;align-items:center;margin-top:8px;flex-wrap:wrap">
            <div class="cantidad" role="group" aria-label="Cantidad de ${esc(l.producto.formato)}"><button type="button" data-sku="${l.sku}" data-d="-1" aria-label="Quitar una">−</button><input type="number" min="1" max="99" value="${l.cantidad}" data-sku="${l.sku}" aria-label="Cantidad"><button type="button" data-sku="${l.sku}" data-d="1" aria-label="Añadir una">+</button></div>
            <button type="button" class="enlace-flecha" style="background:none;border:0;color:var(--iris);cursor:pointer;font:inherit;text-decoration:underline;min-height:44px" data-quitar="${l.sku}">Eliminar</button>
          </div>
        </div>
        <strong>${euros(l.producto.precio * l.cantidad)}</strong>
      </div>`).join('') + (navidadBloqueada ? `<div class="aviso aviso--error"><p>La Edición de Navidad no está a la venta ahora. Elimínala para tramitar el pedido.</p></div>` : '');
  }
  $('#totales-carrito').innerHTML = `<div><span>Subtotal</span><span>${euros(subtotal)}</span></div><div><span>Envío</span><span class="pequeno" style="text-align:right">Pendiente de definir<br>(0,00 € en la demostración)</span></div><div class="total"><span>Total (IVA incluido)</span><span>${euros(subtotal)}</span></div>`;
  const b = $('#btn-tramitar');
  const bloqueado = !lineas.length || navidadBloqueada;
  b.setAttribute('aria-disabled', String(bloqueado));
  b.toggleAttribute('data-bloqueado', bloqueado);
}

function cambiar(sku, valor) {
  const c = leerCarrito();
  const l = c.find((x) => x.sku === sku);
  if (!l) return;
  const antes = l.cantidad;
  l.cantidad = Math.max(0, Math.min(99, valor));
  guardarCarrito(c);
  if (l.cantidad < antes) track('remove_from_cart', { currency: 'EUR', items: [{ item_id: sku, quantity: antes - l.cantidad }] });
  pintar();
}

zona.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-d]');
  if (b) { const l = leerCarrito().find((x) => x.sku === b.dataset.sku); cambiar(b.dataset.sku, Math.max(1, l.cantidad + Number(b.dataset.d))); }
  const q = ev.target.closest('[data-quitar]');
  if (q) cambiar(q.dataset.quitar, 0);
});
zona.addEventListener('change', (ev) => { if (ev.target.matches('input[data-sku]')) cambiar(ev.target.dataset.sku, Math.max(1, parseInt(ev.target.value, 10) || 1)); });
$('#btn-tramitar').addEventListener('click', (ev) => { if (ev.currentTarget.hasAttribute('data-bloqueado')) ev.preventDefault(); });
pintar();
iniciarSimuladorHorario((fuera) => { $('#aviso-horario').hidden = !fuera; });
