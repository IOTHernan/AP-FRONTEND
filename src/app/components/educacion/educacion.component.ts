// ------------------------------------ EDUCACION.COMPONENT.TS ------------------------------------
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from './../../services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage  } from '@angular/fire/compat/storage';
// import {  put } from "firebase/storage";
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';

import { Observable, map } from 'rxjs';
import { Ieducacion } from './../../interfaces/ieducacion';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage/firebase';

@Component({
	selector: 'app-educacion',
	templateUrl: './educacion.component.html',
	styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	esc24 = "https://drive.google.com/uc?export=download&id=1KlTxw0mNNOAG03NfRlrwiisaoDUcuuIQ";
	nombreColeccion = 'educacion';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Ieducacion[]>;
	numRegistros!: number;
	// GPT
	editMode = false;
	dialogForm: FormGroup;
	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	educacionItems: Observable<Ieducacion[]>;

	educacionCollection: AngularFirestoreCollection<Ieducacion>;

	dialogData: Ieducacion = {
		escuela: '',
		titulo: '',
		imagen: '',
		carrera: '',
		puntaje: 100,
		inicio: 0,
		fin: 0
	};

	isEditing: boolean = false;
	items!: any[];
	modoEdicion: boolean = false;
	editID!: number;
	selectedEducacion: any = {};
	educacion!: Observable<any[]>;
	id: any;
	//------------------------------
	selectedImage: File | null = null;
	downloadURL: String | null = null;

	constructor(
		private firebaseService: FirebaseService,
		public firestore: AngularFirestore,
		private storage: AngularFireStorage, 
		private dialog: MatDialog) {
			this.educacionCollection = this.firestore.collection<Ieducacion>('educacion');
			this.educacionItems = this.educacionCollection.valueChanges();
			this.dialogForm = new FormGroup({
				escuela: new FormControl('', Validators.required),
				titulo: new FormControl('', Validators.required),
				imagen: new FormControl('', Validators.required),
				carrera: new FormControl('', Validators.required),
				puntaje: new FormControl('', Validators.required),
				inicio: new FormControl('', Validators.required),
				fin: new FormControl('', Validators.required)
			});
			this.datosCollection = this.firestore.collection(this.nombreColeccion);
			this.datos = this.datosCollection.valueChanges();
			this.getDatosArray();
			this.getNumRegistros();
			this.verificarYCrearMiColeccion();
			console.log('DEBUG: Educacion -LN82-');
		}
	ngOnInit(): void {
			console.log('DEBUG: Educacion -LN85-', this.nombreColeccion);
			this.verificarYCrearMiColeccion();
			this.datosCollection = this.firestore.collection(this.nombreColeccion);
			this.datos = this.datosCollection.valueChanges();
			this.educacionCollection = this.firestore.collection<any>(this.nombreColeccion);
			this.educacion = this.educacionCollection.snapshotChanges().pipe(map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
			
		}

		selectEducacion(educacion: any) {
			console.log('LN94');
			this.selectedEducacion = { ...educacion };
			console.log({ ...educacion });
		}
		onFileSelected(event: any) {
			const file: File = event.target.files[0];
			if (file) {
				this.selectedImage = file;
					const filePath = `educacion/${this.selectedImage.name}`;
					const fileRef = this.storage.ref(filePath);
					const task = this.storage.upload(filePath, file);
	
					task.snapshotChanges()
						.pipe(
							finalize(() => {
								fileRef.getDownloadURL().subscribe(url => {
									this.downloadURL = url;
								});
							})
						)
						.subscribe();
			}
			this.selectedImage = file;
		}
	
	readDocument(documentId: string) {
		this.firestore.collection(this.nombreColeccion).doc(documentId).snapshotChanges().subscribe(snapshot => {
		  const data = snapshot.payload.data();
		  const id = snapshot.payload.id;
	  
		  // Utiliza el ID y los datos del documento como desees
		  console.log('ID:', id);
		  console.log('Datos:', data);
		});
	  }
	// private storage: AngularFireStorage,

	openAddDialog(): void {
		this.editMode = false;
		// const id1 = this.firestore.createId();

		this.dialogData = {
			// id: id1,
			escuela: '',
			titulo: '',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: 0,
			fin: 0
		};
		this.openDialog();
	}
	openEditDialog(item: Ieducacion): void {
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {
			const productName: any = this.downloadURL;
			this.dialogData.imagen = this.downloadURL ?? productName ;
		});
	}
	
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			const productName: any = this.downloadURL;
			const name: string = productName ?? this.downloadURL;
			this.dialogData.imagen = name;
			this.educacionCollection.doc(this.selectedEducacion.id).update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			const productName: any = this.downloadURL;
			this.dialogData.imagen = this.downloadURL ?? productName ;
			this.educacionCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		const dialogRef = this.dialog.open(ConfirmationDialogComponent);
		dialogRef.afterClosed().subscribe((result) => {
			if(result === 'confirm') {
				this.firebaseService.deleteRecord(this.nombreColeccion,item); 
			}
		});
	}



	verificarYCrearMiColeccion(): void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion, {
			escuela: 'Escuela',
			titulo: 'Titulo',
			imagen: '',
			carrera: '',
			puntaje: 100,
			inicio: 2000,
			fin: 2023
		});
	}

	getDatosArray(): void {
		this.datosCollection.snapshotChanges().pipe(
			map((snapshots) => {
				return snapshots.map((snapshot) => {
					const data = snapshot.payload.doc.data();
					const id = snapshot.payload.doc.id;
					return { id, ...data };
				});
			})
		).subscribe((array) => {
			this.datosArray = array;
			console.log('DEBUG EDUCACIÓN datosArray tipo:', typeof (this.datosArray), Object.entries(array));
			console.log('DEBUG EDUCACIÓN: getDatosArray', this.datosArray, ' length: ', this.datosArray.length);
		})
	}
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
		});
	}

}


function put(storageRef: any, file: any) {
	throw new Error('Function not implemented.');
}
/* @Component({
	selector: 'app-confirmation-dialog',
	template: `
	<h2>¿Está seguro de que desea eliminar?</h2>
	<button (click)="dialogRef.close('cancel')">Cancelar</button>
	<button (click)="dialogRef.close('confirm')">Eliminar</button>
	`,
})
export class ConfirmationDialogComponent {
	constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
} */