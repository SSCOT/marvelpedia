import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FichaComicPage } from './ficha-comic';

@NgModule({
  declarations: [
    FichaComicPage,
  ],
  imports: [
    IonicPageModule.forChild(FichaComicPage),
  ],
})
export class FichaComicPageModule {}
