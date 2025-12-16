import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, connectFirestoreEmulator } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app: any;
  private db: any;

  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(environment.firebase);
    } else {
      this.app = getApp();
    }
    this.db = getFirestore(this.app);
    if (!environment.production) {
      try {
        connectFirestoreEmulator(this.db, '127.0.0.1', 8080);
        console.log('Connected Firestore to emulator at 127.0.0.1:8080');
      } catch (err) {
        console.warn('Could not connect to Firestore emulator:', err);
      }
    }
  }

  async sendContact(payload: { name: string; email: string; message: string }) {
    const col = collection(this.db, 'contacts');
    const docRef = await addDoc(col, {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  }
}
