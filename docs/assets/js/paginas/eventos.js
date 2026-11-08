import { $, $$, cargarConfig, guardar, leer, esc } from '../nucleo.js';
import { estadoCiudades, leerInscripciones } from '../eventos-datos.js';

const config = await cargarConfig();
const topes = config.modo_demostracion ? config.topes_demo : config.topes;

async function pintar() {
  const cs = await estadoCiudades();
  const db = leerInscripciones();
  cs.forEach((c) => {
    const t = $(`[data-ciudad="${c.id}"]`);
    if (!t) return;
    const nota = config.modo_demostracion ? `<br><span class="pequeno suave">Demostración: tope de ${c.tope} (en el evento real, ${c.plazas})</span>` : '';
    const inscritas = (db[c.id] || []).length;
    const sorteo = inscritas < topes.sorteo_villa_primeras
      ? `<br><span class="pequeno">Sorteo de Villa Flamenco: quedan ${topes.sorteo_villa_primeras - inscritas} de las ${topes.sorteo_villa_primeras} primeras inscripciones.</span>`
      : '<br><span class="pequeno">Las primeras inscripciones del sorteo ya están: inscripción normal.</span>';
    $('.plazas', t).innerHTML = (c.libres > 0
      ? `Quedan <strong>${c.libres}</strong> de ${c.tope} plazas`
      : `<strong>Lista de espera abierta</strong> · ${c.espera} en espera`) + sorteo + nota;
    $('a.btn', t).innerHTML = c.libres > 0 ? 'Reservar plaza' : 'Apuntarme a la lista de espera';
  });
}

// ---------- Sorteo de Villa Flamenco (solo se simula en la demo) ----------
const ocultar = (email) => { const [u, d] = email.split('@'); return `${u.slice(0, 1)}•••@${d}`; };
const nombres = { granada: 'Granada', malaga: 'Málaga', sevilla: 'Sevilla' };

function sortear(ciudad) {
  const zona = $('#resultado-sorteo');
  const participantes = (leerInscripciones()[ciudad] || []).filter((r) => r.sorteo === 'si' && r.estado !== 'cancelada');
  if (!participantes.length) {
    zona.innerHTML = `<div class="aviso"><p>Todavía no hay nadie en el sorteo de ${nombres[ciudad]}. Inscríbete con 21 años o más entre las ${topes.sorteo_villa_primeras} primeras.</p></div>`;
    return;
  }
  const azar = new Uint32Array(1);
  crypto.getRandomValues(azar);
  const g = participantes[azar[0] % participantes.length];
  const resultados = leer('fs_sorteo', {});
  resultados[ciudad] = { email: g.email, orden: g.orden, fecha: new Date().toISOString(), participantes: participantes.length };
  guardar('fs_sorteo', resultados);
  zona.innerHTML = `<div class="aviso aviso--exito desbloqueado"><p><strong>Sorteo simulado de ${nombres[ciudad]}:</strong> gana la inscripción nº ${g.orden} (${esc(ocultar(g.email))}), entre ${participantes.length} ${participantes.length === 1 ? 'participante' : 'participantes'}.</p><p class="pequeno">Una noche en Villa Flamenco para la persona ganadora y un acompañante mayor de edad. Demostración: no se comunica nada a nadie.</p></div>`;
}
$$('[data-sorteo]').forEach((b) => b.addEventListener('click', () => sortear(b.dataset.sorteo)));

$('#reiniciar-eventos')?.addEventListener('click', () => {
  if (confirm('¿Reiniciar las plazas y el sorteo de los eventos en este móvil?')) { guardar('fs_eventos', {}); guardar('fs_sorteo', {}); $('#resultado-sorteo').innerHTML = ''; pintar(); }
});
// Si llega de un anuncio de una ciudad (?ciudad=), esa tarjeta va primero y destacada.
const ciudad = new URLSearchParams(location.search).get('ciudad');
const destacada = ciudad && $(`[data-ciudad="${CSS.escape(ciudad)}"]`);
if (destacada) { destacada.style.order = '-1'; destacada.style.outline = '2px solid var(--iris)'; }
pintar();
window.addEventListener('pageshow', pintar);
