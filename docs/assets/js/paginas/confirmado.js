import { $, euros, esc, url, correoSimulado, fechaHora } from '../nucleo.js';
import { pedidoActual } from '../pedidos.js';
import { bloqueDobleAceptacion } from '../formularios.js';

const p = pedidoActual();
if (!p) {
  $('#numero-pedido').textContent = 'No hay ningún pedido de demostración en este móvil.';
  $('#detalle-pedido').innerHTML = `<a class="btn" href="${url('tienda/')}">Ir a la tienda</a>`;
  $('#btn-seguimiento').hidden = true;
} else {
  $('#numero-pedido').innerHTML = `Número de pedido: <strong class="codigo">${esc(p.numero)}</strong>`;
  $('#btn-seguimiento').href = url(`pedido/seguimiento/?n=${encodeURIComponent(p.numero)}`);
  const lineas = p.lineas.map((l) => `<tr><td>${esc(l.nombre)}<br><span class="pequeno suave">${esc(l.formato)}</span></td><td>${l.cantidad}</td><td style="text-align:right">${euros(l.precio * l.cantidad)}</td></tr>`).join('');
  const tabla = `<div class="tabla-scroll"><table class="tabla"><thead><tr><th scope="col">Producto</th><th scope="col">Uds.</th><th scope="col" style="text-align:right">Importe</th></tr></thead><tbody>${lineas}</tbody><tfoot><tr><td colspan="2">Envío (pendiente de definir)</td><td style="text-align:right">0,00 €</td></tr><tr><th scope="row" colspan="2">Total (IVA incluido)</th><th style="text-align:right">${euros(p.total)}</th></tr></tfoot></table></div>`;
  const regalo = p.regalo ? `<p><strong>Es un regalo</strong> para ${esc(p.regalo.destinatario)}.${p.regalo.mensaje ? ` Tarjeta con origen: «${esc(p.regalo.mensaje)}».` : ''} Quien recibe enseñará su DNI.</p>` : '';
  $('#detalle-pedido').innerHTML = `${tabla}
    <ul class="lista-datos" style="margin-top:16px"><li><span>Fecha</span><span>${fechaHora(p.fecha)}</span></li><li><span>Entrega estimada</span><span>De 24 a 48 horas desde la salida de bodega</span></li><li><span>Envío a</span><span>${esc(p.envio.direccion)}, ${esc(p.envio.cp)} ${esc(p.envio.ciudad)}</span></li></ul>
    ${regalo}<div class="aviso"><p>El repartidor pedirá el DNI. Si quien recibe es menor o no lo enseña, el pedido vuelve a bodega.</p></div>`;
  const sello = $('#tpl-sello').innerHTML;
  $('#correo-confirmacion').innerHTML = correoSimulado({
    asunto: `Pedido ${p.numero} confirmado`,
    para: p.cliente.email,
    cuerpo: `<h3 style="margin-top:0">Hola, ${esc(p.cliente.nombre.split(' ')[0])}:</h3><p>Hemos recibido tu pedido <strong>${esc(p.numero)}</strong>. Sale de la bodega y llega en 24 a 48 horas.</p>${tabla}${regalo}<p>Te pediremos el DNI en la entrega.</p><div style="display:flex;justify-content:center;margin:16px 0">${sello}</div><p><a class="btn" href="${url(`pedido/seguimiento/?n=${encodeURIComponent(p.numero)}`)}">Seguir mi pedido</a></p><p class="pequeno">Vendedor: <span class="pendiente">[PENDIENTE]</span>. Condiciones de venta y derecho de desistimiento: ${url('legal/condiciones-de-venta/')}</p>`,
  }) + (p.comunicaciones ? `<h2 style="margin-top:48px;font-size:2rem">Y el de la suscripción</h2>${bloqueDobleAceptacion(p.cliente.email, 'checkout')}` : '');
}
