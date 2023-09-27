import { Component, Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iaboutme } from './../interfaces/iaboutme';
import { Ipersona } from './../interfaces/ipersona';
import { Ieducacion } from './../interfaces/ieducacion';
import { Iexperiencia } from './../interfaces/iexperiencia';
import { Iskills } from './../interfaces/iskills';
import { Isoftskills } from '../interfaces/isoftskills';
import { Iproyecto } from './../interfaces/iproyecto';

@Injectable({
	providedIn: 'root'
})
export class PortfolioService {


	url = 'localhost:4200/';

	//   Headers para POST, PUT Y DELETE.
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	});

	constructor(private http: HttpClient, public firestore: AngularFirestore, private firebaseService: FirebaseService) { }
	/* getdata(): Observable<any> {
	  console.log('getdata');
	  return this.http.get('./../../assets/data/data.json');
	} */
	// *********************************************************************
	// **************   |   METHOD'S GET ALL    | **************************
	// *********************************************************************

	//   obtenerDatosAboutMe(): Observable<Iaboutme> {
	obtenerDatosAboutMe(): void {
		console.log('ObtenerDatosAboutMe');
		// alert('obtenerDatosAboutMe');
		//return this.http.get('./../../assets/data/data.json');
		// return this.http.get<Iaboutme>('./../../assets/data/data.json');
		// return this.firebaseService.getDatosArray('AboutMe');
	}
	obtenerDatosPersona(): void {
		console.log('ObeterDatosPersona -LN47-');
		
	}
	obtenerDatosBanner(): Observable<any> {
		console.log("OBTENERDATOSBANNERX");
		return this.http.get('./../../assets/data/data.json');
	}
	obtenerDatosEducacion(): void {
		// obtenerDatosEducation():Observable<any> {
		console.log('obtenerDatosEducation');
		//  return this.http.get<Ieducacion>('./../../assets/data/data.json');
		//return this.http.get<Ieducacion>(this.url + 'education');
		// return this.firebaseService.getDatosArray('educacion');
	}

	obtenerDatosExperience(): void {
		console.log('obtenerDatosExperience');
		//return this.http.get<Iexperiencia>(this.url + 'Experience');
		// return this.firebaseService.getDatosArray('experiencia');
	}

	obtenerDatosProject(): void {
		console.log('obtenerDatosProject');
		//    return this.http.get<Iproyecto>(this.url + 'Projects');
		// return this.firebaseService.getDatosArray('proyectos');
	}

	obtenerDatosSkills(): Observable <Iskills>{
		console.log("obtenerDatosSkill");
		return this.http.get<Iskills>(this.url + 'skills');
		// return this.firebaseService.getDatosArray('skills');
	}

	obtenerDatosSoftSkills(): void {
		console.log("obtenerDatosSoftSkills");
		//return this.http.get<Iskills>(this.url + 'skills');
		// return this.firebaseService.getDatosArray('softskills');
	}

	// *********************************************************************
	// **************   |   METHOD'S GET ONE    | **************************
	// *********************************************************************

	obtenerOneDatosAboutMe(id: number): Observable<any> {
		console.log("obtenerundatoAboutMe");
		return this.http.get<any>(this.url + 'aboutme/' + id);
	}

	obtenerOneDatosEducacion(id: number): Observable<Ieducacion> {
		console.log("OBTENERDATOSEDUCATION", this.http.get<Ieducacion>(this.url + 'Education/' + id));
		return this.http.get<Ieducacion>(this.url + 'Educacion/' + id);
	}

	obtenerOneDatosExperiencia(id: number): Observable<Iexperiencia> {
		return this.http.get<Iexperiencia>(this.url + 'Experiencia/' + id);
	}

	obtenerOneDatosProject(id: number): Observable<Iproyecto> {
		return this.http.get<Iproyecto>(this.url + 'Projects/' + id);
	}

	obtenerOneDatosSkill(id: number): Observable<Iskills> {
		return this.http.get<Iskills>(this.url + 'skills/' + id);
	}

	// *********************************************************************
	// **************   |   METHOD'S POST    | ******************************
	// *********************************************************************

	postAboutMe(AboutMe: any): Observable<any> {
		let AboutMeJSON = JSON.stringify(AboutMe);
		return this.http.post<any>(this.url + 'AboutMe', AboutMeJSON, {
			headers: this.headers,
		});
	}

	postEducacion(Education: Ieducacion): Observable<Ieducacion> {
		return this.http.post<Ieducacion>(this.url + 'Education', Education, {
			headers: this.headers,
		});
	}

	postExperiencia(Experiencia: Iexperiencia): Observable<Iexperiencia> {
		return this.http.post<Iexperiencia>(this.url + 'Experience', Experiencia, {
			headers: this.headers,
		});
	}

	postProject(Project: Iproyecto): Observable<Iproyecto> {
		return this.http.post<Iproyecto>(this.url + 'Projects', Project, {
			headers: this.headers,
		});
	}

	postSkill(Skill: Iskills): Observable<Iskills> {
		return this.http.post<Iskills>(this.url + 'skills', Skill, {
			headers: this.headers,
		});
	}

	// *********************************************************************
	// **************   |   METHOD'S PUT    | ******************************
	// *********************************************************************
	
	  putAboutMe(AboutMe: any, id: Number): Observable<any> {
		return this.http.put<any>(this.url + 'AboutMe/' + id, AboutMe, {
		  headers: this.headers,
		});
	  }
	
	  putExperiencia(Experiencia: Iexperiencia, i: Number): Observable<Iexperiencia> {
		return this.http.put<Iexperiencia>(
		  this.url + 'Experience/' + i,
		  Experiencia,
		  { headers: this.headers }
		);
	  }
	
	  putEducacion(Education: Ieducacion, id: Number): Observable<Ieducacion> {
		return this.http.put<Ieducacion>(this.url + 'Educacion/' + id, Education, {
		  headers: this.headers,
		});
	  }
	
	  putProject(Proyecto: Iproyecto, id: Number): Observable<Iproyecto> {
		return this.http.put<Iproyecto>(this.url + 'Proyecto/' + id, Proyecto, {
		  headers: this.headers,
		});
	  }
	
	  putSkill(skill: Iskills, id: Number): Observable<Iskills> {
		return this.http.put<Iskills>(this.url + 'skills/' + id, skill, {
		  headers: this.headers,
		});
	  }
	
	  // *********************************************************************
	  // **************   |   METHOD'S DELETE    | ***************************
	  // *********************************************************************
	
	  deleteAboutMe(id: Number): Observable<any> {
		return this.http.delete<any>(this.url + 'AboutMe/' + id, {
		  headers: this.headers,
		});
	  }
	
	  deleteEducacion(id: Number): Observable<Ieducacion> {
		return this.http.delete<Ieducacion>(this.url + 'Educacion/' + id, {
		  headers: this.headers,
		});
	  }
	
	  deleteExperiencia(id: Number): Observable<Iexperiencia> {
		return this.http.delete<Iexperiencia>(this.url + 'Experiencia/' + id, {
		  headers: this.headers,
		});
	  }
	
	  deleteProject(id: Number): Observable<Iproyecto> {
		console.log("DELETE PROJECT:",this.url+"Proyecto/"+id);
		return this.http.delete<Iproyecto>(this.url + 'Proyecto/' + id, {
		  headers: this.headers,
		});
	  }
	
	  deleteSkill(id: Number): Observable<Iskills> {
		return this.http.delete<Iskills>(this.url + 'skills/' + id, {
		  headers: this.headers,
		});
	  }
} 