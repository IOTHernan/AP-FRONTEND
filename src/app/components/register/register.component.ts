import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iusers } from 'src/app/interfaces/iuser';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable, map } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import * as firebase from 'firebase/compat';
// import { AutenticacionService } from 'src/app/services/autenticacion.service';
// import { UsersService } from 'src/app/services/users.service';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	nombreColeccion = 'users';
	usersCollection: AngularFirestoreCollection<Iusers>;
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	numRegistros!: number;
	editMode = false;
	datos: Observable<Iusers[]>;
	form: FormGroup;
	users!: Observable<any[]>;
	// user = FirebaseService.auth().currentUser;private autenticacionService: AutenticacionService,
	usersItems: Observable<Iusers[]>;

	//------------------------------
	selectedUsers: any = {};
	selectedImage: File | null = null;
	downloadURL: String | null = null;
	dialogItem: any;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private firestore: AngularFirestore,
		private storage: AngularFireStorage,
		private afAuth: AngularFireAuth,
		private router: Router,
		private firebaseService: FirebaseService/* , Validators.email */) {
		this.usersCollection = this.firestore.collection<Iusers>(this.nombreColeccion);
		this.usersItems = this.usersCollection.valueChanges();
		this.form = this.formBuilder.group({
			id: [''],
			email: ['' , [Validators.required, Validators.minLength(8)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			firstName: ['' , [Validators.required, Validators.minLength(2)]],
			lastName: ['' , [Validators.required, Validators.minLength(2)]],
			displayName: ['' , [Validators.required, Validators.minLength(2)]],
			phone: ['', [Validators.required, Validators.minLength(2)]],
			address: ['' , [Validators.required, Validators.minLength(2)]],
			photoURL: ['' , [Validators.required, Validators.minLength(2)]]
		});
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.verificarYCrearMiColeccion();
		console.log('DEBUG: REGISTER -LN69-');
	}

	ngOnInit(): void {
		console.log('DEBUG: REGISTER -LN69-');
		// this.otraFunción();
		this.verificarYCrearMiColeccion();
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.usersCollection = this.firestore.collection<any>(this.nombreColeccion);
		// this.users = this.usersCollection.snapshotChanges().pipe(map(actions => actions.map(a => 			({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
		this.getDatosArray();
		this.getNumRegistros();
	}

	get email(): any {
		return this.form.get('email');
	}

		get firstName(): any {
		return this.form.get('firstName');
	}

		get lastName(): any {
		return this.form.get('lastName');
	}

		get displayName(): any {
		return this.form.get('displayName');
	}
		get phone(): any {
		return this.form.get('phone');
	}
		get address(): any {
		return this.form.get('address');
	}
		get photoURL(): any {
		return this.form.get('photoURL');
	}
		get password(): any {
		return this.form.get('password');
	}
	
	verificarYCrearMiColeccion(): void {
		this.firebaseService.verificarYCrearColeccion(this.nombreColeccion,
			{
				id: '', email: '', password: '', firstName: '', lastName: '', displayName: '',
				phone: '', address: '', photoURL: ''
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
			console.log('DEBUG: REGISTER getDatosArray -LN99-', this.datosArray);
		})
	}

	getNumRegistros(): void {
		this.datosCollection?.get().subscribe((snapshot) => {
			this.numRegistros = snapshot.size;
			console.log("DEBUG REGISTER REG -LN106-:", this.numRegistros);
		});
	}

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.selectedImage = file;
			const filePath = `users/${this.selectedImage.name}`;
			const fileRef = this.storage.ref(filePath);
			const task = this.storage.upload(filePath, file);

			task.snapshotChanges()
				.pipe(
					finalize(() => {
						fileRef.getDownloadURL().subscribe(url => {
							this.downloadURL = url;
							console.log('DEBUG REGISTER ON FILE SELECTED -LN123-:', this.downloadURL);
						});
					})
				)
				.subscribe();
		}
		this.selectedImage = file;
	}

	saveItem(): void {
		console.log('DEBUG REGISTER SAVE ITEM edit mode:', this.editMode);

		if (this.editMode) {
			// Guardar cambios
			const productName: any = this.downloadURL;
			const name: string = productName ?? this.downloadURL;
			// this.photoURL = name;
			this.usersCollection.doc().update(this.form.value);
		} else {
			// Añadir nuevo elemento
			const productName: any = this.downloadURL;
			// this.photoURL = this.downloadURL ?? productName ;
			this.afAuth.createUserWithEmailAndPassword(this.email(), this.password())
				.catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode == 'auth/weak-password') {
						alert('The password is too weak.');
					} else {
						alert(errorMessage);
					}
					console.log(error);
				});
			this.usersCollection.add(this.form.value);
			// this.register();
		}
		// Cerrar el diálogo después de guardar
	}

	register() 
	{
		console.log('DEBUG: REGISTER -LN166-');
		const { email, firstName, lastName, displayName, phone, address, photoURL, password } = this.form.value;
		const user = this.authService.authCreateUserWithEmailAndPassword(email, password);

		if (user) 
		{
			const userId = user.uid;
			if (userId) 
			{
				// const userId = firebase.auth().user.uid;
				const id1 = this.firestore.createId();
				this.firestore.collection(this.nombreColeccion).doc(id1).set(
					{
					id: userId,
					email: this.email,
					password: this.password,
					firstName: this.firstName,
					lastName: this.lastName,
					displayName: this.displayName,
					phone: this.phone,
					address: this.address,
					// photoURL: this.photoURL
					photoURL: this.downloadURL
				})
					.then(() => 
					{
						// Registro exitoso, puedes redirigir al usuario a otra página
						console.log('Registro exitoso, puedes redirigir al usuario a otra página');
						// this.router.navigate(['/portfolio']);
						this.router.navigate(['/login']);
					})
					.catch(error => 
						{
						// Error al guardar los datos del usuario, muestra el mensaje de error al usuario
						console.error('Error al guardar los datos del usuario, muestra el mensaje de error al usuario',error);
					});
			}
		}
	}
			// .catch((error: any) => {
		// console.error('Error en el registro, muestra el mensaje de error al usuario', error);
		// Error en el registro, muestra el mensaje de error al usuario
		// });
	// }

	cerrarFormulario() {
		this.router.navigate(['/login']);
	}

	onRegister(event: Event) {
		event.preventDefault;
		console.log('DEBUG REGISTER ON REGISTER -LN231-');

		this.register();
		// this.firebaseService.agregarRegistros(this.form.value);
	}
}

