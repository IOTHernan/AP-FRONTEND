import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-che404',
	templateUrl: './che404.component.html',
	styleUrls: ['./che404.component.css']
})
export class Che404Component implements OnInit {
	@Input() errorMessages!: string;
	@Input() componentName!: string;
	@Input() lineNumber!: number;
	errorMessage!: string;
	ngOnInit() {
	}

	handleError(error: any) {
		// Manejar el evento de error aquí
		this.errorMessage = error.message;
		if (error instanceof HttpErrorResponse) {
		  // Error de HTTP
		  console.error('Ocurrió un error HTTP:', error.status);
		} else {
		  // Otro tipo de error
		  console.error('Ocurrió un error:', error);
		}
	  }
}
