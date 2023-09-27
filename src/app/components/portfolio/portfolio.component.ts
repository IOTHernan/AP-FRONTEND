import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
	constructor(private afAuth: AngularFireAuth) {}
	user = getAuth().currentUser;
	ngOnInit(): void {
		console.log('DEBUG: PORTFOLIO ln13');
		if (this.user) {
			console.log('DEBUG: Portfolio USUARIO OK');
		}
	}
}