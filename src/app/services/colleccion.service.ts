import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ColeccionService {
  private coleccionRef: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.coleccionRef = this.firestore.collection('educacion');
  }

  // Obtener todos los elementos de la colección
  getColeccion(): Observable<any[]> {
    return this.coleccionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Agregar un nuevo elemento a la colección
  agregarElemento(elemento: any): Promise<any> {
    return this.coleccionRef.add(elemento);
  }

  // Obtener un elemento específico por su ID
  getElemento(id: string): Observable<any> {
    return this.coleccionRef.doc(id).valueChanges();
  }

  // Actualizar un elemento existente
  actualizarElemento(id: string, data: any): Promise<void> {
    return this.coleccionRef.doc(id).update(data);
  }

  // Eliminar un elemento de la colección
  eliminarElemento(id: string): Promise<void> {
    return this.coleccionRef.doc(id).delete();
  }
}
