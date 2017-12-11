import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { ComicProvider } from '../../providers/comic/comic';

@IonicPage()
@Component({
  selector: 'page-personaje-modal',
  templateUrl: 'personaje-modal.html',
})
export class PersonajeModalPage {

  personaje: string;
  personajeData;
  loader;

  constructor(public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams,
    public comicsData: ComicProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

    // Cojo los parametros
    this.personaje = navParams.get('name');

    // Configuramos el loader para que el usuario vea que está cargando la petición
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo datos..."
    });
    // Ejecutamos el loader y dentro hacemos la peticion del personaje
    this.loader.present().then(() => {
      // Petición de comics a la api
      this.comicsData.obtenerFichaPersonaje(this.personaje).then(personajedata => {
        // Asignamos el personaje a la variable personajeData
        this.personajeData = personajedata['data']['results'][0];
        // Una vez obtenidos los datos cerramos el loader
        this.loader.dismiss();
      })
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
