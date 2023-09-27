import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
	selector: 'app-pdf-viewer',
	templateUrl: './pdf-viewer.component.html',
	styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
	// URL del archivo PDF que se va a mostrar
	pdfSrc: string = './../../../assets/angular-material-es.pdf';

	// Opciones de visualización del PDF
	zoom: number = 1.0;
	originalSize: boolean = true;

	constructor() { }

	ngOnInit(): void {

	}

}
