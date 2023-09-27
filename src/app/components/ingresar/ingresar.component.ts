// import { Component, OnInit } from '@angular/core';
// import { FormGroup, NgForm, FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { FirebaseService } from 'src/app/services/firebase.service';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { Observable, map, take } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Component({
//   selector: 'app-ingresar',
//   templateUrl: './ingresar.component.html',
//   styleUrls: ['./ingresar.component.css']
// })

// export class IngresarComponent implements OnInit {
//   logopencil="https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
//   logoadd="https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
//   logoedu="https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu   ";
//   logosave="https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
//   logocancel="https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
//   logodelete="https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";

// 	form: FormGroup;
// 	usuario = { email: '', password: ''}
  	
//   constructor(private formBuilder: FormBuilder,private fb: NonNullableFormBuilder) { 
//  	this.form = this.formBuilder.group ({
// 	email: ['', [Validators.required, Validators.email] ] ,
// 	password: ['', Validators.required ],
// });
//   }
 
// ngSubmit() {
// 	console.log("email:", this.form.value.email);
// }
// ngOnInit(): void {
	
// }
// }
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { getAuth, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
// import { environment } from 'src/environments/environments';
// import firebase from '@firebase/app-compat';
// import { Router } from '@angular/router';
// import { HotToastService } from '@ngneat/hot-toast';
// import { AuthService } from './../../services/auth.service';
// import { ProfileUser } from 'src/app/models/user';
		// private readonly userDisposable: Subscription | undefined;
	// personaemail: 
	// auth2 = getAuth();
	// googleProvider = new GoogleAuthProvider();
	// users!: any[];
	// nombreColeccion = 'users';
	// datosColleccion!: AngularFirestoreCollection<any>;
	// datos!: Observable<ProfileUser[]>;
	// datosArray!: any[];
	// numRegistros!: number;
	// showLoginButton = true;
	// showLogoutButton = false;
	
	// constructor(
	// 	private firebaseService: FirebaseService,
	// 	private firestore: AngularFirestore,
		// private db: AngularFireDatabase,
		// public auth: AngularFireAuth,
		// private toast: HotToastService, 
		// private router: Router,
		// private authService: AuthService) 
		// {
			// console.log('DEBUG: Login constructor');
			
		// 	firestore.collection(this.nombreColeccion).valueChanges().subscribe(users=> {
		// 		this.users = users;
		// 		console.log(users);
				
		// 	})
		// }

		
		// public readonly auth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object) {
		// if (!isPlatformServer(platformId)) {
			// this.userDisposable = this.auth.authState.pipe(
				// trace('auth'),
				// map(u => !!u)
			// ).subscribe(isLoggedIn => {
				// this.showLoginButton = !isLoggedIn;
				// this.showLogoutButton = isLoggedIn;
			// });
		// }

		
		
		// ngOnInit() {
		// 	this.datosColleccion = this.firestore.collection(this.nombreColeccion);
		// 	this.datos = this.datosColleccion.valueChanges();
		// 	this.getDatosArray();
		// 	this.getNumRegistros();
	
		// 	this.auth.authState.subscribe(user => {
		// 	if(user){
		// 		console.log("user loggued", user);
		// 	} else {
		// 		console.log("Not user loggued");
		// 	}
		// });
		// }
		// getDatosArray(): void {
		// 	this.datosColleccion.snapshotChanges().pipe(
		// 		map((snapshots) => {
		// 			return snapshots.map((snapshot) => {
		// 				const data = snapshot.payload.doc.data();
		// 				const id = snapshot.payload.doc.id;
		// 				return { id, ...data };
		// 			});
		// 		})
		// 	).subscribe((array) => {
		// 		this.datosArray = array;
		// 		console.log('DEBUG: educacion getDatosArray', this.datosArray);
		// 	})
		// }
		// firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>.id: string
	// 	getNumRegistros(): void {
	// 		this.datosColleccion?.get().subscribe((snapshot) => {
	// 			this.numRegistros = snapshot.size;
	// 			console.log("REG:", this.numRegistros);
	// 		});
	// 	}
	// async login() {
	// 	const user = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	// 	// TODO sign into offline app
	// 	this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	// }

	// async loginAnonymously() {
	// 	const user = await this.auth.signInAnonymously();
	// 	// TODO sign into offline app
	// }

	// logout() {
	// 	this.auth.signOut();
	// 	// TODO sign out of offline app
	// }

	// personaemail() {
	// 	return this.firestore.collection("persona");
	// }

// 	get email() {
// 		return this.loginForm.get('email');
// 	}

// 	get password() {
// 		return this.loginForm.get('password');
// 	}

// 	async submit() {
// 		const { email, password } = this.loginForm.value;

// 		if (!this.loginForm.valid || !email || !password) {
// 			return;
// 		}

// 	}
// }


