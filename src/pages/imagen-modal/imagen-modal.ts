import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imagen-modal',
  templateUrl: 'imagen-modal.html',
})
export class ImagenModalPage {

  url: String;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    // Cojo los parametros
    this.url = navParams.get('url');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
