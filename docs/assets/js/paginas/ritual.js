// /q/ritual/?l=L01 (vaso y posavasos de un local) o ?k=int|bri|gso|tardeo (copa y caja del kit)
import { $, params, cargarJSON, esc } from '../nucleo.js';

const l = params.get('l'), k = params.get('k');
const zona = $('#ritual-contexto');
if (l) {
  const { puntos } = await cargarJSON('puntos');
  const p = puntos.find((x) => x.codigo === l);
  zona.innerHTML = `<div class="aviso aviso--exito"><p><strong>Estás en un local que lo sirve.</strong> ${p ? `${esc(p.nombre)} · ${esc(p.barrio)} (${esc(p.provincia)}) <span class="marca-ejemplo">Ejemplo</span>` : ''}</p></div>`;
}
if (k) {
  zona.innerHTML += '<div class="aviso aviso--exito"><p><strong>Tu kit abre un segundo ritual.</strong> Lo tienes más abajo.</p></div>';
  $('#ritual-kit').hidden = false;
}
