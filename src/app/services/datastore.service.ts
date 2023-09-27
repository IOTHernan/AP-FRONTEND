import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
	private data: any[] = [];
	private dataSubject = new BehaviorSubject<any[]>(this.data) ;

  	constructor() { }

	getData(item: any): void {
		this.data.push(item);
		this.dataSubject.next(this.data);
	}

	updateData(index: number, item: any): void {
		this.data[index] = item;
		this.dataSubject.next(this.data);
	}

	deleteData(index: number): void {
		this.data.splice(index, 1);
		this.dataSubject.next(this.data);
	}
}
