import { Producto } from 'src/app/moduls/producto';
import { Farmacia } from './farmacias';
export interface Stock {
    id: number,
    farmacia: Farmacia,
    producto: Producto,
    cantidadDisponible: number,
    precioVenta: number,
    precioCompra: number,
    fechaVencimiento: Date
    fechaCompra: Date,
    inversion: number
}