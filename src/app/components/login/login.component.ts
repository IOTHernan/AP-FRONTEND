import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
// import auth from 'firebase/compat/app';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	registerMode: boolean = false;

	constructor(
		private formBuilder: FormBuilder, 
		// private autenticacionService: AutenticacionService, 
		private router: Router,
		private firestore: AngularFirestore,
		private authService: AuthService,
		private auth: AngularFireAuth) {
		this.form = this.formBuilder.group({
			//email: ['', [Validators.required, Validators.email]],
			email: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		})
	}

	ngOnInit() {
		console.log('DEBUG: LOGIN -LN36-');
		console.log('DEBUG: LOGIN authGetAuth():', this.authService.authGetAuth());
		
	}

	//get Email(){
	//  return this.form.get('email');
	//}

	get email(): any {
		return this.form.get('email')
	}

	get password(): any {
		return this.form.get('password');
	}

	cheFormVistaPrevia() {
		console.log('Email:', this.email, 'Contraseña:', this.password);
	}
	loginAnonimo() {
		this.authService.authLoginAnonimo();
	}

	loginWithGoogle() {
		this.authService.authLoginWithGoogle();
	}
	loginWithGitHub() { 
		this.authService.authLoginWithGitHub();
	}
	deleteAccount() { 
		this.authService.authDeleteAccount();
	}

	onLogin(event: Event) {
		event.preventDefault;
		const { email, password } = this.form.value;
		console.log('DEBUG: Login - onLogin', this.form.value);
		console.log('Email:', this.email, ' Password:', this.password);
		this.authService.authLogin(email, password)
				.then((userCredential) => {
					console.log('Inicio de sesión exitoso, puedes redirigir al usuario a otra página');
					this.router.navigate(['/portfolio']);
				})
				.catch((error) => {
					console.log('Error de inicio');
					console.error('Error de inicio de sesión:', error);
					// Error en el inicio de sesión, muestra el mensaje de error al usuario
				});

		// this.autenticacionService.login(this.form.value).subscribe(data => {
		// 	console.log("Archivo Login Component , seteo del token: ", data.token);
		// 	sessionStorage.setItem('token', data.token);
		// 	this.autenticacionService.setToken(data.token);
		// 	this.router.navigate(['/portfolio']);
		// });
	}
} 