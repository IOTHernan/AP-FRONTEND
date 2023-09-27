import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { PortfolioService } from 'src/app/services/portfolio.service';
// import { FirestoreService } from 'src/app/services/firestore.service';
import { Ipersona } from 'src/app/interfaces/ipersona';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Iaboutme } from 'src/app/interfaces/iaboutme';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

interface MiDocumento {
	miArray: string[];
  }

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

	logopencil = "https://drive.google.com/uc?export=download&id=1jA2K7nPYax0JVefFmgn8HvsYre_25zie";
	logoadd = "https://drive.google.com/uc?export=download&id=11BKh21cSfuiTBDHbY26XH5Ux9TBVYdWm";
	logoedu = "https://drive.google.com/uc?export=download&id=1_TzJ4uPlPA_qU9DaaARLKqlLoXVi5pWu";
	logosave = "https://drive.google.com/uc?export=download&id=1QjXoDP0V0L7EHnjlfAx5bMFH2T-NbYU7";
	logocancel = "https://drive.google.com/uc?export=download&id=1DnHtyYLt7LgH7Nl6HsIOfSh2CDjNiYAE";
	logodelete = "https://drive.google.com/uc?export=download&id=1iW5i4HOltXKRwV0Q2qsJp6mrZvmFq0rw";
	usuario: any = '';
	formTemplate!: FormGroup;
	@ViewChild('miModal') miModal: any;
	// myPortfolio: any;
	// public myPersona!: any[];
	nombreColeccion = 'persona';
	datosCollection: AngularFirestoreCollection<any>;
	datosArray!: any[];
	datos: Observable<Ipersona[]>;
	numRegistros!: number;
	nombreColeccion2 = 'aboutme';
	datosCollection2: AngularFirestoreCollection<any>;
	datosArray2!: any[];
	dA2: string[] = [];
	datos2!: Observable<Iaboutme[]>;
	numRegistros2!: number;
	aboutme!: any[];
	nombres!: any;
	apellido!: any;
	bannerImage!: any;
	profilePicture!: any;
	ocupacion!: any;
	ubication!: any;
	company: string[] = [];
	addEventListener: any;
	miArray: string[] = [];

	// private portfolioData: PortfolioService,
	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private modalService: NgbModal,
		public firestore: AngularFirestore,
		private firebaseService: FirebaseService) {
		this.datosCollection = this.firestore.collection(this.nombreColeccion);
		this.datos = this.datosCollection.valueChanges();
		this.getDatosArray();
		this.getNumRegistros();
		this.datosCollection2 = this.firestore.collection(this.nombreColeccion2);
		this.datos2 = this.datosCollection2.valueChanges();
		this.getDatosArray2();
		this.getNumRegistros2();
		console.log('DEBUG: Banner -LN73-');
	}
	ngOnInit(): void 
	{
		const authg = this.authService.authGetAuth();
		this.usuario = authg;
		console.log('DEBUG BANNER: authService.authGetAuth: -LN73-', authg);
		this.firebaseService.verificarYCrearColeccion('persona',
			{
				id: '1',
				nombres: 'Hernan',
				apellido: 'Canestraro',
				fecha_nacimiento: '09/27/76',
				nacionalidad: 'Argentino',
				mail: '',
				sobre_mi: 'Autodidacta',
				ocupacion: 'FullStack Developer Jr.',
				image_background_header: '',
				image_perfil: '',
				id_domicilio: 'La Matanza, Buenos Aires, Argentina'
			});
		this.firebaseService.verificarYCrearColeccion('aboutme',
			{
				id: '1',
				bannerImage: '',
				profilePicture: '',
				ubication: '',
				institution: '',
				institutionImage: '',
				posicion: '',
				descripcion: '',
				bannerImage2: '',
				profilePicture2: '',
				about: ''
			});
		this.formTemplate = this.fb.group(
			{
			// this.formTemplate = new FormGroup({
			id: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			nombres: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			apellido: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			fecha_nacimiento: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			nacionalidad: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			mail: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			sobre_mi: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			ocupacion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			image_background_header: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			image_perfil: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
			id_domicilio: new FormControl(['', [Validators.required, Validators.minLength(2)]])
		});
		// this.obtenerMiArrayDesdeFirestore();
	}
	// const element = document.getElementById("watchme") ?? document.createElement('div');
	// let position = 0;
	// let direction = 1;
	// setInterval(() => {
	// 	position += direction * 10;
	// 	element.style.transform = `translateX(${position}px)`;
	// 	if (position >= window.innerWidth || position <= -element.offsetWidth) {
	// 		direction *= -1;
	// 	}
	// }, 2);
	// this.verErr();

