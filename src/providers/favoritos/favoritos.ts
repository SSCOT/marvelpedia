import { ToastController } from 'ionic-angular';
import { Personaje } from './../../models/Personaje';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()
export class FavoritosProvider {

  userId;
  favArray: string[] = [];

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public toastCtrl: ToastController) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        let favObs = this.db.list("/" + this.userId);

        this.favArray = [];
        favObs.subscribe(personajesFB => {
          personajesFB.forEach(personajeFB => {
            this.favArray.push(personajeFB.nombre);
          })
        })
      }
    });
  }

  public comprobarFavorito(psj: Personaje) {
    var encontrado = 0;
    for (let i = 0; i < this.favArray.length; i++) {
      if (this.favArray[i] == psj.nombre) {
        encontrado = 1;
        return false;
      }
    }
    if (encontrado == 0) {
      return true;
    }
  }

  public anadirPersonaje(psj: Personaje, userId) {
    // Comprueba que no existe en la lista de favoritos
    if (this.comprobarFavorito(psj)) {
      // Añade el personaje
      this.db.list("/" + userId).push(psj);
      this.favArray.push(psj.nombre);
      this.mostrarMensaje(psj.nombre + " se ha añadido a tu lista de personajes favoritos");
    } else {
      this.mostrarMensaje(psj.nombre + " ya forma parte de tu lista de favoritos");
    }
  }

  public borrarFavorito(psj, userId) {
    this.favArray.splice(psj);
    this.db.list("/" + userId).remove(psj);
    this.mostrarMensaje("Se ha eliminado de tus favoritos de forma satisfactoria");
  }

  // Muestra un determinado mensaje por pantalla
  mostrarMensaje(msj) {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: "middle",
      cssClass: "toastCss"
    });
    toast.present();
  }

}
