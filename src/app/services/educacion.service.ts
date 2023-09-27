import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Ieducacion } from './../interfaces/ieducacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private educacionCollection: AngularFirestoreCollection<Ieducacion>;

  constructor(private firestore: AngularFirestore) {
    this.educacionCollection = this.firestore.collection<Ieducacion>('educacion');
  }

 /*  crearElemento(elemento: Ieducacion): Promise<void> {
    const id = this.firestore.createId();
    return this.educacionCollection.doc(id).set({
      ...elemento,
      id: id
    });
  }
 */
  actualizarElemento(id: string, elemento: Ieducacion): Promise<void> {
    return this.educacionCollection.doc(id).update(elemento);
  }

  eliminarElemento(id: string): Promise<void> {
    return this.educacionCollection.doc(id).delete();
  }
}
