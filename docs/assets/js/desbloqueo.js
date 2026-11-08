// Módulo de registro con kit: un solo componente para festivales (/q/desbloquea/) y tardeos (/q/temporada/?t=).
// Las primeras personas registradas reciben un código numerado y, con el DNI, el kit.
import { $, leer, guardar, cargarConfig, guardarContacto, track, url, esc, correoSimulado, codigoAleatorio, ICONOS, AVISO_DEMO_FORM } from './nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario, bloqueDobleAceptacion } from './formularios.js';

const DB = 'fs_desbloqueos';

export async function iniciarDesbloqueo({ tipo, clave, titulo, sufijoCodigo }) {
  const config = await cargarConfig();
  const demo = config.modo_demostracion;
  const t = demo ? config.topes_demo : config.topes;
  const tope = tipo === 'festival' ? t.festival_primeras : t.tardeo_primeras;
  const topeReal = tipo === 'festival' ? config.topes.festival_primeras : config.topes.tardeo_primeras;
  const raiz = $('#desbloqueo');
  const form = $('#form-desbloqueo', raiz);
  activarValidacionEnVivo(form);
  const sello = () => $('#tpl-sello-desb')?.innerHTML || '';

  const leerAccion = () => { const d = leer(DB, {}); d[clave] ||= { registros: [] }; return d; };
  const participante = () => leer('fs_participante:' + clave, null, sessionStorage);
  const registroDe = (email) => leerAccion()[clave].registros.find((r) => r.email === email);

  function pintarCupo() {
    const dados = leerAccion()[clave].registros.filter((r) => r.numero).length;
    const nota = demo ? ` <span class="marca-demo">Demo: tope ${tope}, en real ${topeReal}</span>` : '';
    $('#estado-cupo').innerHTML = dados < tope
      ? `Quedan <strong>${tope - dados}</strong> de ${tope} kits.${nota}`
      : `<strong>Las ${tope} primeras ya están.</strong> Ya no quedan kits en ${tipo === 'festival' ? 'este festival' : 'este tardeo'}.${nota}`;
  }

  function tarjeta(r) {
    if (!r.numero) {
      return `<div class="aviso desbloqueado"><p><strong>Las ${tope} primeras ya están.</strong> Te has registrado igualmente, pero ya no quedan kits.</p></div>`;
    }
    return `<div class="tarjeta-codigo desbloqueado">
      ${sello()}
      <p class="antetitulo">${esc(titulo)}</p>
      <p class="numero">nº ${r.numero}</p>
      <p style="font-family:var(--serif);font-size:1.6rem;margin:0">Kit nº ${r.numero} de ${tope}</p>
      ${demo ? `<p class="pequeno suave">Demostración: en ${tipo === 'festival' ? 'el festival' : 'el tardeo'} real, «de ${topeReal}».</p>` : ''}
      <p class="codigo" style="margin-top:12px">${esc(r.codigo)}</p>
      <div class="aviso" style="text-align:left"><p><strong>Enséñalo en la barra con tu DNI</strong> y te damos el kit: copa de balón serigrafiada, posavasos y caja kraft.</p></div>
    </div>`;
  }

  function bienvenida(r) {
    return correoSimulado({
      asunto: r.numero ? `Tu kit nº ${r.numero}` : 'Bienvenida a Flamenco Spritz',
      para: r.email,
      cuerpo: `<h3>${r.numero ? `Kit nº ${r.numero} de ${tope}` : 'Ya estás registrada o registrado'}</h3>
        <p>${r.numero ? 'Enséñalo en la barra con tu DNI para recoger tu kit.' : 'Las primeras ya están y no quedan kits, pero te contaremos lo próximo.'}</p>
        <h4>El ritual del kit</h4>
        <p>Llena de hielo la copa de balón, sirve la botella fría por el borde y remueve una vez. El posavasos y la caja tienen un QR con un segundo ritual.</p>
        <p><a href="${url('donde-encontrarlo/')}">Dónde tomarlo</a> · <a href="${url('tienda/')}">Tienda</a></p>`,
    });
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!validar(form)) return;
    const d = datosFormulario(form);
    const email = d.email.trim().toLowerCase();
    const db = leerAccion();
    const a = db[clave];
    let r = a.registros.find((x) => x.email === email);
    const nuevo = !r;
    if (nuevo) {
      const dados = a.registros.filter((x) => x.numero).length;
      const numero = dados < tope ? dados + 1 : null;
      r = { email, nacimiento: d.nacimiento, fecha: new Date().toISOString(), numero, codigo: numero ? `${sufijoCodigo}-${String(numero).padStart(3, '0')}-${codigoAleatorio(4)}` : null };
      a.registros.push(r);
      guardar(DB, db);
      guardarContacto({ email, nacimiento: d.nacimiento, cp: d.cp, conocias: d.conocias, accion: clave, comunicaciones: d.comunicaciones === 'si' });
      if (numero) track('unlock_code_issued', { accion: clave, numero, tipo });
      else track('unlock_sold_out', { accion: clave, tipo });
    }
    guardar('fs_participante:' + clave, email, sessionStorage);
    $('#paso1').hidden = true;
    $('#resultado1').innerHTML = (nuevo ? '' : '<div class="aviso"><p>Ya te habías registrado con este correo: aquí tienes tu código. Cada persona se registra una sola vez.</p></div>')
      + tarjeta(r)
      + `<p class="pequeno" style="margin-top:16px">${AVISO_DEMO_FORM}</p>`
      + bienvenida(r)
      + (nuevo && d.comunicaciones === 'si' ? bloqueDobleAceptacion(email, clave) : '')
      + `<div class="acciones"><a class="btn" href="${url('donde-encontrarlo/')}">Dónde tomarlo ${ICONOS.flecha}</a>${demo ? '<button type="button" class="btn btn--sec" id="otra-persona">Registrar a otra persona (demo)</button>' : ''}</div>`;
    pintarCupo();
    $('#resultado1').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  raiz.addEventListener('click', (ev) => {
    if (ev.target.closest('#otra-persona')) {
      sessionStorage.removeItem('fs_participante:' + clave);
      form.reset();
      $('#paso1').hidden = false;
      $('#resultado1').innerHTML = '';
      $('#desb-email').focus();
    }
  });

  document.querySelectorAll('#reiniciar-desbloqueo').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('¿Reiniciar los registros y kits de esta acción en este móvil?')) return;
    const db = leer(DB, {}); delete db[clave]; guardar(DB, db);
    sessionStorage.removeItem('fs_participante:' + clave);
    location.reload();
  }));

  // Estado inicial: si ya se registró en esta sesión
  pintarCupo();
  const email = participante();
  const r = email && registroDe(email);
  if (r) {
    $('#paso1').hidden = true;
    $('#resultado1').innerHTML = tarjeta(r) + `<div class="acciones">${demo ? '<button type="button" class="btn btn--sec" id="otra-persona">Registrar a otra persona (demo)</button>' : ''}</div>`;
  }
}
