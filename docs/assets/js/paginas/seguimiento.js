import { $, url, esc, fechaHora } from '../nucleo.js';
import { ESTADOS, pedidoActual, guardarPedido } from '../pedidos.js';
import { htmlCaptacion, iniciarCaptacion } from '../formularios.js';

const p = pedidoActual();
const linea = $('#linea-seguimiento');
const btn = $('#avanzar');
const msg = $('#seg-mensaje');

function pintar(anunciar = false) {
  if (!p) {
    $('#seg-pedido').innerHTML = 'No hay ningún pedido de demostración en este móvil.';
    btn.hidden = true;
    msg.innerHTML = `<a class="btn" href="${url('tienda/')}">Ir a la tienda</a>`;
    return;
  }
  $('#seg-pedido').innerHTML = `Pedido <strong class="codigo">${esc(p.numero)}</strong> · Transportista: <span class="pendiente">[PENDIENTE]</span>`;
  linea.innerHTML = ESTADOS.map((e, i) => `<li class="${i < p.estado ? 'hecho' : i === p.estado ? 'actual' : 'pendiente-paso'}"${i === p.estado ? ' aria-current="step"' : ''}><span class="fecha">${e.nombre}</span>${p.historial[i] ? `<p class="pequeno suave" style="margin:0">${fechaHora(p.historial[i])}</p>` : ''}</li>`).join('');
  btn.hidden = p.estado >= ESTADOS.length - 1;
  let html = '';
  if (ESTADOS[p.estado].id === 'reparto') html = '<div class="aviso"><p><strong>El repartidor te pedirá el DNI.</strong> Si quien recibe es menor o no lo enseña, el pedido vuelve a bodega.</p></div>';
  if (ESTADOS[p.estado].id === 'entregado') {
    html = `<div class="aviso aviso--exito"><p><strong>Entregado.</strong> Ahora, a servirlo bien.</p></div>
      <a class="btn" href="${url('rituales/')}">Prueba un ritual</a>
      <div class="tarjeta tarjeta--lino2" style="margin-top:24px"><h2 style="font-size:1.6rem">El próximo tardeo</h2><p>Déjanos tu correo y te avisamos del próximo tardeo cerca de ti.</p>${htmlCaptacion({ id: 'tardeo-seg', tipo: 'newsletter', origen: 'seguimiento_entregado', boton: 'Avisadme', exito: 'Te hemos enviado (en simulación) un correo para confirmar.' })}</div>`;
  }
  msg.innerHTML = html;
  iniciarCaptacion(msg);
  if (anunciar) $('#seg-pedido').insertAdjacentHTML('beforeend', `<span class="sr"> Estado: ${ESTADOS[p.estado].nombre}</span>`);
}

btn.addEventListener('click', () => {
  if (!p || p.estado >= ESTADOS.length - 1) return;
  p.estado += 1;
  p.historial[p.estado] = new Date().toISOString();
  guardarPedido(p);
  pintar(true);
});
pintar();
