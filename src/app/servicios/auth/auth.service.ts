import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { cuerpoLogin } from 'src/app/interfaces/cuerpoLogin';
import { usuarioLogeado } from 'src/app/interfaces/usuarioLogin';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login'
  public usuarioLogeado: usuarioLogeado | null = null;
  public accessToken: string | null = null;
  // Aqui crearemos los eventos observables para la pagina html
  public $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private Http: HttpClient,
    private router: Router,
  ) { }

  public iniciarSecion(nombre_usuario: string, contra: string,){
    const cuerpo: cuerpoLogin = {
      username: nombre_usuario,
      password: contra
    }
    this.Http.post<usuarioLogeado>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      headers:{
        'content-type': 'aplicacion-json'
      }
    })
    .subscribe(resultado => {
      this.usuarioLogeado = resultado;
      this.accessToken = resultado.accessToken;
      console.log(resultado);
      this.router.navigate(['/','productos'])

    });
  }
    public cerrarSeccion(){
      if(this.usuarioLogeado){
        this.usuarioLogeado = null;
        this.accessToken = null;
      }

    }
      

    }


