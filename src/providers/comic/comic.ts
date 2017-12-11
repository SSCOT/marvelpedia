import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ComicProvider {

  private API_KEY: string = 'apikey=6db790e352647e531e9cfddc8a3e7893&ts=1&hash=c42be48e11e20734ad5e2685ce603f66';
  // private API_KEY: string = 'apikey=a08cf8ac196f3fa7d52a98ca72e147de&ts=1&hash=f95a4e0c6b741b6a30d8954c5b36e723';

  data: any = null;
  page: number = 0;

  constructor(public http: Http) {
    console.log('Hello ComicProvider Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com/v1/public/characters/1009351/comics?startYear=2015&limit=100&' + this.API_KEY)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  public obtenerComics(anio: string, personaje: string) {
    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com/v1/public/characters/' + personaje + '/comics?startYear=' + anio + '&limit=100&' + this.API_KEY)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  obtenerFichaPersonaje(nombre: string) {
    // console.log("apirequest => https://gateway.marvel.com/v1/public/characters?name=" + nombre + '&' + this.API_KEY);
    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com/v1/public/characters?name=' + nombre + '&' + this.API_KEY)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  obtenerFichaPersonajeId(id: string) {
    // console.log("apirequest => https://gateway.marvel.com/v1/public/characters?name=" + nombre + '&' + this.API_KEY);
    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com/v1/public/characters/' + id + '?' + this.API_KEY)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  obtenerFichaComic(id: number) {
    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com:443/v1/public/comics/' + id + '?limit=100&' + this.API_KEY)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}


