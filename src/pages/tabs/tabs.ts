import { EstadisticasPage } from './../estadisticas/estadisticas';
import { Component } from '@angular/core';
import { PrincipalPage } from '../principal/principal';
import { PersonajesFavPage } from '../personajes-fav/personajes-fav';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabPrincipal = PrincipalPage;
  tabPersonajesFavoritos = PersonajesFavPage;
  tabEstadisticas = EstadisticasPage;

  constructor() {

  }
}
