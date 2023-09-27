import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MiDialogComponent } from './../mi-dialog-component/mi-dialog-component.component';

// /**
//  * @title Dialog with header, scrollable content and actions
//  */

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
	constructor(private dialog: MatDialog) { }
	ngOnInit(): void {
		console.log('DEBUG: FOOTER -LN18-');
	}
	abrirDialog(): void {
		const dialogRef = this.dialog.open(MiDialogComponent, {
			width: '400px',
			// Opciones de configuración adicionales
		});
		// dialogRef.afterClosed().subscribe(result => {
			// console.log('Dialog result: ${result}');
			// Lógica a ejecutar después de cerrar el dialog
		// });
	}
}
