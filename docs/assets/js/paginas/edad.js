// /edad/: verificación de edad como página, y página neutra para quien no la pasa.
import { $, params, url, track } from '../nucleo.js';
import { verificarFecha } from '../main.js';

const estado = sessionStorage.getItem('fs_edad');
if (params.get('estado') === 'no' || estado === 'no') {
  $('#edad-formulario').hidden = true;
  $('#edad-neutra').hidden = false;
} else if (estado === 'ok') {
  location.replace(url(''));
} else {
  const campos = ['d', 'm', 'a'].map((k) => $('#ep-' + k));
  campos.forEach((c, i) => c.addEventListener('input', () => { if (c.value.length === c.maxLength && campos[i + 1]) campos[i + 1].focus(); }));
  $('#form-edad-pagina').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const r = verificarFecha(...campos.map((c) => c.value));
    if (r.error) { $('#ep-error').textContent = r.error; campos.forEach((c) => c.setAttribute('aria-invalid', 'true')); campos[0].focus(); return; }
    if (r.edad < 18) {
      sessionStorage.setItem('fs_edad', 'no');
      $('#edad-formulario').hidden = true;
      $('#edad-neutra').hidden = false;
      return;
    }
    sessionStorage.setItem('fs_edad', 'ok');
    track('age_gate_pass', { pagina: '/edad/' });
    const volver = params.get('volver');
    location.replace(volver && volver.startsWith('/') && !volver.startsWith('//') ? volver : url(''));
  });
}
