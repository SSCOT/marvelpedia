import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonajeModalPage } from './personaje-modal';

@NgModule({
  declarations: [
    PersonajeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonajeModalPage),
  ],
})
export class PersonajeModalPageModule {}
