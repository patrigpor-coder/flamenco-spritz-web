import { cargarJSON, track, itemGA } from '../nucleo.js';

const { productos } = await cargarJSON('productos');
const p = productos.find((x) => x.sku === 'FS-ORIG-25');
track('view_item', { currency: 'EUR', value: p.precio, items: [itemGA(p)] });
