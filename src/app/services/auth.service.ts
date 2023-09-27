import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import auth from 'firebase/compat/app';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
// import { getAuth } from '@angular/fire/auth/firebase';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { Iusers } from '../interfaces/iuser';
import { getAuth, signInAnonymously, 
	onAuthStateChanged, createUserWithEmailAndPassword,
	signInWithEmailAndPassword, linkWithCredential } from "firebase/auth";


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	//   user$!: Observable<firebase.User> | null;
	user: Observable<User | null>; // Variable para almacenar el usuario actual

	isLoggedIn$: Observable<string>;
	constructor(
		private firestore: AngularFirestore, 
		private afAuth: AngularFireAuth, 
		private router: Router) {
		this.user = this.afAuth.authState;
		this.isLoggedIn$ = this.getUserId();
	}
	// Método para verificar si el usuario está autenticado
	isAuthenticated(): Observable<boolean> {
		return this.user.pipe(
			map(user => !!user)
		);
	}

	// Método para obtener el ID del usuario actual
	getUserId(): Observable<string> {
		return this.user.pipe(
			map(user => user ? user.uid : '')
		);
	}
	authGetAuth() {
		const auth = getAuth();
		return auth;
	}

	// auth_anon_sig_in.js
	authLoginAnonimo() {
		const auth = getAuth();
		signInAnonymously(auth)
  		.then(() => {
			console.log('DEBUG LOGIN ANONIMO', auth);
			
    		// Signed in..
  		})
  		.catch((error) => {
    		const errorCode = error.code;
    		const errorMessage = error.message;
    		// ...
  		});
	}

	// auth_signup_password.js
	async createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
		try {
			const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
			return userCredential;
		} catch (error) {
		  throw error; // Puedes manejar el error aquí o simplemente dejar que se propague hacia arriba
		}
	  }
	authCreateUserWithEmailAndPassword(email: any, password: any): any {
		this.createUserWithEmailAndPassword(email, password) 
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				return userCredential;
				// . . . 
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	}


	// auth_state_listener.js
	authAuthStateCambiado() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
    			// https://firebase.google.com/docs/reference/js/auth.user
    			const uid = user.uid;
    			// ...
  			} else {
    			// User is signed out
    			// ...
  			}
		});
	}
	
	// auth_anonymous_link.js
/* 	authLinkAnonimo() {
		const auth = getAuth();
		linkWithCredential(auth.currentUser, credential)
  			.then((usercred) => {
    			const user = usercred.user;
    			console.log("Anonymous account successfully upgraded", user);
  			}).catch((error) => {
    			console.log("Error upgrading anonymous account", error);
  		});
	} */
	async signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
		try {
		  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
		  return userCredential;
		} catch (error) {
		  throw error; // Puedes manejar el error aquí o simplemente dejar que se propague hacia arriba
		}
	  }
	// Método para iniciar sesión : Promise<User>
	// email.js
	async authLogin(email: string, password: string) {
		console.log('DEBUG: AUTHSERVICE: LOGIN:',email,password);
		this.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log('TypeOf de user credential:', typeof(userCredential));
				const user = userCredential;
				if (user) {
					return userCredential;
				} else {
					throw new Error('No se pudo obtener el usuario');
				}
			})
			.catch((error) => {
				// Hande Error here.
				let errorCode = error.code;
				let errorMessage = error.message;
				if (errorCode === 'auth/wrong-password') {
					console.log('Error password');
				} else {
					console.log(errorMessage);
				}
				// console.log(error);
			});
	}

// 	firebase.auth().signInWithEmailAndPassword(email, password)
//     .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//     alert('Wrong password.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
// });

	authLoginWithGitHub() {
		const provider = new GithubAuthProvider(); /* new auth.GithubAuthProvider() */
		this.afAuth.signInWithPopup(provider)
			.then(userCredential => {
				this.router.navigate(['/portfolio']);
				// Inicio de sesión exitoso con GitHub, puedes redirigir al usuario a otra página
			})
			.catch(error => {
				// Error en el inicio de sesión con GitHub, muestra el mensaje de error al usuario
			});
	}

	authLogout() {
		console.log('DEBUG: AUTHSERVICE LOGOUT -LN65-');

		return this.afAuth.signOut();
	}

	authLoginWithGoogle() {
		const provider = new GoogleAuthProvider();
		return this.afAuth.signInWithPopup(provider);
	}

	resetPassword(email: string) {
		return this.afAuth.sendPasswordResetEmail(email);
	}

	register(email: string, password: string) {
		return this.afAuth.createUserWithEmailAndPassword(email, password);
	}
	authDeleteAccount() {
		const user = this.afAuth.currentUser;
		if (user) {
			user.then(currentUser => {
				if (currentUser) {
					currentUser.delete()
						.then(() => {
							// Cuenta eliminada correctamente
							console.log('Cuenta eliminada correctamente');
							
						})
						.catch(error => {
							// Error al eliminar la cuenta, muestra el mensaje de error al usuario
							console.log('Error al eliminar la cuenta, muestra el mensaje de error al usuario');
							console.error('Error:',error);
							
						});
				}
			});
		}

	}
	isLoggedIn() {
		return firebase.auth().currentUser !== null;
	}
	/*  initializeAuthState() {
	   this.afAuth.setPersistence(auth.Auth.Persistence.LOCAL)
		 .then(() => console.log('Persistencia local habilitada'))
		 .catch(error => console.log('Error al habilitar la persistencia local:', error));
	 } */
	
		createUserInFirestore(user: firebase.User): Promise<void> {
			const userRef = this.firestore.collection('users').doc(user.uid);
			return userRef.set({
				uid: user.uid,
				email: user.email,
			});
		}

	getUserFromFirestore(uid: string): Observable<any> {
		const userRef = this.firestore.collection('users').doc(uid);
		console.log(userRef);

		return userRef.valueChanges();
	}

	getCurrentUser() {
		return this.afAuth.user;
	}


}
