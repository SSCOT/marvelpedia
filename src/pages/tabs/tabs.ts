import { EstadisticasPage } from './../estadisticas/estadisticas';
import { Component } from '@angular/core';
import { PrincipalPage } from '../principal/principal';
import { PersonajesPage } from '../personajes-fav/personajes-fav';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabPrincipal = PrincipalPage;
  tabPersonajesFavoritos = PersonajesPage;
  tabEstadisticas = EstadisticasPage;

  constructor() {

  }
}
