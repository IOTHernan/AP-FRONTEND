// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class FirebaseService {
	datosCollection!: AngularFirestoreCollection<any>;
	// che_nombreColeccion = [ 'aboutme','persona','educacion','experiencia','skills','softskills'];
	// che_nombreCampos = [ 'camposAboutme', 'camposPersona', 'camposEducacion', 'camposExperiencia', 'camposSkills', 'camposSoftskills']
	// nombreColeccion!: string ;
	// camposEducacion = ([{escuela:'E.E.M.Nº 24'},{titulo:'Bachiller contable'},{imagen:''},{carrera:'Bachiller'},{puntaje: 70},{inicio:'05/03/90'},{fin: '05/12/95'}]);
	// camposExperiencia = ([{ubicacion:'Buenos Aires'},{puesto:'Data entry'},{periodo:''},{empresa:''},{actividades:''}]);
	// camposSkills = [{descripcion:'Descripción'}];
	// camposSoftskills = [ {name: ''} , {urlImage:''},{level:''}];

	constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

	obtenerColeccionPorUsuario() {
		this.afAuth.authState.subscribe((user) => {
		  if (user) {
			const userID = user.uid;
			const coleccion = this.firestore.collection(`users/${userID}/miColeccion`);
	  
			// Utiliza la colección obtenida según el usuario logueado
			coleccion.get().subscribe((querySnapshot) => {
			  querySnapshot.forEach((doc) => {
				console.log("Documento:", doc.data());
			  });
			});
		  }
		});
	  }
	  
	verificarYCrearColeccion(nombreColeccion: string, camposColeccion: object): void {
		this.firestore
			.collection(nombreColeccion)
			.get()
			.pipe(take(1))
			.subscribe((snapshot: { empty: any; }) => {
				if (snapshot.empty) {
					// La colección no existe, crearla
					this.firestore
						.collection(nombreColeccion)
						.add(camposColeccion)
						.then(() => {
							console.log('Colección creada exitosamente: ', nombreColeccion);
						})
						.catch((error) => {
							console.error('Error al crear la colección:', nombreColeccion, ' - ', error);
						});
				} else {
					console.log('Existe:', nombreColeccion);
				}
			},
				(error: any) => {
					console.error('Error al verificar la existencia de la colección:', error);
				});
	}

	getDatosArray(nombreColeccion: string, datosArray: any[]): void {
		// datosCollection!: AngularFirestoreCollection<any>;
		this.datosCollection.snapshotChanges().pipe(map((snapshots) => {
			return snapshots.map((snapshot: { payload: { doc: { data: () => any; id: any; }; }; }) => {
				const data = snapshot.payload.doc.data();
				const id = snapshot.payload.doc.id;
				return { id, ...data };
			});
		})).subscribe((array: any) => {
			datosArray = array;
			return array;
			// console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}

	cargarDatosEnFirebase(nombreColeccion: string, datosArray1: any[]) {
		const coleccion = this.firestore.collection(nombreColeccion);
	  
		datosArray1.forEach((dato) => {
		  coleccion.add(dato)
			.then((docRef) => {
			  console.log("Dato agregado con ID: ", docRef.id);
			})
			.catch((error) => {
			  console.error("Error al agregar el dato: ", error);
			});
		});
	  }
	  
	getNumRegistros(nombreColeccion: string): void {
		this.datosCollection?.get().subscribe((snapshot: { size: any; }) => {
			return snapshot.size;
			// this.numRegistros = snapshot.size;
			// console.log("REG:", this.numRegistros);
		});
	}
	modificarRegistro(nombreColeccion: string, documentId: string, nuevosDatos: any): void {
		this.firestore.collection(nombreColeccion).doc(documentId).update(nuevosDatos)
			.then(() => {
				console.log('Registro modificado correctamente');
			})
			.catch((error) => {
				console.error('Error al modificar el registro:', error);
			});
	}

	agregarRegistros(registros: any[]): void {
		const batch = this.firestore.firestore.batch();

		registros.forEach((registro) => {
			const nuevoDocumentoRef = this.datosCollection.ref.doc();
			batch.set(nuevoDocumentoRef, registro);
		});

		batch.commit()
			.then(() => {
				console.log('Registros agregados correctamente');
			})
			.catch((error) => {
				console.error('Error al agregar los registros:', error);
			});
	}

	
	deleteRecord(nombreColeccion: string, documentId: string) {
		console.log('DEBUG: borrarRegistro:', documentId);
		this.firestore.collection(nombreColeccion).doc(documentId).delete()
			.then(() => {
				console.log('Registro eliminado correctamente');
			})
			.catch((error) => {
				console.error('Error al eliminar el registro:', error);
			});
	}
}