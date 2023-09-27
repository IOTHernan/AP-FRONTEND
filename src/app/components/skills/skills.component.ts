import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl,  FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, take } from 'rxjs';
import { Iskills } from 'src/app/interfaces/iskills';
import { user } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
	logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
	logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	logoSkill = "https://drive.google.com/uc?export=download&id=1XApdWSnN7YZC0Y5B0IybEyefUZ10wTuu";
	datos: Observable<Iskills[]>;
	datosArray!: any[];
	datosCollection!: AngularFirestoreCollection<any>;
	dialogForm: FormGroup;
	dialogData: Iskills = {
		descripcion: '',
		urlImagen:''
	};

	downloadURL: String | null = null;
	editMode = false;

	isEditing: boolean = false;
	items!: any[];
	nombreColeccion = 'skills';
	numRegistros!: number;

	selectedImage: File | null = null;
	skillsCollection: AngularFirestoreCollection<any>;
	skillsItems: Observable<Iskills[]>;
	

	mySkills: any;
	modoEdicion: boolean = false;
	modoNuevoRegistro: boolean = false;
	i!: number;
	editID!: number;
	//------------------------------
	skills!: Observable<any[]>;
	selectedSkill: any = {};
	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

	constructor(
		private firebaseService: FirebaseService, 
		private firestore: AngularFirestore,
		private storage: AngularFireStorage, 
		private dialog: MatDialog) {
			this.skillsCollection = this.firestore.collection<Iskills>(this.nombreColeccion);
			this.skillsItems = this.skillsCollection.valueChanges();
			this.dialogForm = new FormGroup({
				descripcion: new FormControl('', Validators.required),
				urlImagen: new FormControl('', Validators.required)
			});
			this.datosCollection = this.firestore.collection(this.nombreColeccion);
			this.datos = this.datosCollection.valueChanges();
			this.getDatosArray();
			this.getNumRegistros();
			this.verificarYCrearMiColeccion();
			console.log('DEBUG: Skills -LN70-');
		 }

	ngOnInit():void {
		console.log('DEBUG: SKILLS COMPONENTS -LN74-');
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.skillsCollection = this.firestore.collection<any>(this.nombreColeccion);
		this.skills = this.skillsCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => 
				({ id: a.payload.doc.id, ...a.payload.doc.data() })))
		);
	}

	selectSkill(skill: any) {
		console.log('DEBUG: SELECTSKILL -LN86-');
		this.selectedSkill = { ...skill };
		console.log(this.selectedSkill);
		this.selectedImage = null;
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.selectedImage = file;
				const filePath = `skills/${this.selectedImage.name}`;
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

	saveSkill() {
		if (this.selectedSkill.id) {
			// let skillData = { ...this.selectedSkill };
			this.skillsCollection.doc(this.selectedSkill.id).update(this.selectedSkill);
		} else {
			const skillData = { ...this.selectedSkill };
			
			if (this.selectedImage) {
				const filePath = 'skills/';
				const fileRef = this.storage.ref(filePath);
				const task = this.storage.upload(filePath, this.selectedImage);
				
				task.snapshotChanges().subscribe(() => {
					fileRef.getDownloadURL().subscribe(url => {
						skillData.urlImagen = url;
						this.skillsCollection.add(skillData);
						this.selectedSkill = {};
						this.selectedImage = null;
					});
				});
			} else {
				// this.skillData.urlImagen=this.selectedImage;
				this.skillsCollection.add(skillData);
				this.selectedSkill = {};
			}
		}
	}

	readDocument(documentId: string) {
		this.firestore.collection('skills').doc(documentId).snapshotChanges().subscribe(snapshot => {
		  const data = snapshot.payload.data();
		  const id = snapshot.payload.id;
	  
		  // Utiliza el ID y los datos del documento como desees
		  console.log('ID:', id);
		  console.log('Datos:', data);
		});
	  }

	  openAddDialog(): void {
		this.editMode = false;
		// const id1 = this.firestore.createId();

		this.dialogData = {
			// id: id1,
			descripcion: '',
			urlImagen: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Iskills): void {
		this.editMode = true;
		this.dialogData = { ...item };
		this.openDialog();
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(this.dialogTemplate);
		dialogRef.afterClosed().subscribe(() => {
			// this.dialogData.urlImagen = this.downloadURL;
		});
	}
	saveItem(): void {
		if (this.editMode) {
			// Guardar cambios
			const productName: any = this.downloadURL;
			const name: string = productName ?? this.downloadURL;
			this.dialogData.urlImagen = name;
			this.skillsCollection.doc(this.selectedSkill.id).update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			const productName: any = this.downloadURL;
			this.dialogData.urlImagen = this.downloadURL ?? productName ;
			this.skillsCollection.add(this.dialogData);
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


	
	verificarYCrearMiColeccion(): void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion,
		{
			descripcion: '',
			urlImagen: ''
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
			console.log('DEBUG Skills: getDatosArray', this.datosArray);
		})
	}
	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
		});
	}
}