mostrarModal() {
	console.log('DEBUG BANNER: OPENMODAL LN137');

	this.modalService.open(this.miModal,{ariaLabelledBy: 'miModalLabel'}).result.then(
		() => this.formTemplate.reset()
		);
	document.body.classList.add('modal-open');
	// const modal = document.getElementById('myModal') ?? null;
	// modal.style.display = "block" ?? null;
}
closeModal() {
	// const modal = document.getElementById('myModal');
	// modal?.style.display = "none";
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
		// ).subscribe((array: any[] | { [s: string]: unknown; } | ArrayLike<unknown>) => {
	).subscribe((array) => {
		this.datosArray = array;
		// console.log(this.datosArray[0].valueChanges);
		this.nombres = this.datosArray[0].nombres;
		this.apellido = this.datosArray[0].apellido;
		this.ocupacion = this.datosArray[0].ocupacion;

		console.log('DEBUG BANNER datosArray tipo -LN167-:', typeof (this.datosArray), Object.entries(array));
		console.log('DEBUG BANNER: getDatosArray -LN168-', this.datosArray, ' length: ', this.datosArray.length);
	});
}

/* async obtenerMiArrayDesdeFirestore() {
    try {
      const snapshot = await this.firestore.collection<MiDocumento>('aboutme').get().toPromise();

      // Utilizar la interfaz definida para acceder al campo "miArray"
      snapshot?.forEach((doc) => {
        this.miArray.push(...doc.data().miArray);
      });

      console.log('DEBUG BANNER ABOUTME:',this.miArray,' len ', this.miArray.length);
    } catch (error) {
      console.error('Error al obtener el array desde Firestore:', error);
    }
  } */

getDatosArray2(): void {
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
		this.dA2 = array2;
		this.bannerImage = this.datosArray2[0].bannerImage;
		this.profilePicture = this.datosArray2[0].profilePicture;
		this.company[0] = this.datosArray2[0].company[0];
		this.company[1] = this.datosArray2[0].company[1];
		this.company[2] = this.datosArray2[0].company[2];
		// [0].company[0]
		// "Sobre mí...Sobre mí...Sobre mí...Sobre mí...Sobre mí...Sobre mí..."
		// [
		// 	{
		// 		"id": "mOW79YbI3ZNNho3FPp7I",
		// 		"about": "Sobre mí...Sobre mí...Sobre mí...Sobre mí...Sobre mí...Sobre mí...",
		// 		"ubication": "La Matanza, Buenos Aires, Argentina",
		// 		"profilePicture": "https://drive.google.com/uc?export=download&id=1cJWZ-4fWDwXLptzX6E1_rwtHB9kSiLWN",
		// 		"company": [
		// 			"I.N.T.I. Argentina Programa",
		// 			"https://argentinaprograma.inti.gob.ar",
		// 			"https://drive.google.com/uc?export=download&id=1-lX9QgBw8iGXLEgBd_pmdsM_Fz3l6LJn"
		// 		],
		// 		"institution": "Intituto Nacional de Tecnología Industrial",
		// 		"bannerImage": "https://drive.google.com/uc?export=download&id=1n7Zw94hqOWvhXpoumSTDtpM35JTr_rCY",
		// 		"posicion": "Estudiante",
		// 		"bannerImage2": "https://drive.google.com/uc?export=download&id=1H-fPPXI-WczRIV2N0cPiF2xu0_IUBklS",
		// 		"institutionImage": "https://www.argentina.gob.ar/sites/default/files/logo-inti-arg-blanco_23.png",
		// 		"descripcion": "descripcion",
		// 		"profilePicture2": "https://drive.google.com/uc?export=download&id=1DdFJjIWAxC9QQMOaUlxnddhe5nl6YPdI"
		// 	}
		// ]
		// this.myAboutme=Object.entries(array2);
		console.log('DEBUG: BANNER getDatosArray2 -LN229-', this.datosArray2,' --',this.dA2);
	})
}

getNumRegistros(): void {
	this.datosCollection?.get().subscribe((snapshot) => {
		this.numRegistros = snapshot.size;
	});
}

getNumRegistros2(): void {
	this.datosCollection2?.get().subscribe((snapshot) => {
		this.numRegistros2 = snapshot.size;
	});
}


/* 	verErr(): void {
		let objetoFormulario = this.form.controls;
		let keysForms = Object.keys(objetoFormulario);
		console.log("keysForm: ", keysForms);
		let valueForms = Object.values(objetoFormulario);
		console.log("valuesForm: ", valueForms);
	} */

getAboutme() {
	// console.log('DEBUG: getAboutme');
	// const aboutme = new Map(this.datosArray2);
	// console.log('DEBUG: aboutme',aboutme);

}

}
