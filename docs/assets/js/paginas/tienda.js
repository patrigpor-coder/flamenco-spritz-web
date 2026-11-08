import { $, cargarJSON, track, itemGA, estadoNavidad, navidadComprable } from '../nucleo.js';

const { productos } = await cargarJSON('productos');
track('view_item_list', { item_list_id: 'catalogo', item_list_name: 'Tienda', items: productos.map((p, i) => ({ ...itemGA(p), index: i })) });
const estado = await estadoNavidad();
$('#estado-navidad-cat').textContent = (await navidadComprable()) ? '· Disponible' : estado === 'primeros' ? '· Primero para la newsletter' : '· Fuera de temporada: «Avísame»';
