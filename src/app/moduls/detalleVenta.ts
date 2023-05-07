import { Producto } from 'src/app/moduls/producto';
import { Orden } from './orden';
export interface DetalleVenta {
    id: number,
    producto: Producto,
    orden: Orden,
    precioUnitario: number,
    descuento: number,
    subTotal: number,
    cantidad: number
    stockId: number
}