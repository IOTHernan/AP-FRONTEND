import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { trace } from '@angular/fire/compat/performance';
import { Ipersona } from '../interfaces/ipersona';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  ref!: DocumentReference<Document>;

  public readonly persistenceEnabled$: Observable<boolean>;
  public readonly testDocValue$: Observable<any>;
  private persona!: Observable<Ipersona[]>;

  constructor(private firestore: AngularFirestore) {
    const doc = firestore.doc('test/1');
    const ref = firestore.doc( "users").valueChanges().pipe(trace('firestore'));
    const cc= docData(this.ref);
    this.testDocValue$ = firestore.doc('test/1').valueChanges().pipe(
      trace('firestore'),
    );
    this.persistenceEnabled$ = firestore.persistenceEnabled$;
  }
  // private personaCollection= collection<Ipersona>;
  
  /* create(todo: Ipersona): Promise<void> {
    return this.firestore.collection('persona').add(todo);
  } */
  getPersona(): Observable<Ipersona[]> {
    // this.persona[]= this.firestore.collection('persona').valueChanges();
    return this.persona;
  }
  // get(): Observable<Ipersona[]> {
// 
    // return this.getDoc('persona').valueChanges();
    // this.personaCollection=this.firestor.getPersona().valueChanges();
    // this.persona= this.firestore.collection('persona').valueChanges();
  // }

  update(id: string, data: Partial<Ipersona>): Promise<void> {
    return this.firestore.doc(`persona/${id}`).update(data);
  }

  /* const querySnapshot = await getDocs(collection( db , "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
 */
  
    /* delete(id: string): void {
      this.todoService.delete(id);
    } */
 /*  delete(id: string): Promise<void> {
    return this.firestore.getData(`persona/${id}`).delete();
  } */
}