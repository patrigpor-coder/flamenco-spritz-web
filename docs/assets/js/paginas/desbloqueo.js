// /q/desbloquea/?f=int|bri|gso&s=barra|botella|vaso
import { $, params, cargarJSON, esc } from '../nucleo.js';
import { iniciarDesbloqueo } from '../desbloqueo.js';

const { festivales } = await cargarJSON('festivales');
const codigo = params.get('f');
const f = festivales.find((x) => x.codigo === codigo) || festivales[0];
const soportes = { barra: 'el QR de la barra', botella: 'el QR de la botella gigante', vaso: 'el QR del vaso' };
const s = soportes[params.get('s')];
$('#contexto-qr').innerHTML = `${esc(f.nombre)} · ${esc(f.ciudad)} · ${esc(f.mes_texto)}${s ? ` · Has escaneado ${s}` : ''}${codigo && codigo !== f.codigo ? ' (festival no reconocido)' : ''}`;
await iniciarDesbloqueo({ tipo: 'festival', clave: `festival:${f.codigo}`, titulo: `${f.nombre} · ${f.ciudad}`, sufijoCodigo: f.codigo.toUpperCase() });
