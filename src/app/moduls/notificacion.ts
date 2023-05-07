export interface Notificacion {
    id: number;
    fecha: Date;
    farmaciaId: number;
    stockId: number;
    mensaje: string;
    visto: boolean;
}