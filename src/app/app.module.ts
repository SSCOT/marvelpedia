import { EstadisticasPage } from './../pages/estadisticas/estadisticas';
import { PersonajeModalPage } from './../pages/personaje-modal/personaje-modal';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PrincipalPage } from '../pages/principal/principal';
import { PersonajesFavPage } from '../pages/personajes-fav/personajes-fav';
import { FichaComicPage } from '../pages/ficha-comic/ficha-comic';
import { ImagenModalPage } from '../pages/imagen-modal/imagen-modal';
import { LoginPage } from '../pages/login/login';


// Providers
import { AutentificacionProvider } from '../providers/autentificacion/autentificacion';
import { ComicProvider } from '../providers/comic/comic';
import { FavoritosProvider } from '../providers/favoritos/favoritos';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { UtilsProvider } from '../providers/utils/utils';



// Configuración firebase
const fbConf = {
  apiKey: "AIzaSyCm9WfMFSMS71H3y9lm9JNoyjN_2WE3zIc",
  authDomain: "marvelpedia-b6943.firebaseapp.com",
  databaseURL: "https://marvelpedia-b6943.firebaseio.com",
  projectId: "marvelpedia-b6943",
  storageBucket: "marvelpedia-b6943.appspot.com",
  messagingSenderId: "695111024955"
};



@NgModule({
  declarations: [
    MyApp,    
    PrincipalPage,
    EstadisticasPage,
    PersonajesFavPage,    
    FichaComicPage,
    ImagenModalPage,
    PersonajeModalPage,
    LoginPage,
    TabsPage    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fbConf),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,
    PersonajesFavPage,
    EstadisticasPage,
    FichaComicPage,
    ImagenModalPage,
    PersonajeModalPage,
    LoginPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ComicProvider,
    AutentificacionProvider,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireDatabase,
    FavoritosProvider,
    UtilsProvider,
    UtilsProvider
  ]
})
export class AppModule { }
