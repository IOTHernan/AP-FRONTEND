import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; 
// import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



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
	// error: any;
	// cheerror:any;
	// constructor( /* private route: ActivatedRoute */) {}
	// this.cheerror=`${this.route.snapshot.url.join('/')}`;
	// alert(this.cheerror);		
	// }
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
	saveAsLog() {
		const errorLogText = this.errorMessage; // Obtén el texto del error
	
		const blob = new Blob([errorLogText], { type: 'text/plain;charset=utf-8' });
		saveAs(blob, 'error.log');
	  }

	  printToPdf() {
		const errorText = this.errorMessage; // Obtén el texto del error
	
		const docDefinition = {
		  content: [
			{ text: 'Error Details', style: 'header' },
			{ text: errorText, style: 'body' }
		  ],
		  styles: {
			header: {
			  fontSize: 18,
			  bold: true,
			  margin: [0, 0, 0, 10]
			},
			body: {
			  fontSize: 12,
			  margin: [0, 0, 0, 10]
			}
		  }
		};
	
		(pdfMake as any).createPdf(docDefinition).getBlob((blob: Blob) => {
		  saveAs(blob, 'error.pdf');
		});
	  }
	  

}
