import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, take } from 'rxjs';
import { Iproyecto } from 'src/app/interfaces/iproyecto';
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	nombreColeccion = 'proyecto';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Iproyecto[]>;
	numRegistros!: number;
	editMode = false;
	dialogForm: FormGroup;
	proyectoCollection: AngularFirestoreCollection<Iproyecto>;
	proyecto!: Observable<any[]>;

	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	proyectoItems: Observable<Iproyecto[]>;

	dialogData: Iproyecto = {
		descripcion: '',
		imagen: '',
		titulo: ''
	}
	//------------------------------
	selectedProyecto: any = {};
	selectedImage: File | null = null;
	downloadURL: String | null = null;
	dialogItem: any;
	onFile: String | null = null;
	constructor(
		public firestore: AngularFirestore,
		private firebaseService: FirebaseService,
		private storage: AngularFireStorage,
		private dialog: MatDialog) {
		this.proyectoCollection = this.firestore.collection<Iproyecto>(this.nombreColeccion);
		this.proyectoItems = this.proyectoCollection.valueChanges();
		this.dialogForm = new FormGroup({
			descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			titulo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		});
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: PROYECTO: -LN56-');
	}
	ngOnInit(): void {
		console.log('DEBUG: PROYECTO: NGONINIT -LN78-');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.proyectoCollection = this.firestore.collection<any>(this.nombreColeccion);
		this.proyecto = this.proyectoCollection.snapshotChanges().pipe(map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
		this.getDatosArray();
		this.getNumRegistros();
	}
	
	selectProyecto(proyecto: any) {
		console.log('DEBUG: SELECTPROYECTO -LN87-');
		this.selectedProyecto = { ...proyecto };
		console.log(this.selectedProyecto);
		this.selectedImage = null;
	}

	verificarYCrearMiColeccion(): void {
		const nombreColeccion = 'proyecto';
		this.firebaseService.verificarYCrearColeccion(nombreColeccion,
			{
				titulo: '',
				imagen: '',
				descripcion: ''
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
			console.log('DEBUG: getDatosArray -LN107-', this.datosArray);
		})
	}
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.selectedImage = file;
			const filePath = `proyecto/${this.selectedImage.name}`;
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
		const productName: any = this.downloadURL;
		this.dialogData.imagen = this.downloadURL ?? productName;
		console.log('DEBUG PROYECTOS:', productName, '---', this.dialogData.imagen);

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
	openAddDialog(): void {
		this.editMode = false;
		this.dialogData = {
			titulo: '',
			imagen: '',
			descripcion: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Iproyecto): void {
		// this.readDocument(this.selectedProyecto.id);
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {

		});
	}
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			// const productName: any = this.downloadURL;
			// const name: string = productName ?? this.downloadURL;
			// this.dialogData.imagen = name;
			this.proyectoCollection.doc(this.selectedProyecto.id).update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			// const productName: any = this.downloadURL;
			// this.dialogData.imagen = this.downloadURL ?? productName ;
			this.proyectoCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	deleteItem(item: any): void {
		// Eliminar el elemento de la colección en Firebase
		const dialogRef = this.dialog.open(ConfirmationDialogComponent);
		dialogRef.afterClosed().subscribe((result) => {
			if (result === 'confirm') {
				this.firebaseService.deleteRecord(this.nombreColeccion, item);
			}
		});
	}

}
