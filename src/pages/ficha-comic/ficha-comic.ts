import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImagenModalPage } from '../imagen-modal/imagen-modal';
import { PersonajeModalPage } from '../personaje-modal/personaje-modal';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-ficha-comic',
  templateUrl: 'ficha-comic.html',
})
export class FichaComicPage {
  private comic: Object;
  private date: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public utils: UtilsProvider) {
    // Recuperamos el cómic que llega por parámetros
    this.comic = navParams.data.comicData;
    // Extraemos lo que nos interesa de la fecha
    this.date = this.comic['modified'];
    // Reorganizamos la fecha
    if (this.date != "") {      
      var anio = this.date.substr(0, 4);      
      var mes = this.date.substr(5, 2);      
      var dia = this.date.substr(8, 2);      
      this.date = dia + "-" + mes + "-" + anio;
    }
  }

  // Función para mostrar una imagen determinada
  mostrarImagen() {  
    this.utils.mostrarImagen(this.comic['thumbnail']['path'] + "." + this.comic['thumbnail']['extension']);
  }

  mostrarPersonaje(name: string){
    this.utils.mostrarPersonaje(name);
  }
}
