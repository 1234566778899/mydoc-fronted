import { DetalleVenta } from './detalleVenta';
import { Farmacia } from './farmacias';
import { Cliente } from "./cliente";

export interface Orden {
    id: number,
    farmacia: Farmacia,
    cliente: Cliente,
    fecha: Date,
    total: number,
    numeroBoleta: number,
    formaPago: string,
    detalleVentas: DetalleVenta[]
}
