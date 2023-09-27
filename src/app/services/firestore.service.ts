import { Injectable, InjectionToken } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, DocumentChangeAction } from '@angular/fire/compat/firestore';
import {  doc } from '@angular/fire/firestore';
import { Observable, lastValueFrom } from 'rxjs';
import { Mod1Module } from '../mod1/mod1.module';
// import { map } from 'rxjs/operators';
import { MyService } from './myservice.service';

// Define una inyección de dependencia para el nombre de la colección
// export const COLLECTION_NAME = new InjectionToken<string>('collectionName');
@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
	private collectionName!: string;
	private collection!: AngularFirestoreCollection;

  	constructor( private firestore: AngularFirestore) {
		// this.collectionName = 'skills';
		// this.collection = this.firestore.collection(this.collectionName);
	}

	private async collectionExists(collection: string): Promise<boolean> {
		const collections = await this.firestore.collection<any>('__metadata__').get();
		const snapshot = await lastValueFrom(collections);
		return !snapshot.empty;
		// return (collections.size > 0) || false;
		// collections.docs.some((doc) => doc.id === this.collectionName);
	}

	private async createCollection(collection: string): Promise<void> {
		return this.firestore.collection('__metadata__').doc(collection).set({});
	}

	async initCollectionIfNotExists(collection: string): Promise<void> {
		const exists = await this.collectionExists(collection);
		if (!exists) {
			await this.createCollection(collection);
		}
	}

	// getItems(): Observable<DocumentChangeAction[]> {
	// 	return this.collection.snapshotChanges();
	// }

	// addItem(item: T): Promise<any> {
	// 	return this.collection.add(item);
	// }

	// updateItem(itemId: string, newData: Partial<T>): Promise<void> {
	// 	return this.collection.doc(itemId).update(newData);
	// }

	deleteItem(itemId: string): Promise<void> {
		return this.collection.doc(itemId).delete();
	}

	//  setCollection( collectionName: string): void {
	// 	this.collectionName = collectionName;
	// 	this.collection = this.firestore.collection<T>(this.collectionName);
	//  }

	 
	//  getCollection(): AngularFirestoreCollection<T> {
	// 	return this.collection;
	//   }
	
	//   getAll(): Observable<T[]> {
	// 	return this.collection.valueChanges();
	//   }
	
	//   getById(id: string): Observable<T> {
	// 	return this.collection.doc<T>(id).valueChanges();
	//   }
	
	//   add(item: T): Promise<DocumentReference<T>> {
	// 	return this.collection.add(item);
	//   }
	
	//   update(id: string, data: Partial<T>): Promise<void> {
	// 	return this.collection.doc<T>(id).update(data);
	//   }
	
	//   delete(id: string): Promise<void> {
	// 	return this.collection.doc<T>(id).delete();
	//   }
	
}
