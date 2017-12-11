import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonajesFavPage } from './personajes-fav';

@NgModule({
  declarations: [
    PersonajesFavPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonajesFavPage),
  ],
})
export class PersonajesFavPageModule {}
