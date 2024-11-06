import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarsesionPageRoutingModule } from './iniciarsesion-routing.module';

import { IniciarsesionPage } from './iniciarsesion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IniciarsesionPageRoutingModule
  ],
  declarations: [IniciarsesionPage]
})
export class IniciarsesionPageModule {}
