import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, take } from 'rxjs';
import { Isoftskills } from 'src/app/interfaces/isoftskills';
import { finalize } from 'rxjs/operators';
// import { AngularFireUploadTask } from '@angular/fire/compat/storage';
// import { percentage } from '@angular/fire/storage/public_api';
// import { user } from '@angular/fire/auth';
// import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';
@Component({
	selector: 'app-softskills',
	templateUrl: './softskills.component.html',
	styleUrls: ['./softskills.component.css']
})

export class SoftskillsComponent implements OnInit {
	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";

	color = 'primary';
	xmode = 'determinate';
	// autoTicks = true;
	// disabled = false;
	max = 100;
	min = 0;
	// showTicks = true;
	step = 1;
	// thumbLabel = true;
	// value = 0;
	
	// private _tickInterval = 1;

	// task!: AngularFireUploadTask;
	// percentage!: Observable<number | undefined>;


	datos: Observable<Isoftskills[]>;
	datosArray!: any[];
	datosCollection!: AngularFirestoreCollection<any>;
	dialogForm: FormGroup;
	dialogData: Isoftskills = {
		name: '',
		urlImage: '',
		level: 0
	};
	dialogItem: any;
	downloadURL: String | null = null;
	editMode = false;
	
	isEditing: boolean = false;
	items!: any[];
	nombreColeccion = 'softskills';
	numRegistros!: number;
	
	selectedImage: File | null = null;
	selectedsoftSkill: any = {};
	softskills!: Observable<any[]>;
	softskillsCollection: AngularFirestoreCollection<Isoftskills>;
	softskillsItems: Observable<Isoftskills[]>;
	value: Number = 30;
	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	
	constructor(private firebaseService: FirebaseService,
		private firestore: AngularFirestore,
		private dialog: MatDialog,
		private storage: AngularFireStorage) {

		this.softskillsCollection = this.firestore.collection<Isoftskills>(this.nombreColeccion);
		this.softskillsItems = this.softskillsCollection.valueChanges();
		this.dialogForm = new FormGroup({
			name: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			urlImage: new FormControl([''], [Validators.required, Validators.minLength(2)]),
			level: new FormControl([0, [Validators.required]])
		});

		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: SOFTSKILLS LN86');
	}

