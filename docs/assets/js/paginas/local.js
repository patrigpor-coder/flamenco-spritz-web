import { $, leer, guardar, track, AVISO_DEMO_FORM, esc } from '../nucleo.js';
import { validar, activarValidacionEnVivo, datosFormulario } from '../formularios.js';

const form = $('#form-local');
activarValidacionEnVivo(form);
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (!validar(form)) return;
  const d = datosFormulario(form);
  const leads = leer('fs_leads_local', []);
  leads.push({ ...d, fecha: new Date().toISOString() });
  guardar('fs_leads_local', leads);
  track('horeca_lead', { tipo: d.tipo, provincia: d.provincia });
  const ok = document.createElement('div');
  ok.className = 'aviso aviso--exito desbloqueado';
  ok.setAttribute('role', 'status');
  ok.setAttribute('tabindex', '-1');
  ok.innerHTML = `<p><strong>Gracias, ${esc(d.local)}.</strong> Te escribiríamos a ${esc(d.email)} para contarte cómo empezar.</p><p class="pequeno">${AVISO_DEMO_FORM}</p>`;
  form.replaceWith(ok);
  ok.focus();
});
