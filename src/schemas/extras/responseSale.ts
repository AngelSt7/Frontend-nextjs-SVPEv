export type ResponseSale = {
    id: number;
    fecha: Date;
    igv_porcentaje: number;
    subtotal: number;
    igv_total: number;
    descuento: number;
    total: number;
    cancelado: boolean;
    activo: number;
    id_usuario: number;
    nombreUsuario: string;
    id_cliente: number;
    nombreCliente: string;
    id_metodo_pago: number;
    nombreMetodoPago: string;
    id_cupon: null;
    codigoCupon: null;
    detallesVenta: null;
}