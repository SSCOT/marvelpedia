import { Injectable } from '@angular/core';

// Autentificación
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Http } from '@angular/http';

@Injectable()
export class AutentificacionProvider {

  constructor(public http: Http, public afa: AngularFireAuth) {
    
  }

  login(email: string, pass: string): Promise<any>{    
    return this.afa.auth.signInWithEmailAndPassword(email, pass);
  }

  logout(): Promise<any>{
    return this.afa.auth.signOut();
  }

  reestablecerPassword(email: string): Promise<any>{
    return this.afa.auth.sendPasswordResetEmail(email); 
  }

  registrarse(email: string, password: string): Promise<any>{
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }
}
