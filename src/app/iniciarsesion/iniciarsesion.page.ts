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
      usuario: ['',[ Validators.required]],
      contra: ['',[ Validators.required]],
    }) 
   }
   public validarForm(){
    const esValido = this.formulario.valid;
    if(!esValido){
      return
    }
    const datos = this.formulario.getRawValue();
    const usuario = datos ['usuarios'];
    const contra = datos['contrasenia'];
    this.auth.iniciarSecion(usuario, contra);
   }

  ionViewWillEnter(): void {
    this.subCharge = this.auth.cargando.subscribe(newValor => {
      this.cargando_block = newValor;

    })
  }

  ionViewDidLeave(): void {
    
  }
}
