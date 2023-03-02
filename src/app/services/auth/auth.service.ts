import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password }: { email: any; password: any }) {
    try {
      // register the user
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      //create user document
      const userDocRef = doc(this.firestore, `users/${user.user.uid}`);
      await setDoc(userDocRef, {
        joinedAt: new Date().getTime(),
      });
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async login({ email, password }: { email: any; password: any }) {
    try {
      // login the user
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
