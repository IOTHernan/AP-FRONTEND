import { Injectable } from '@angular/core';
import { collection,  doc, docData, Firestore, getDoc, setDoc, updateDoc, } from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { Users } from '../interfaces/iuser';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private usersColeccion!: AngularFirestoreCollection<Users>;
  private users!: Observable<Users[]>;
  currentUser$ = "";
  constructor(private firestore: AngularFirestore, private fColeccion: AngularFirestoreCollection, private authService: AuthService) {
    this.usersColeccion = firestore.collection<Users>('users');
    this.users = this.usersColeccion.valueChanges();

  }

  /* get currentUserProfile$(): Observable<Users | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<Users>;
      })
    );
  }  */
  addUser(user: Users): Promise<void> {
    const id = this.firestore.createId();
    return this.usersColeccion.doc(id).set({
      uid: id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      phone: user.phone,
      address: user.address,
      photoURL:user.photoURL
    });
  }

 /*  updateUser(user: Users): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  } */
}
