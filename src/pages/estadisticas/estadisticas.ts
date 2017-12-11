import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ComicProvider } from '../../providers/comic/comic';

import { Chart } from 'chart.js';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {
  personajeNombre = "";
  personajeNombre2 = "";
  personaje;
  personaje2;
  apariciones = [];
  aparicionesTotales = 0;
  apariciones2 = [];
  aparicionesTotales2 = 0;

  decada = "2000";
  anios = [];
  private loader;

  flagBusquedaFinalizada = 0;

  @ViewChild('barCanvas') barCanvas;
  barChart: any = null;
  @ViewChild('barCanvasTotales') barCanvasTotales;
  barChartTotales: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comicsData: ComicProvider,
    public loadingCtrl: LoadingController, public utils: UtilsProvider) {
   
  }

  lanzarGrafica() {
    // Inicializamos el flag y el valor máximo de la escala de la gráfica    
    this.flagBusquedaFinalizada = 0;

    // Creamos el array con los años de la decada seleccionada
    this.calcularDecada();

    // Configuramos el loader para que el usuario vea que está cargando la petición
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo datos..."
    });
    // Ejecutamos el loader y dentro hacemos la peticion de comics a la api
    this.loader.present().then(() => {

      // Comics del primer personaje
      // Comprobamos que hay un nombre escrito
      if (this.personajeNombre != "") {
        // Obtenemos el ID del personaje a partir del nombre
        this.comicsData.obtenerFichaPersonaje(this.personajeNombre).then(personajedata1 => {
          // Asignamos el personaje a la variable personaje
          this.personaje = personajedata1['data']['results'][0];
          if (this.personaje != null) {
            // Inicializamos todo
            this.apariciones = [];
            this.aparicionesTotales = 0;
            var aparicionesAuxiliar = [];
            var contData = 0;

            // Para cada año del rango sacamos las apariciones totales
            for (let anio = this.anios[0]; anio < (this.anios[0] + 10); anio++) {
              this.comicsData.obtenerComics(String(anio), this.personaje['id']).then(comicList => {
                // Necesitamos una variable intermedia para introducir los valores ordenados, ya que nos llegan de forma asíncrona
                aparicionesAuxiliar[anio] = comicList['data']['total'];
                contData++;
                // Cuanto tenemos 10 valores ya tenemos la década entera            
                if (contData == 10) {
                  // Volcamos el auxiliar en nuestra variable global de forma ordenada
                  for (let i = this.anios[0]; i < (this.anios[0] + 10); i++) {
                    this.apariciones.push(aparicionesAuxiliar[i]);
                    this.aparicionesTotales += aparicionesAuxiliar[i];
                  }
                  // Comprobamos los flags y lanzamos si están los dos bucles finalizados
                  if (this.comprobarCerrarLoader()) {
                    this.pintarGraficaDoble();
                    this.pintarGraficaTotales();
                  }
                }

              });
            }
          } else {
            this.utils.mostrarMensaje("No existe el primer personaje");
            this.personajeNombre = "";
            this.aparicionesTotales = 0;
            this.apariciones = [];
            this.comprobarCerrarLoader();
          }
        });
      } else {   
        this.utils.mostrarMensaje("No existe el primer personaje");     
        //this.mostrarMensaje("No existe el primer personaje");
        this.personajeNombre = "";
        this.aparicionesTotales = 0;
        this.apariciones = [];
        this.comprobarCerrarLoader();
      }

      // Comics del segundo personaje
      if (this.personajeNombre2 != "") {
        this.comicsData.obtenerFichaPersonaje(this.personajeNombre2).then(personajedata2 => {
          this.personaje2 = personajedata2['data']['results'][0];
          if (this.personaje2 != null) {
            // Inicializamos todo
            this.apariciones2 = [];
            this.aparicionesTotales2 = 0;
            var aparicionesAuxiliar2 = [];
            var contData2 = 0;

            for (let anio = this.anios[0]; anio < (this.anios[0] + 10); anio++) {
              this.comicsData.obtenerComics(String(anio), this.personaje2['id']).then(comicList2 => {
                // Necesitamos una variable intermedia para introducir los valores ordenados, ya que nos llegan de forma asíncrona
                aparicionesAuxiliar2[anio] = comicList2['data']['total'];
                contData2++;

                if (contData2 == 10) {
                  // Volcamos el auxiliar en nuestra variable global de forma ordenada
                  for (let i = this.anios[0]; i < (this.anios[0] + 10); i++) {
                    this.apariciones2.push(aparicionesAuxiliar2[i]);
                    this.aparicionesTotales2 += aparicionesAuxiliar2[i];
                  }                  
                  // Comprobamos los flags y lanzamos si están los dos bucles finalizados
                  if (this.comprobarCerrarLoader()) {
                    this.pintarGraficaDoble();
                    this.pintarGraficaTotales();
                  }
                }
              });
            }
          } else {
            this.utils.mostrarMensaje("No existe el segundo personaje");
            this.personajeNombre2 = "";
            this.aparicionesTotales2 = 0;
            this.apariciones2 = [];
            this.comprobarCerrarLoader();            
          }
        });
      } else {

        this.utils.mostrarMensaje("No existe el segundo personaje");
        this.personajeNombre2 = "";
        this.aparicionesTotales2 = 0;
        this.apariciones2 = [];
        this.comprobarCerrarLoader();        
      }
    });
  }

  // Grafica de apariciones totales
  pintarGraficaTotales() {
    this.barChartTotales = new Chart(this.barCanvasTotales.nativeElement, {
      type: 'bar',
      data: {
        labels: [this.personajeNombre + " (" + this.aparicionesTotales + ")", this.personajeNombre2 + " (" + this.aparicionesTotales2 + ")"],
        datasets: [{
          label: 'Apariciones',
          data: [this.aparicionesTotales, this.aparicionesTotales2],
          backgroundColor: [
            'rgba(156,20,13,1)',
            'rgba(156,20,13,1)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        }
      }
    });

  }

  // Gráfica de apariciones en cada año durante la década
  pintarGraficaDoble() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.anios,
        datasets: [{
          label: this.personajeNombre,
          data: this.apariciones,
          backgroundColor: [
            'rgba(156,20,13,0.5)',
          ],
          borderColor: [
            'rgba(0,0,0,1)'
          ],
          borderWidth: 1
        }, {
          label: this.personajeNombre2,
          data: this.apariciones2,
          backgroundColor: [
            'rgba(85, 0, 0, 0.5)'
          ],
          borderColor: [
            'rgba(0,0,0,1)'
          ],
          borderWidth: 1
        }

        ]
      },
      options: {
        events: ['click'],
        scales: {
          yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              beginAtZero: true,
            }
          }],
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
        }
      }

    });
  }

  // Generamos un array con los años de la década seleccionada
  calcularDecada() {
    // Sacamos los años de la decada
    this.anios = [];
    // pasamos la década a numero
    var decadaNumero = Number.parseInt(this.decada);

    for (var i = decadaNumero; i < (decadaNumero + 10); i++) {
      this.anios.push(i);
    }
  }

  // Indicamos que un proceso ha finalizado. Añadimos una unidad al flag de busqueda si está a 0. Si está inicializado cerramos el loader.
  comprobarCerrarLoader() {
    if (this.flagBusquedaFinalizada > 0) {
      this.loader.dismiss();
      return true;
    } else {
      this.flagBusquedaFinalizada++;
      return false;
    }
  }
}