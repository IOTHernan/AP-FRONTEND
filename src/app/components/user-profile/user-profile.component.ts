import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Users } from '../../interfaces/iuser';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/compat';
import { getAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userForm!: FormGroup;
	cuser = getAuth().currentUser;
	cuserProfile: any;
	cuid: any = '';
	cdisplayName: any = '';
	cemail: any = '';
	cemailVerified: any = '';
	cphotoURL: any = '';
	cisAnonymous: any = '';
	cproviderData: any = '';
	cproviderId: any = '';
	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private authService: AuthService,
		private afAuth: AngularFireAuth) {

	}
	ngOnInit() {
		console.log('DEBUG: User-Profile');
		this.observador();
		this.authService.getCurrentUser().subscribe(user => {
			if (user) {
				this.authService.getUserFromFirestore(user.uid).subscribe(userData => {
					this.cuser = userData;
					console.log('USER Data:', userData);
					this.cuid = user.uid;
					console.log(this.cuid);
					this.cdisplayName = user.displayName;
					console.log(this.cdisplayName);
					this.cemail = user.email;
					console.log(this.cemail);
					this.cemailVerified = user.emailVerified;
					console.log(this.cemailVerified);
					this.cphotoURL = user.photoURL;
					console.log(this.cphotoURL);
					this.cisAnonymous = user.isAnonymous;
					console.log(this.cisAnonymous);
					this.cproviderData = user.providerData;
					console.log(this.cproviderData);
					// ...
					this.authGetUserProfile();
				});
			}
		});
		this.initializeForm();
	}

	initializeForm() {
		this.userForm = this.formBuilder.group({
			uid: [''],
			email: ['', [Validators.required, Validators.email]],
			firstName: [''],
			lastName: [''],
			displayName: [''],
			phone: ['', Validators.pattern('[0-9]{10}')],
			address: [''],
			photoURL: ['', Validators.pattern('(https?://.*.(?:png|jpg|jpeg))')]
		});
	}

	onSubmit() {
		if (this.userForm.valid) {
			// Realiza la acción correspondiente (guardar o actualizar usuario)
			console.log(this.userForm.value);
			this.snackBar.open('Usuario guardado correctamente', 'Cerrar', {
				duration: 2000
			});
		} else {
			this.snackBar.open('Por favor, completa correctamente los campos', 'Cerrar', {
				duration: 2000
			});
		}
	}

	resetForm() {
		this.userForm.reset();
	}

	recoverPassword() {
		// Implementa aquí la lógica para recuperar contraseña
		this.snackBar.open('Se ha enviado un correo electrónico de recuperación', 'Cerrar', {
			duration: 2000
		});
	}

	observador() {
		// [START auth_state_listener]
		this.afAuth.onAuthStateChanged((cuser) => {
			if (cuser) {
				console.log("Existe usuario activo");
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				this.cuserProfile = this.authGetUserProfile();
				console.log(this.cuserProfile);

				this.cproviderId = cuser.providerId;
				console.log(this.cproviderId);
				this.cuid = cuser.uid;
				console.log(this.cuid);
				this.cdisplayName = cuser.displayName;
				console.log(this.cdisplayName);
				this.cemail = cuser.email;
				console.log(this.cemail);
				this.cemailVerified = cuser.emailVerified;
				console.log(this.cemailVerified);
				this.cphotoURL = cuser.photoURL;
				console.log(this.cphotoURL);
				this.cisAnonymous = cuser.isAnonymous;
				console.log(this.cisAnonymous);
				this.cproviderData = cuser.providerData;
				console.log(this.cproviderData);
				// ...
			} else {
				// User is signed out
				// ...
				console.log("No existe usuario activo");
			}
		});
		// [END auth_state_listener]
	}

	authGetUserProfile() {
		const auth = getAuth();
		// const user = auth.currentUser;

		if (this.cuser !== null) {
			this.cuser.providerData.forEach((cprofile) => {
				this.cuid = cprofile.uid;
				this.cdisplayName = cprofile.displayName;
				this.cemail = cprofile.email;
				// this.emailVerified = profile.emailVerified;
				this.cphotoURL = cprofile.photoURL;
				// this.isAnonymous = profile.isAnonymous;
				this.cproviderId = cprofile.providerId;
				console.log("Sign-in provider: " + cprofile.providerId);
				console.log("  Provider-specific UID: " + cprofile.uid);
				console.log("  Name: " + cprofile.displayName);
				console.log("  Email: " + cprofile.email);
				console.log("  Photo URL: " + cprofile.photoURL);
			});
		}
	}
}
	/* listAllUser() {
		const listAllUsers = (nextPageToken) => {
			// List batch of users, 1000 at a time.
			getAuth()
			  .listUsers(1000, nextPageToken)
			  .then((listUsersResult) => {
				listUsersResult.users.forEach((userRecord) => {
				  console.log('user', userRecord.toJSON());
				});
				if (listUsersResult.pageToken) {
				  // List next batch of users.
				  listAllUsers(listUsersResult.pageToken);
				}
			  })
			  .catch((error) => {
				console.log('Error listing users:', error);
			  });
		  };
		  // Start listing users from the beginning, 1000 at a time.
		  listAllUsers();
	} */
	// getDatosArray(): void {
	// 	this.datosCollection.snapshotChanges().pipe(
	// 		map((snapshots) => {
	// 			return snapshots.map((snapshot) => {
	// 				const data = snapshot.payload.doc.data();
	// 				const id = snapshot.payload.doc.id;
	// 				return { id, ...data };
	// 			});
	// 		})
	// 	).subscribe((array) => {
	// 		this.datosArray = array;
	// 		console.log('DEBUG: getDatosArray', this.datosArray);
	// 	})
	// }

	// NOTE!: the updates are performed on the reference not the query await fakeStock.add({ name: 'FAKE', price: 0.01 });

	// Subscribe to changes as snapshots. This provides you data updates as well as delta updates. fakeStock.valueChanges().subscribe(value => console.log(value));    
	// get(): Observable<Ipersona[]> { 
	// return this.personaCollection.valueChanges(); 
	// return this.personaCollection;


	/* 
		getPersona(nombres: string) {
			this.firestore.docData(`persona/${id}`)
		} */
// ----------------------------------------------------------------------------
/* export Interface UserProfile {
	username: string;
} */

/* Reading data
In Cloud Firestore data is stored in documents and documents are stored in collections.
The path to data follows <collection_name>/<document_id> and continues if there are subcollections.
For example, "users/ABC1245/posts/XYZ6789" represents:

users collection
document id ABC12345
posts collection
document id XYZ6789
Let's explore reading data in Angular using the collection and collectionData functions. */