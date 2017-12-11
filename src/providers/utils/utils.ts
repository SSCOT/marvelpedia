import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ImagenModalPage } from '../../pages/imagen-modal/imagen-modal';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PersonajeModalPage } from '../../pages/personaje-modal/personaje-modal';

@Injectable()
export class UtilsProvider {

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController) {

  }

  // Función para mostrar un mensaje por pantalla
  public mostrarMensaje(msj) {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: "middle",
      cssClass: "toastCss"
    });
    toast.present();
  }

  // Función para mostrar una imagen determinada
  mostrarImagen(cadenaUrl: string) {
    // let cadenaUrl = this.comic['thumbnail']['path'] + "." + this.comic['thumbnail']['extension'];
    let imagenModal = this.modalCtrl.create(ImagenModalPage, { url: cadenaUrl });
    imagenModal.present();
  }

  mostrarPersonaje(name: string) {
    let imagenModal = this.modalCtrl.create(PersonajeModalPage, { name: name });
    imagenModal.present();
  }

}
