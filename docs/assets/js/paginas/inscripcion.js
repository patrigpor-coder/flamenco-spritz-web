import { $, $$, params, cargarConfig, guardarContacto, track, url, esc, correoSimulado, codigoAleatorio, ICONOS, AVISO_DEMO_FORM, edadDesde } from '../nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario, bloqueDobleAceptacion } from '../formularios.js';
import { estadoCiudades, leerInscripciones, guardarInscripciones, OCUPA } from '../eventos-datos.js';

const config = await cargarConfig();
const form = $('#form-inscripcion');
const salida = $('#resultado-inscripcion');
activarValidacionEnVivo(form);

const ciudadParam = params.get('ciudad');
if (ciudadParam) { const r = $(`input[name="ciudad"][value="${CSS.escape(ciudadParam)}"]`); if (r) r.checked = true; }

async function pintarPlazas() {
  (await estadoCiudades()).forEach((c) => {
    const el = $('.plazas-' + c.id);
    if (el) el.textContent = c.libres > 0 ? `Quedan ${c.libres} de ${c.tope} plazas${config.modo_demostracion ? ' (demo)' : ''}` : 'Lista de espera abierta';
  });
}
pintarPlazas();

const enlaceConfirmar = (codigo) => url(`eventos/confirmacion/?c=${encodeURIComponent(codigo)}`);

function pantallaReservada(c, r, liberada = false) {
  const limite = new Date(new Date(r.fecha).getTime() + 48 * 3600e3);
  return `<div class="desbloqueado">
    <div class="aviso aviso--exito"><p><strong>${liberada ? 'Se ha liberado una plaza para ti.' : 'Plaza reservada:'} confírmala en 48 horas.</strong></p><p>${esc(c.ciudad)} · ${esc(c.fecha_texto)}. Tienes hasta el ${limite.toLocaleString('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}.</p><p class="pequeno">${AVISO_DEMO_FORM}</p></div>
    ${correoSimulado({ asunto: `Confirma tu plaza en ${c.ciudad}`, para: r.email, cuerpo: `<h3>Tu plaza te espera</h3><p>Has reservado una plaza para el prelanzamiento de Flamenco Spritz en ${esc(c.ciudad)}, el ${esc(c.fecha_texto)}.</p><p>Confírmala en las próximas 48 horas. Si no, pasará a la lista de espera.</p><a class="btn" href="${enlaceConfirmar(r.codigo)}">Confirmar ${ICONOS.flecha}</a><p class="pequeno" style="margin-top:12px">En la puerta te pediremos el DNI.</p>` })}
  </div>`;
}

const topeSorteo = (config.modo_demostracion ? config.topes_demo : config.topes).sorteo_villa_primeras;
function avisoSorteo(r) {
  if (r.sorteo === 'si') return `<div class="aviso aviso--exito"><p><strong>Estás en el sorteo de una noche en Villa Flamenco.</strong> Eres la inscripción nº ${r.orden} de esta ciudad. Si ganas, vas con un acompañante mayor de edad.${config.modo_demostracion ? ` <span class="marca-demo">Demo: sorteo entre las ${topeSorteo} primeras; en real, las 100 primeras</span>` : ''}</p></div>`;
  if (r.sorteo === 'menor21') return `<div class="aviso"><p>Estás entre las primeras inscripciones, pero para el sorteo de Villa Flamenco hay que tener ${config.edades.villa_flamenco} años o más. Tu plaza en el evento no cambia.</p></div>`;
  return '';
}

function pantallaEspera(c, r) {
  return `<div class="desbloqueado">
    <div class="aviso"><p><strong>Estás en la lista de espera.</strong> ${esc(c.ciudad)} · ${esc(c.fecha_texto)}. Si se libera una plaza, te la ofrecemos por correo.</p><p class="pequeno">${AVISO_DEMO_FORM}</p></div>
    ${config.modo_demostracion ? `<button class="btn btn--sec" type="button" id="liberar" data-email="${esc(r.email)}" data-ciudad="${c.id}">Simular que se libera una plaza (demo)</button>` : ''}
  </div>`;
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  if (!validar(form)) return;
  const d = datosFormulario(form);
  const cs = await estadoCiudades();
  const c = cs.find((x) => x.id === d.ciudad);
  const db = leerInscripciones();
  db[c.id] ||= [];
  const email = d.email.trim().toLowerCase();
  const previo = db[c.id].find((x) => x.email === email && x.estado !== 'cancelada');
  let html = '';
  if (previo) {
    html = `<div class="aviso"><p><strong>Ya estabas inscrita o inscrito en ${esc(c.ciudad)}</strong> con este correo. Nadie se registra dos veces.</p></div>`
      + avisoSorteo(previo)
      + (previo.estado === 'confirmada' ? `<a class="btn" href="${enlaceConfirmar(previo.codigo)}">Ver tu entrada</a>` : previo.estado === 'reservada' ? pantallaReservada(c, previo) : pantallaEspera(c, previo));
  } else {
    // Orden de inscripción en la ciudad: las primeras (topes.sorteo_villa_primeras) con 21 años o más entran en el sorteo.
    const orden = db[c.id].length + 1;
    const edad = edadDesde(d.nacimiento);
    const sorteo = orden > topeSorteo ? 'no' : edad >= config.edades.villa_flamenco ? 'si' : 'menor21';
    const r = { email, codigo: `FS-${c.id.slice(0, 3).toUpperCase()}-${codigoAleatorio(6)}`, fecha: new Date().toISOString(), estado: c.libres > 0 ? 'reservada' : 'espera', orden, sorteo };
    db[c.id].push(r);
    guardarInscripciones(db);
    const comunicaciones = d.comunicaciones === 'si';
    guardarContacto({ email, nacimiento: d.nacimiento, cp: d.cp, conocias: d.conocias, accion: `evento:${c.id}`, comunicaciones });
    if (sorteo === 'si') track('raffle_entry', { ciudad: c.id, orden });
    if (r.estado === 'reservada') { track('event_signup', { ciudad: c.id }); html = avisoSorteo(r) + pantallaReservada(c, r); }
    else { track('event_waitlist', { ciudad: c.id }); html = avisoSorteo(r) + pantallaEspera(c, r); }
    if (comunicaciones) html += bloqueDobleAceptacion(email, `evento_${c.id}`);
  }
  form.hidden = true;
  salida.innerHTML = html + `<p style="margin-top:24px"><a href="${url('eventos/')}">Volver a los eventos</a></p>`;
  salida.focus();
});

salida.addEventListener('click', (ev) => {
  const b = ev.target.closest('#liberar');
  if (!b) return;
  const db = leerInscripciones();
  const lista = db[b.dataset.ciudad];
  const otra = lista.find((x) => OCUPA.includes(x.estado) && x.email !== b.dataset.email);
  if (otra) otra.estado = 'cancelada';
  const yo = lista.find((x) => x.email === b.dataset.email && x.estado === 'espera');
  yo.estado = 'reservada';
  yo.fecha = new Date().toISOString();
  guardarInscripciones(db);
  track('event_signup', { ciudad: b.dataset.ciudad, desde: 'lista_espera' });
  estadoCiudades().then((cs) => {
    salida.innerHTML = pantallaReservada(cs.find((x) => x.id === b.dataset.ciudad), yo, true);
    salida.focus();
  });
});
