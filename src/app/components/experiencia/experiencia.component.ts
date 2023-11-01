// -------------------------------- EXPERIENCIA.COMPONENT.TS --------------------------------------	
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iexperiencia } from 'src/app/interfaces/iexperiencia';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-experiencia',
	templateUrl: './experiencia.component.html',
	styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
	logopencil="./../../../assets/media/logoPencil.png";
	logoadd="./../../../assets/media/logoAdd.png";
	logoedu="./../../../assets/media/logoEdu.png";
	logosave="./../../../assets/media/logoSave.png";
	logocancel="./../../../assets/media/logoCancel.png";
	logodelete="./../../../assets/media/logoDelete.png";
	logoSkill = "./../../../assets/media/cheskills.jpg";
	nombreColeccion = 'experiencia';
	datosCollection!: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos!: Observable<Iexperiencia[]>;
	numRegistros!: number;

	editMode = false;
	dialogForm: FormGroup;
	experienciaCollection: AngularFirestoreCollection<Iexperiencia>;

	@ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
	experienciaItems: Observable<Iexperiencia[]>;
	selectedExperiencia: any = {};
	dialogData: Iexperiencia = {
		ubicacion: '',
		puesto: '',
		periodo: '',
		empresa: '',
		actividades: ''
	};

	constructor(private firebaseService: FirebaseService,
		public firestore: AngularFirestore,
		private dialog: MatDialog) {
		this.experienciaCollection = this.firestore.collection<Iexperiencia>('experiencia');
		this.experienciaItems = this.experienciaCollection.valueChanges();
		this.dialogForm = new FormGroup({
			ubicacion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			puesto: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			periodo: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			empresa: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			actividades: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
		});
		console.log('DEBUG: EXPERIENCIA');
	}

	ngOnInit(): void {
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
	}

	selectExperiencia(experiencia: any) {
		console.log('DEBUG SELECTEXPERIENCIA LN65');
		this.selectedExperiencia = { ...experiencia };
		console.log(this.selectedExperiencia);
	}
	openAddDialog(): void {
		this.editMode = false;
		this.dialogData = {
			ubicacion: '',
			puesto: '',
			periodo: '',
			empresa: '',
			actividades: ''
		};
		this.openDialog();
	}
	openEditDialog(item: Iexperiencia): void {
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
			this.experienciaCollection.doc(this.selectedExperiencia.id).update(this.dialogData);
			// this.experienciaCollection.update(this.dialogData);
		} else {
			// Añadir nuevo elemento
			this.experienciaCollection.add(this.dialogData);
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
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion,
			{
				ubicacion: '',
				puesto: '',
				periodo: '',
				empresa: '',
				actividades: ''
			});
	}

	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("REG:", this.numRegistros);
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
			console.log('DEBUG: getDatosArray', this.datosArray);
		})
	}

}