	ngOnInit(): void {
		console.log('DEBUG: SOFTSKILLS COMPONENTS LN86');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.softskillsCollection = this.firestore.collection<any>(this.nombreColeccion);
		this.softskills = this.softskillsCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => 
				({ id: a.payload.doc.id, ...a.payload.doc.data() })))
				);
		this.getDatosArray();
		this.getNumRegistros();
	}

	selectsoftSkill(softskill: any) {
		console.log('DEBUG: SELECTSOFTSKILL LN89');
		this.selectedsoftSkill = { ...softskill };
		console.log(this.selectedsoftSkill);
		this.selectedImage = null;
	}
	
	// get tickInterval(): number | 'auto' {
	// 	return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
	// }
	// set tickInterval(value) {
	// 	this._tickInterval = coerceNumberProperty(this.dialogData.level);
	// }
	readDocument(documentId: string) {
		this.firestore.collection('softskills').doc(documentId).snapshotChanges().subscribe(snapshot => {
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
			name: '',
			urlImage: '',
			level: 0
		};
		this.openDialog();
	}
	openEditDialog(item: Isoftskills): void {
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {
			
			// this.value = this.dialogData.level;
		});
	}
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			// const productName: any = this.downloadURL;
			// const name: string = productName ?? this.downloadURL;
			// this.dialogData.urlImage = name;
			this.softskillsCollection.doc(this.selectedsoftSkill.id).update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			// const productName: any = this.downloadURL;
			// this.dialogData.urlImage = this.downloadURL ?? productName ;
			this.softskillsCollection.add(this.dialogData);
		}
		// Cerrar el diálogo después de guardar
		this.dialog.closeAll();
	}
	savesoftSkill() {
		if (this.selectedsoftSkill.id) {
			this.softskillsCollection.doc(this.selectedsoftSkill.id).update(this.selectedsoftSkill);
		} else {
			const softskillData = { ...this.selectedsoftSkill };

			if (this.selectedImage) {
				const filePath = 'softskills/';
				const fileRef = this.storage.ref(filePath);
				const task = this.storage.upload(filePath, this.selectedImage);

				task.snapshotChanges().subscribe(() => {
					fileRef.getDownloadURL().subscribe(url => {
						softskillData.urlImagen = url;
						this.softskillsCollection.add(softskillData);
						this.selectedsoftSkill = {};
						this.selectedImage = null;
					});
				});
			} else {
				this.softskillsCollection.add(softskillData);
				this.selectedsoftSkill = {};
			}
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
		});	}


	/* **************************************************************************************************** */
	verificarYCrearMiColeccion(): void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion,
			{
				name: 'Name',
				urlImage: '',
				level: 89
			});
	}
	/* **************************************************************************************************** */
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
	/* **************************************************************************************************** */
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
			console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}
	/* **************************************************************************************************** */
	

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.selectedImage = file;
			const filePath = `softskills/${this.selectedImage.name}`;
			const fileRef = this.storage.ref(filePath);
			const task = this.storage.upload(filePath, file);

			task.snapshotChanges()
				.pipe(
					finalize(() => {
						fileRef.getDownloadURL().subscribe(url => {
							this.downloadURL = url;
							const productName: any = this.downloadURL;
							const name: string = productName ?? this.downloadURL;
							this.dialogData.urlImage = name;
						});
					})
				)
				.subscribe();
		}
		this.selectedImage = file;
	}

	// uploadImageToFirebase = (file: File): Promise<string> => {
	// 	return new Promise((resolve, reject) => {
	// 		// Crea una referencia al almacenamiento de Firebase
	// 		const storageRef = this.storage.ref('softskills/');
	// 		// Genera un nombre de archivo único para evitar colisiones
	// 		const fileName = `${Date.now()}_${file.name}`;
	// 		// Crea una referencia al archivo en el almacenamiento
	// 		const fileRef = storageRef.child(fileName);
	// 		// Sube el archivo al almacenamiento
	// 		const uploadTask = fileRef.put(file);
	// 		// Escucha los eventos de estado de la carga
			
	// 			// const file = target.files[0];
	// 			const path = 'test/' + file.name;
	// 			const ref = this.storage.ref(path);
	// 			this.task = ref.put(file);
	// 			// this.percentage = this.task.percentageChanges();
			  			
	// 	});
	// };
	// upload(name: File) {
	// 	const file = name; // Aquí debes colocar el archivo que deseas subir
	// 	const filePath = `gs://ap-frontend-ac93a.appspot.com/softskills/${file.name}`;
	// 	// const fileRef = this.storage.ref(filePath);
	// 	const task = this.storage.upload(filePath, file);

	// 	// const storageRef = this.storage.ref();
	// 	const fileRef = this.storage.upload('images/' , file.name);
	// 	// fileRef.put(file).then((snapshot) => {
	//   	console.log('Imagen subida correctamente');
	// 	// });
	// }
	// inputfile() {
	// 	// Ejemplo de uso
	// 	const inputFile = document.getElementById('inputFile') as HTMLInputElement;
	// 	let myVariable: String = this.dialogData.urlImage; // Variable para guardar el valor del almacenamiento

	// 	inputFile.addEventListener('change', async () => {
	// 		const selectedFile = inputFile;

	// 		try {
	// 			const downloadURL = await this.uploadImageToFirebase(this.dialogItem.urlImage);
	// 			myVariable = downloadURL; // Guarda el valor del almacenamiento en la variable
	// 			console.log('URL de descarga:', downloadURL);
	// 		} catch (error) {
	// 			console.error('Error al cargar la imagen:', error);
	// 		}
	// 	});
	// }
}

