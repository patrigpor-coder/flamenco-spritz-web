// Validación en el navegador y formularios de captación (newsletter e imanes).
// Ningún formulario envía datos: todo queda en el localStorage de este móvil.
import { $, $$, esc, edadDesde, guardarContacto, confirmarComunicaciones, correoSimulado, track, AVISO_DEMO_FORM, url } from './nucleo.js';

const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function errorDe(campo) {
  const v = (campo.value || '').trim();
  if (campo.type === 'checkbox') return campo.required && !campo.checked ? (campo.dataset.error || 'Marca esta casilla para continuar.') : '';
  if (campo.required && !v) return campo.dataset.error || 'Este campo es obligatorio.';
  if (!v) return '';
  if (campo.type === 'email' && !RE_CORREO.test(v)) return 'Escribe un correo válido, por ejemplo nombre@dominio.es.';
  if (campo.dataset.tipo === 'cp' && !/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(v)) return 'Escribe un código postal español de 5 cifras.';
  if (campo.dataset.tipo === 'nacimiento') {
    const e = edadDesde(v);
    if (Number.isNaN(e) || e > 120 || e < 0) return 'Revisa la fecha de nacimiento.';
    const min = Number(campo.dataset.min || 18);
    if (e < min) return `Lo sentimos: tienes que tener ${min} años o más.`;
  }
  if (campo.pattern && !new RegExp(`^(?:${campo.pattern})$`).test(v)) return campo.dataset.error || 'Revisa el formato.';
  return '';
}

function pintarError(campo, texto) {
  const id = campo.id + '-error';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('p');
    el.id = id;
    el.className = 'error-campo';
    const contenedor = campo.closest('.campo, .casilla, .radio') || campo.parentElement;
    (contenedor.classList.contains('casilla') ? contenedor.parentElement : contenedor).insertBefore(el, contenedor.classList.contains('casilla') ? contenedor.nextSibling : null);
  }
  el.textContent = texto;
  if (texto) {
    campo.setAttribute('aria-invalid', 'true');
    const desc = new Set((campo.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    desc.add(id);
    campo.setAttribute('aria-describedby', [...desc].join(' '));
  } else campo.removeAttribute('aria-invalid');
}

/** Valida un formulario (o un fragmento). Devuelve true si todo está bien y enfoca el primer error. */
export function validar(form) {
  let primero = null;
  $$('input, select, textarea', form).forEach((c) => {
    if (c.disabled || c.type === 'hidden' || c.closest('[hidden]')) return;
    const e = errorDe(c);
    pintarError(c, e);
    if (e && !primero) primero = c;
  });
  if (primero) primero.focus();
  return !primero;
}

export function activarValidacionEnVivo(form) {
  form.setAttribute('novalidate', '');
  form.addEventListener('change', (ev) => { if (ev.target.matches('input, select, textarea') && ev.target.hasAttribute('aria-invalid')) pintarError(ev.target, errorDe(ev.target)); });
}

export const datosFormulario = (form) => Object.fromEntries(new FormData(form).entries());

/** Bloque de doble aceptación simulado para comunicaciones comerciales. */
export function bloqueDobleAceptacion(email, origen) {
  const id = 'confirmar-' + Math.random().toString(36).slice(2, 8);
  setTimeout(() => {
    document.getElementById(id)?.addEventListener('click', (ev) => {
      confirmarComunicaciones(email);
      track('newsletter_signup', { origen });
      ev.target.closest('.correo').querySelector('.correo__cuerpo').insertAdjacentHTML('beforeend',
        `<div class="aviso aviso--exito" role="status"><p>Suscripción confirmada el ${new Date().toLocaleString('es-ES')}. Guardamos la fecha, el texto aceptado y el QR de origen (solo en este móvil).</p></div>`);
      ev.target.remove();
    });
  });
  return correoSimulado({
    asunto: 'Confirma tu suscripción',
    para: email,
    cuerpo: `<h3>Falta un paso</h3><p>Pulsa el botón para confirmar que quieres recibir comunicaciones de Flamenco Spritz. Si no lo confirmas, no te escribiremos.</p><button type="button" class="btn" id="${id}">Confirmar suscripción</button>`,
  });
}

/** Formularios genéricos: <form data-captacion="newsletter|iman" data-iman="..." data-origen="..."> */
export function iniciarCaptacion(raiz = document) {
  $$('form[data-captacion]:not([data-iniciado])', raiz).forEach((form) => {
    form.dataset.iniciado = '1';
    activarValidacionEnVivo(form);
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (!validar(form)) return;
      const d = datosFormulario(form);
      const tipo = form.dataset.captacion;
      const origen = form.dataset.origen || location.pathname;
      const comunicaciones = tipo === 'newsletter' || d.comunicaciones === 'si';
      guardarContacto({ email: d.email, nacimiento: d.nacimiento, cp: d.cp, accion: tipo === 'iman' ? 'iman:' + form.dataset.iman : 'newsletter', comunicaciones });
      if (tipo === 'iman') track('guide_download', { iman: form.dataset.iman, origen });
      const salida = document.createElement('div');
      salida.className = 'desbloqueado';
      salida.setAttribute('role', 'status');
      salida.setAttribute('tabindex', '-1');
      const contenido = form.dataset.contenido ? document.getElementById(form.dataset.contenido) : null;
      salida.innerHTML = `<div class="aviso aviso--exito"><p><strong>${tipo === 'iman' ? 'Listo.' : 'Casi está.'}</strong> ${esc(form.dataset.exito || '')}</p><p class="pequeno">${AVISO_DEMO_FORM}</p></div>`
        + (comunicaciones ? bloqueDobleAceptacion(d.email, origen) : '');
      form.replaceWith(salida);
      if (contenido) { contenido.hidden = false; contenido.classList.add('desbloqueado'); }
      salida.focus();
    });
  });
}

