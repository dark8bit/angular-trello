import {Directive, HostListener} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private angularFireAuth: AngularFireAuth) { }

  @HostListener('click') onclick(): void {
    this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
