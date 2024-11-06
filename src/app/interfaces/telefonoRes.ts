import {Producto} from './telefono'

export interface RespuestaProducto {
    products: Producto[];
    total: number
    skip: number

}