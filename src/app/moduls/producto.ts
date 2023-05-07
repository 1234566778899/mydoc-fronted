import { Proveedor } from './proveedor';
export interface Producto {
    id: number,
    proveedor: Proveedor,
    nombre: string,
    registroSanitario: string,
    presentacion: string,
    tipo: string,
    esRecetado: boolean,
    descripcion: string
}