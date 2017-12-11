import { FavoritosProvider } from './../../providers/favoritos/favoritos';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Console } from '@angular/core/src/console';
import { AngularFireAuth } from 'angularfire2/auth';

import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-personajes-fav',
  templateUrl: 'personajes-fav.html',
})
export class PersonajesFavPage {
  userId;
  //listaPersonajes: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public favoritosData: FavoritosProvider,
    public utils: UtilsProvider) {

    // Obtenemos los datos del usuario y la lista de favoritos
    this.userId = this.afAuth.auth.currentUser.uid;
    //this.listaPersonajes = this.db.list("/" + this.userId);
  }

  borrarFavorito(psj) {
    this.favoritosData.borrarFavorito(psj, this.userId);
  }

  mostrarPersonaje(name: string) {
    this.utils.mostrarPersonaje(name);
  }
}
