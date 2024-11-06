import { Component,  } from '@angular/core';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../servicios/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements ViewWillEnter, ViewDidLeave{
  public formulario!: FormGroup;
  public cargando_block: boolean = false;
  public subCharge!: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.formulario = fb.group({
      nombre_usuario: ['',[ Validators.required]],
      contra: ['',[ Validators.required]],
    }) 
   }
   public validarForm(){
    const esValido = this.formulario.valid;
    if(!esValido){
      return
    }
    const datos = this.formulario.getRawValue();
    const nombre_usuario = datos ['nombre_usuario'];
    const contra = datos['contra'];
    this.auth.iniciarSecion(nombre_usuario, contra);
   }

  ionViewWillEnter(): void {
    this.subCharge = this.auth.cargando.subscribe(newValor => {
      this.cargando_block = newValor;

    })
  }

  ionViewDidLeave(): void {
    if(this.subCharge){
      this.subCharge.unsubscribe()
    };  
  } 
}
