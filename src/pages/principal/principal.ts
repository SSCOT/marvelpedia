import { UtilsProvider } from './../../providers/utils/utils';
import { FavoritosProvider } from './../../providers/favoritos/favoritos';
import { ComicProvider } from './../../providers/comic/comic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

import { FichaComicPage } from '../ficha-comic/ficha-comic';
import { ImagenModalPage } from '../imagen-modal/imagen-modal';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Personaje } from '../../models/Personaje';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  // Variable que va a recoger todos los comics
  comics: Array<Object> = [];
  // Nombre del personaje
  private personaje;
  // Datos recuperados del personaje
  private personajeData;
  private comicData;
  // Año de búsqueda
  private anio = "2017";
  // Loader para indicar que está cargando una petición
  private loader;
  // Usuario activo
  private userId;
  // Array de años para select
  private anios = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comicsData: ComicProvider,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public favoritosData: FavoritosProvider,
    public utils: UtilsProvider) {

    // Inicializamos los años para el select
    for (let i = 1940; i < 2018; i++) {
      this.anios.push(i);
    };

    // Sacamos obtenemos el id del usuario activo
    afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  // Obtenemos la lista de comics en ese año concreto
  obtenerComics() {
    // Vaciamos la lista
    this.comics = [];

    // Con el nombre obtenemos los datos del personaje para obtener el id que necesitaremos para obtener sus comics
    this.comicsData.obtenerFichaPersonaje(this.personaje).then(personajedata => {
      // Asignamos el personaje a la variable personajeData
      this.personajeData = personajedata['data']['results'][0];
      if (this.personajeData != null) {

        // Configuramos el loader para que el usuario vea que está cargando la petición
        this.loader = this.loadingCtrl.create({
          content: "Obteniendo datos..."
        });
        // Ejecutamos el loader y dentro hacemos la peticion de comics a la api
        this.loader.present().then(() => {
          // Creamos un objeto de personaje para incluirlo en favoritos si lo requiere el usuario
          let instanciaPersonaje = new Personaje();
          instanciaPersonaje.nombre = this.personajeData['name'];
          instanciaPersonaje.descripcion = this.personajeData['description'];
          instanciaPersonaje.imagen = this.personajeData['thumbnail']['path'] + "." + this.personajeData['thumbnail']['extension'];
          this.personajeData['instanciaPersonaje'] = instanciaPersonaje;

          // Indicamos si está en la lista de favoritos
          this.personajeData['favorito'] = this.favoritosData.comprobarFavorito(instanciaPersonaje);

          // Petición de comics a la api
          this.comicsData.obtenerComics(this.anio, this.personajeData['id']).then(comicList => {
            this.comics = comicList['data']['results'];

            // Una vez obtenidos los datos cerramos el loader
            this.loader.dismiss();

            if (comicList['data']['count'] == 0) {
              this.mostrarMensaje("En el año " + this.anio + " no salieron a la venta cómics de " + this.personajeData['name']);
            }
          })
        });

      } else {
        this.mostrarMensaje("No se ha encontrado el personaje solicitado. Es importante que escriba los nombres en inglés");
      }
    })
  }

  // Obtiene la ficha de un cómic por su id
  obtenerFichaComic(id) {
    this.comicsData.obtenerFichaComic(id).then(comicData => {
      this.comicData = comicData['data']['results'][0];
      this.navCtrl.push(FichaComicPage, { comicData: this.comicData });
    });
  }

  // Muestra un determinado mensaje por pantalla
  mostrarMensaje(msj) {
    this.utils.mostrarMensaje(msj);
  }

  // Muestra la imagen del personaje activo
  mostrarImagen() {
    this.utils.mostrarImagen(this.personajeData['thumbnail']['path'] + "." + this.personajeData['thumbnail']['extension']);
  }

  anadirFavorito(nuevoPersonaje) {
    this.favoritosData.anadirPersonaje(nuevoPersonaje, this.userId);
    // Indicamos que el personaje ya es favorito para que oculte el botón
    this.personajeData['favorito'] = false;
  }
}