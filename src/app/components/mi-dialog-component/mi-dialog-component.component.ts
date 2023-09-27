import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-mi-dialog',
	templateUrl: './../mi-dialog-component/mi-dialog-component.component.html',
	styleUrls: ['./../mi-dialog-component/mi-dialog-component.component.css']
})
export class MiDialogComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<MiDialogComponent>) { }

	ngOnInit(): void {
		console.log('DEBUG: MIDIALOG');
	}

	cerrarDialog(): void {
		this.dialogRef.close();
	}

}
