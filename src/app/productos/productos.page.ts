import { Component, OnInit } from '@angular/core';
import { ProductosService } from './../servicios/productos/productos.service';
import { Producto } from './../interfaces/telefono';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidLeave {
  public productos: Producto[] = [];
  private subProucto!: Subscription;
  skip: number = 30; // índice
  limit: number = 30; // número de productos a cargar

  constructor(
    private prdS: ProductosService,
    private router: Router
  ) {}

  ionViewDidLeave(): void {
    if (this.subProucto) {
      this.subProucto.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.subProucto = this.prdS.producto.subscribe((productos) => {
      this.productos = productos;
    });
    this.prdS.listarProductos();
  }

  cargarMasProductos(event?: any): void {
    this.skip += this.limit;  // Incrementa el valor de skip para la siguiente carga
    this.prdS.CargarProductos(this.skip, this.limit);  // Llama al servicio para cargar más productos
  
    if (event) {
      event.target.complete();  // Completa el evento de infinite scroll
    }
  }
  
  
  
  public volver() {
    this.router.navigate(['/', 'iniciarsesion']);
  }
}
