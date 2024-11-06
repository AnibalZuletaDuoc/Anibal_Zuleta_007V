import { Injectable } from '@angular/core';
import { Producto } from './../../interfaces/telefono';
import { RespuestaProducto } from './../../interfaces/telefonoRes';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products';
  private cantidad = 30 ;
  private total = 0;
  private $productos = new BehaviorSubject<Producto[]>([]);
  public producto = this.$productos.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  public listarProductos() {
    const url_nueva = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=0`;
    this.http.get<RespuestaProducto>(url_nueva, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }
  
    //cargar productos
    public CargarProductos(skip: number, limit: number) {
      const url_nueva = `${this.URL_PRODUCTOS}?limit=${limit}&skip=${skip}`;
      this.http.get<RespuestaProducto>(url_nueva, {
        headers: {
          'Authorization': 'Bearer ' + this.auth.accessToken,
          'Content-Type': 'application/json'
        }
      }).subscribe(datos => {
        const productosActuales = this.$productos.getValue(); 
        const nuevosProductos = productosActuales.concat(datos.products);  
        this.$productos.next(nuevosProductos); 
        this.total = datos.total;
      });
    }
  

}
