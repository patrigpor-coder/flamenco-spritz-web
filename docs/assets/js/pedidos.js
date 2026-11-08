// Pedidos simulados (solo en este móvil).
import { leer, guardar, params } from './nucleo.js';

export const ESTADOS = [
  { id: 'recibido', nombre: 'Pedido recibido' },
  { id: 'preparado', nombre: 'Preparado en bodega' },
  { id: 'enviado', nombre: 'Enviado' },
  { id: 'reparto', nombre: 'En reparto' },
  { id: 'entregado', nombre: 'Entregado' },
];

export const leerPedidos = () => leer('fs_pedidos', []);
export function guardarPedido(p) {
  const lista = leerPedidos().filter((x) => x.numero !== p.numero);
  lista.push(p);
  guardar('fs_pedidos', lista);
  guardar('fs_ultimo_pedido', p.numero);
}
export function nuevoNumero() {
  const n = leer('fs_contador_pedido', 122) + 1;
  guardar('fs_contador_pedido', n);
  return `FS-DEMO-${String(n).padStart(6, '0')}`;
}
export function pedidoActual() {
  const n = params.get('n') || leer('fs_ultimo_pedido');
  return leerPedidos().find((p) => p.numero === n) || null;
}
