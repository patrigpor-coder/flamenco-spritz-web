// Módulo «Desbloqueo»: un solo componente para festivales (/q/desbloquea/) y tardeos (/q/temporada/?t=).
// Paso 1: las primeras reciben un código numerado. Paso 2: el pulsador (parar en 5,00 s).
import { $, leer, guardar, cargarConfig, guardarContacto, track, url, esc, edadDesde, correoSimulado, codigoAleatorio, ICONOS, AVISO_DEMO_FORM, MODERACION, hoyISO } from './nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario, bloqueDobleAceptacion } from './formularios.js';

const DB = 'fs_desbloqueos';
const PULS = 'fs_pulsador';

export async function iniciarDesbloqueo({ tipo, clave, titulo, sufijoCodigo }) {
  const config = await cargarConfig();
  const demo = config.modo_demostracion;
  const t = demo ? config.topes_demo : config.topes;
  const tReal = config.topes;
  const tope = tipo === 'festival' ? t.festival_primeras : t.tardeo_primeras;
  const topeReal = tipo === 'festival' ? tReal.festival_primeras : tReal.tardeo_primeras;
  const topeNoches = t.noches_villa_por_festival;
  const P = config.pulsador;
  const raiz = $('#desbloqueo');
  const form = $('#form-desbloqueo', raiz);
  activarValidacionEnVivo(form);
  const sello = () => $('#tpl-sello-desb')?.innerHTML || '';

  const leerAccion = () => { const d = leer(DB, {}); d[clave] ||= { registros: [], noches: 0 }; return d; };
  const participante = () => leer('fs_participante:' + clave, null, sessionStorage);
  const registroDe = (email) => leerAccion()[clave].registros.find((r) => r.email === email);

  function pintarCupo() {
    const a = leerAccion()[clave];
    const dados = a.registros.filter((r) => r.numero).length;
    const nota = demo ? ` <span class="marca-demo">Demo: tope ${tope}, en real ${topeReal}</span>` : '';
    $('#estado-cupo').innerHTML = dados < tope
      ? `Quedan <strong>${tope - dados}</strong> de ${tope} desbloqueos.${nota}`
      : `<strong>Las ${tope} primeras ya están.</strong> Este paso se ha cerrado, pero puedes jugar al pulsador.${nota}`;
  }

  function tarjeta(r) {
    if (!r.numero) {
      return `<div class="aviso desbloqueado"><p><strong>Las ${tope} primeras ya están.</strong> Te has registrado igualmente: ya puedes probar el pulsador.</p></div>`;
    }
    return `<div class="llave desbloqueado">
      ${sello()}
      <p class="antetitulo">${esc(titulo)}</p>
      <p class="numero">nº ${r.numero}</p>
      <p style="font-family:var(--serif);font-size:1.6rem;margin:0">Desbloqueo nº ${r.numero} de ${tope}</p>
      ${demo ? `<p class="pequeno suave">Demostración: en ${tipo === 'festival' ? 'el festival' : 'el tardeo'} real, «de ${topeReal}».</p>` : ''}
      <p class="codigo" style="margin-top:12px">${esc(r.codigo)}</p>
      <div class="aviso" style="text-align:left"><p><strong>Enséñalo en la barra con tu DNI</strong> y te damos el kit: copa de balón serigrafiada, posavasos y caja kraft.</p></div>
    </div>`;
  }

  function bienvenida(r) {
    return correoSimulado({
      asunto: r.numero ? `Tu desbloqueo nº ${r.numero}` : 'Bienvenida a Flamenco Spritz',
      para: r.email,
      cuerpo: `<h3>${r.numero ? `Desbloqueo nº ${r.numero} de ${tope}` : 'Ya estás dentro'}</h3>
        <p>${r.numero ? 'Enséñalo en la barra con tu DNI para recoger tu kit.' : 'Las primeras ya están, pero puedes jugar al pulsador.'}</p>
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
    $('#resultado1').innerHTML = (nuevo ? '' : '<div class="aviso"><p>Ya estabas registrada o registrado con este correo: aquí tienes tu desbloqueo. Nadie se registra dos veces.</p></div>')
      + tarjeta(r)
      + `<p class="pequeno" style="margin-top:16px">${AVISO_DEMO_FORM}</p>`
      + bienvenida(r)
      + (nuevo && d.comunicaciones === 'si' ? bloqueDobleAceptacion(email, clave) : '')
      + `<div class="acciones"><a class="btn" href="#pulsador">Ir al pulsador ${ICONOS.flecha}</a>${demo ? '<button type="button" class="btn btn--sec" id="otra-persona">Registrar a otra persona (demo)</button>' : ''}</div>`;
    pintarCupo();
    pintarPulsador();
    $('#resultado1').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });

  raiz.addEventListener('click', (ev) => {
    if (ev.target.closest('#otra-persona')) {
      sessionStorage.removeItem('fs_participante:' + clave);
      form.reset();
      $('#paso1').hidden = false;
      $('#resultado1').innerHTML = '';
      pintarPulsador();
      $('#desb-email').focus();
    }
  });

  // ---------- Pulsador ----------
  const intentoClave = (email) => `${email}|${clave}|${hoyISO()}`;
  let forzar = false;

  function resultadoHTML(i) {
    const tiempo = i.tiempo.toFixed(2).replace('.', ',');
    if (!i.gano) return `<div class="aviso desbloqueado"><p class="cronometro" style="font-size:3.5rem;margin:0">${tiempo} s</p><p><strong>Casi.</strong> Vuelve mañana: un intento por persona y día.</p></div>`;
    const premio = i.premio === 'noche'
      ? `<p><strong>Ganas una noche en Villa Flamenco</strong>, la cabaña de la bodega, para ti y un acompañante mayor de edad. Y la camiseta.</p>`
      : `<p><strong>Ganas la camiseta.</strong></p>${i.motivo ? `<p class="pequeno">${i.motivo}</p>` : ''}`;
    return `<div class="aviso aviso--exito desbloqueado"><p class="cronometro" style="font-size:3.5rem;margin:0;color:var(--morado)">${tiempo} s</p>${premio}<p class="pequeno">Te lo entregamos en la barra con tu DNI. Ver <a href="${url('legal/bases-pulsador-villa-flamenco/')}">bases</a>.</p></div>`;
  }

  function pintarPulsador() {
    const zona = $('#pulsador-zona');
    const email = participante();
    if (!email || !registroDe(email)) { zona.innerHTML = '<p class="aviso">Primero, regístrate en el paso 1.</p>'; return; }
    const intentos = leer(PULS, {});
    const previo = intentos[intentoClave(email)];
    const demoBtns = demo ? `<div class="acciones" style="justify-content:center">${P.permitir_forzar_acierto_en_demo ? '<button type="button" class="btn btn--sec" id="forzar">Forzar acierto (demo)</button>' : ''}<button type="button" class="btn btn--sec" id="otro-intento">Nuevo intento hoy (demo)</button></div>` : '';
    if (previo) { zona.innerHTML = resultadoHTML(previo) + demoBtns; return; }
    zona.innerHTML = `<p class="pequeno centro">Jugando con: <strong>${esc(email)}</strong></p>
      <p class="cronometro" id="crono" aria-live="off">0,00</p>
      <button type="button" class="boton-pulsador" id="pulsar" aria-describedby="pulsar-ayuda">Empezar</button>
      <p class="pequeno centro" id="pulsar-ayuda" style="margin-top:20px">Pulsa para empezar y vuelve a pulsar para parar en 5,00 segundos. Precisión: ${String(P.precision_segundos).replace('.', ',')} s.</p>
      <p id="crono-estado" class="sr" aria-live="assertive"></p>${demoBtns}`;
    let inicio = 0, raf = 0;
    const crono = $('#crono'), btn = $('#pulsar');
    const tick = () => { crono.textContent = ((performance.now() - inicio) / 1000).toFixed(2).replace('.', ','); raf = requestAnimationFrame(tick); };
    btn.addEventListener('click', () => {
      if (!inicio) {
        inicio = performance.now();
        btn.textContent = 'Parar';
        $('#crono-estado').textContent = 'Cronómetro en marcha';
        raf = requestAnimationFrame(tick);
        return;
      }
      cancelAnimationFrame(raf);
      let tiempo = (performance.now() - inicio) / 1000;
      if (forzar) tiempo = P.objetivo_segundos;
      const redondeado = Math.round(tiempo / P.precision_segundos) * P.precision_segundos;
      const gano = Math.abs(redondeado - P.objetivo_segundos) < P.precision_segundos / 2;
      const i = { tiempo: Number(redondeado.toFixed(2)), fecha: new Date().toISOString(), gano };
      track('button_game_try', { accion: clave, tiempo: i.tiempo });
      if (gano) {
        const r = registroDe(email);
        const edad = edadDesde(r.nacimiento);
        const db = leerAccion();
        if (tipo === 'festival' && edad >= config.edades.villa_flamenco && db[clave].noches < topeNoches) {
          db[clave].noches += 1; guardar(DB, db); i.premio = 'noche';
        } else {
          i.premio = 'camiseta';
          if (tipo === 'festival' && edad < config.edades.villa_flamenco) i.motivo = `La noche en Villa Flamenco es para personas de ${config.edades.villa_flamenco} años o más. Con ${edad} años, tu premio es la camiseta.`;
          else if (tipo === 'festival') i.motivo = 'Las noches en Villa Flamenco de este festival ya están dadas.';
        }
        track('button_game_win', { accion: clave, premio: i.premio });
      }
      const intentos2 = leer(PULS, {});
      intentos2[intentoClave(email)] = i;
      guardar(PULS, intentos2);
      forzar = false;
      pintarPulsador();
      $('#pulsador-zona .aviso')?.setAttribute('tabindex', '-1');
      $('#pulsador-zona .aviso')?.focus();
    });
  }

  $('#pulsador').addEventListener('click', (ev) => {
    if (ev.target.closest('#forzar')) {
      const email = participante();
      const intentos = leer(PULS, {}); delete intentos[intentoClave(email)]; guardar(PULS, intentos);
      forzar = true; pintarPulsador();
      $('#pulsar-ayuda').insertAdjacentHTML('beforeend', ' <strong>Demo: el próximo intento marcará 5,00.</strong>');
    }
    if (ev.target.closest('#otro-intento')) {
      const email = participante();
      const intentos = leer(PULS, {}); delete intentos[intentoClave(email)]; guardar(PULS, intentos);
      pintarPulsador();
    }
  });

  document.querySelectorAll('#reiniciar-desbloqueo').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('¿Reiniciar esta acción (registros, desbloqueos y pulsador) en este móvil?')) return;
    const db = leer(DB, {}); delete db[clave]; guardar(DB, db);
    const intentos = leer(PULS, {}); Object.keys(intentos).filter((k) => k.includes('|' + clave + '|')).forEach((k) => delete intentos[k]); guardar(PULS, intentos);
    sessionStorage.removeItem('fs_participante:' + clave);
    location.reload();
  }));

  // Estado inicial: si ya está registrada en esta sesión
  pintarCupo();
  const email = participante();
  const r = email && registroDe(email);
  if (r) {
    $('#paso1').hidden = true;
    $('#resultado1').innerHTML = tarjeta(r) + `<div class="acciones">${demo ? '<button type="button" class="btn btn--sec" id="otra-persona">Registrar a otra persona (demo)</button>' : ''}</div>`;
  }
  pintarPulsador();
  return { moderacion: MODERACION };
}
