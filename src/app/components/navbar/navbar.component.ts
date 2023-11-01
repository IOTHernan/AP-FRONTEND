import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
/* import { Iaboutme } from 'src/app/interfaces/iaboutme';
 */@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
	usuarioLogueado!: boolean;
	userAlias!: any;
	imagenPerfil: Observable<string | null> | undefined;
	loginActive: Boolean = true;
	registerActive: Boolean = false;
	portfolioActive: Boolean = false;
	pageNotFoundActive: Boolean = false;
/* 	datosCollection2: AngularFirestoreCollection<any>;
 */	/* datos2!: Observable<Iaboutme[]>; */
	profilePicture!: any;
	datosArray2!: any[];
	nombreColeccion2 = 'aboutme';
	logopencil="./../../../assets/media/logoPencil.png";
	logoadd="./../../../assets/media/logoAdd.png";
	logoedu="./../../../assets/media/logoEdu.png";
	logosave="./../../../assets/media/logoSave.png";
	logocancel="./../../../assets/media/logoCancel.png";
	logodelete="./../../../assets/media/logoDelete.png";
	logoSkill = "./../../../assets/media/cheskills.jpg";
		constructor(
		private router: Router, 
		private afAuth: AngularFireAuth,
		private firestore: AngularFirestore) { 
			/* this.datosCollection2 = this.firestore.collection(this.nombreColeccion2);
			this.datos2 = this.datosCollection2.valueChanges();
		 */
		}

	ngOnInit(): void {
/* 		this.getDatosArray2();
 */		console.log("DEBUG: NATBAR, ruta activa -ln32-:", this.router.url);
		this.afAuth.onAuthStateChanged((user) => {
/* 			this.getDatosArray2();
 */
			if (user) {
				// this.imagenPerfil = this.firestore
				// 	.doc<any>(`users/${user.uid}`)
				// 	.valueChanges()
				// 	// .pipe( map( (userData) => userData?.profileImage));
				// 	.pipe(map((userData) => userData?.photoURL));
				// this.imagenPerfil = this.firestore
				// 	.doc().(`users/${user.uid}`)
				// 	.valueChanges()
				// 	// .pipe( map( (userData) => userData?.profileImage));
				// 	.pipe(map((userData) => userData?.photoURL));
				// this.userAlias = this.firestore
				// 	.doc<any>(`users/${user.uid}`)
				// 	.valueChanges()
				// 	// .pipe( map( (userData) => userData?.profileImage));
				// 	.pipe(map((userData) => userData?.displayName));
				this.usuarioLogueado = true;
				this.router.navigate(['/portfolio']);
				// alert('USUARIO LOGUEADO:' + this.usuarioLogueado + ' Alias: ' + this.userAlias);
			} else {
				this.usuarioLogueado=false;
				// this.imagenPerfil = undefined;
			}
		});
		switch(this.router.url) {
			case '/login': {
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
			case '/register': {
				this.loginActive = false;
				this.registerActive = true;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
			case '/portfolio': {
				this.loginActive = false;
				this.registerActive = false;
				this.portfolioActive = true;
				this.pageNotFoundActive = false;
				break;
			}
			default: {
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				break;
			}
		}
	}

	login() {
		this.router.navigate(['/login']);
		console.log('DEBUG: NATBAR -ln88-');
		
	}
	registrarse() {
		this.router.navigate(['/register']);
		console.log('DEBUG: NATBAR -ln93-');
	}
	logout() {
		this.afAuth.signOut()
			.then(() => {
				console.log('Cierre de sesión exitoso -ln95-');
				this.loginActive = true;
				this.registerActive = false;
				this.portfolioActive = false;
				this.pageNotFoundActive = false;
				this.router.navigate(['/login']);
				console.log('Ruta activa -ln100-:',this.router.url);
				
				this.usuarioLogueado = false;
				// this.userAlias = '';
			})
			.catch(error => console.error('Error al cerrar sesión', error));
	}
	/* getDatosArray2(): void {
		this.datosCollection2.snapshotChanges().pipe(
			map((snapshots) => {
				return snapshots.map((snapshot) => {
					const data = snapshot.payload.doc.data();
					const id = snapshot.payload.doc.id;
					return { id, ...data };
				});
			})
		).subscribe((array2) => {
			this.datosArray2 = array2;
			this.profilePicture = this.datosArray2[0].profilePicture;
			console.log('DEBUG: NATBAT getDatosArray2 -LN229-', this.datosArray2);
		})
	} */
}