/** Mismo formulario de captación que la plantilla estática, para crearlo desde JS. */
export function htmlCaptacion({ id, tipo = 'iman', iman = '', origen = '', boton = 'Enviar', exito = '', contenido = '' }) {
  const obligatoria = tipo === 'newsletter'
    ? `Quiero recibir la newsletter de Flamenco Spritz (comunicaciones comerciales) y acepto la <a href="${url('legal/privacidad/')}">política de privacidad</a>. Te pediremos que lo confirmes. <span class="suave">(Obligatoria para suscribirte)</span>`
    : `Quiero recibir este contenido en mi correo y acepto la <a href="${url('legal/privacidad/')}">política de privacidad</a>. <span class="suave">(Obligatoria)</span>`;
  return `<form class="form" data-captacion="${tipo}"${iman ? ` data-iman="${iman}"` : ''} data-origen="${origen}" data-exito="${esc(exito)}"${contenido ? ` data-contenido="${contenido}"` : ''} novalidate>
  <div class="fila-campos fila-campos--2">
    <div class="campo"><label for="${id}-email">Correo electrónico</label><input id="${id}-email" name="email" type="email" autocomplete="email" inputmode="email" required></div>
    <div class="campo"><label for="${id}-nac">Fecha de nacimiento</label><input id="${id}-nac" name="nacimiento" type="date" required data-tipo="nacimiento" data-min="18" autocomplete="bday"><span class="ayuda">Solo mayores de 18 años.</span></div>
  </div>
  <div class="opciones">
    <label class="casilla"><input type="checkbox" id="${id}-ok" name="acepto" value="si" required><span>${obligatoria}</span></label>
    ${tipo === 'newsletter' ? '' : `<label class="casilla"><input type="checkbox" id="${id}-com" name="comunicaciones" value="si"><span>Además, quiero recibir comunicaciones comerciales de Flamenco Spritz. Te pediremos que lo confirmes. <span class="suave">(Opcional)</span></span></label>`}
  </div>
  <div><button class="btn" type="submit">${boton}</button></div>
  <p class="nota-demo-form">Demostración: no se envía ningún dato. Se guarda solo en este móvil y puedes borrarlo desde el pie.</p>
</form>`;
}

/** HTML de los campos comunes (para formularios creados por JS). */
export function camposComunes(pref, { bases, textoBases, conocias = true, cp = true, minEdad = 18 } = {}) {
  return `
  <div class="campo"><label for="${pref}-email">Correo electrónico</label><input id="${pref}-email" name="email" type="email" autocomplete="email" required inputmode="email"></div>
  <div class="fila-campos fila-campos--2">
    <div class="campo"><label for="${pref}-nac">Fecha de nacimiento</label><input id="${pref}-nac" name="nacimiento" type="date" required data-tipo="nacimiento" data-min="${minEdad}" autocomplete="bday" max="${new Date().toISOString().slice(0, 10)}"><span class="ayuda">Solo mayores de ${minEdad} años.</span></div>
    ${cp ? `<div class="campo"><label for="${pref}-cp">Código postal</label><input id="${pref}-cp" name="cp" inputmode="numeric" autocomplete="postal-code" required data-tipo="cp" maxlength="5"></div>` : ''}
  </div>
  ${conocias ? `<div class="campo"><label for="${pref}-conocias">¿Conocías Flamenco Spritz?</label><select id="${pref}-conocias" name="conocias" required><option value="">Elige una opción</option><option value="probado">Sí, ya lo he probado</option><option value="oido">Sí, había oído hablar de él</option><option value="no">No, es la primera vez</option></select></div>` : ''}
  <div class="opciones">
    <label class="casilla"><input type="checkbox" id="${pref}-bases" name="bases" value="si" required data-error="Para participar, acepta las bases."><span>${textoBases || 'Quiero participar y acepto'} <a href="${url(bases)}">las bases</a> y la <a href="${url('legal/privacidad/')}">política de privacidad</a>. <span class="suave">(Obligatoria)</span></span></label>
    <label class="casilla"><input type="checkbox" id="${pref}-com" name="comunicaciones" value="si"><span>Quiero recibir comunicaciones comerciales de Flamenco Spritz por correo. Te pediremos que lo confirmes. <span class="suave">(Opcional)</span></span></label>
  </div>`;
}
