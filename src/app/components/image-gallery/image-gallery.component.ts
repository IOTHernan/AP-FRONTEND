import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, listAll } from "firebase/storage";
import { finalize } from 'rxjs/operators';
// import { DatastoreService } from './../../services/datastore.service';
// import fetch from 'node-fetch';
// import { getStorage, ref, listAll } from "firebase/storage";
// import { getApp } from 'firebase/app';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import * as firebase from 'firebase/compat';
// import { Observable, forkJoin, map, switchMap } from 'rxjs';
// import { Image } from 'src/app/interfaces/image.interface';
// import * as firebase from 'firebase/compat';
// import { getStorage, ref } from "firebase/storage";
// import { EventEmitter } from "@angular/core";
// const storage = getStorage();
// const storageRef = ref(storage);
// import { listAll } from "firebase/storage";

// import { Cimg } from './../../interfaces/cimg';

@Component({
	selector: 'app-image-gallery',
	templateUrl: './image-gallery.component.html',
	styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit 
{
	// form!: FormGroup;
	// imagen!: Observable<Image>;
	// selectedImage: any;
	// itemRefs: any = [];
	// 	@Output()  fileSelected = new EventEmitter<File>();private formBuilder: FormBuilder, private storage: AngularFireStorage
	// array!: any  = [];
	// const storage = getStorage();
	// const listRef = ref(this.storage, 'files/uid');
	// data: any[];
	selectedFile: File | null = null;
	uploadPercent: number | undefined = undefined;
	images: any[] = [];
	lista: any[] = [];
	registerMode: boolean= false;

	constructor(private storage: AngularFireStorage) {	 }

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0] as File;
	}

	uploadImage() {
		if(!this.selectedFile) return;

		const filePath = `images/${Date.now()}_${this.selectedFile.name}`;
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, this.selectedFile);

		task.percentageChanges().subscribe((percentage) => {
			this.uploadPercent = percentage ?? undefined;
		});

		task.snapshotChanges().pipe(
			finalize(() => {
				fileRef.getDownloadURL().subscribe((url) => {
					this.images.push({ url, id: filePath });
					this.uploadPercent = undefined;
					this.selectedFile = null;
				});
			})
		).subscribe();
	}

	deleteImage(imageId: string) {
		this.storage.ref(imageId).delete().subscribe(() => {
			this.images = this.images.filter((image) => image.id !== imageId);
		});
	}
	ngOnInit(): void {
		// this.datastoreService.getData().subscribe((data) => {
			// this.data = data;
		// });
		console.log('debug image-galleri oninit ln17');
		// const response = await fetch('https://example.com/data.json');
		// const data = await response.json();
				// const array = Object.values(data);
				// this.array.onEach() 
				// {
					// console.log(array);
				// }
	}

	listaStorage() 
	{
		const storage = getStorage();

		// Create a reference under which you want to list
		const listRef = ref(storage, 'files/uid');

		// Find all the prefixes and items.
		listAll(listRef)
  			.then((res) => {
    		res.prefixes.forEach((folderRef) => {
      		// All the prefixes under listRef.
      		// You may call listAll() recursively on them.
    		});
    		res.items.forEach((itemRef) => {
      		// All the items under listRef.
			this.lista.push(itemRef);
    		});
  			}).catch((error) => {
    		// Uh-oh, an error occurred!
  			});
	}

}
// 	addData(item: any): void {
// 		this.datastoreService.addData(item);
// 	}

// 	updateData(index: number, item: any): void {
// 		this.datastoreService.updateData(index, item);
// 	}
	
// 	deleteData(index: number): void {
// 		this.datastoreService.deleteData(index);
// 	}
// }
	/* listAll(listRef: any)
		.then((res) =>
		{
			res.prefixes.forEach((folderRef) => 
			{
				// all
				// You may call listAll
			});
			res.items.forEach((itemRef) => 
			{
				// All the items under listRef.
			});
			}).catch((error) => 
			{
			  // Uh-oh, an error occurred!
			};
		};
 */

// 	f(): void 
// 	{
// 		const storage = getStorage();
// 		// Points to the root reference
// 		const storageRef = ref(storage);
// 		// Points to 'images'
// 		const imagesRef = ref(storageRef, 'images');
// 		// Points to 'images/space.jpg'
// 		// Note that you can use variables to create child values
// 		const fileName = 'space.jpg';
// 		const spaceRef = ref(imagesRef, fileName);
// 		// File path is 'images/space.jpg'
// 		const path = spaceRef.fullPath;
// 		// File name is 'space.jpg'
// 		const name = spaceRef.name;
// 		// Points to 'images'
// 		const imagesRefAgain = spaceRef.parent;
// 		// console.log(this.cimg.getlogopencil());
// /* 		listAll(storageRef).then((res) => 
// 		{
//   			res.items.forEach((itemRef) => 
// 			{
//   		  		// ...
// 		  		this.itemRefs = itemRef;
// 		  	});
// 		});

//  */	}

	// async function pageTokenExample()
	// {
	// 	// Create a reference under which you want to list
	// 	const storage = getStorage();
	// 	const listRef = ref(storage, 'files/uid');
	  
	// 	// Fetch the first page of 100.
	// 	const firstPage = await list(listRef, { maxResults: 100 });
	  
	// 	// Use the result.
	// 	// processItems(firstPage.items)
	// 	// processPrefixes(firstPage.prefixes)
	  
	// 	// Fetch the second page if there are more elements.
	// 	if (firstPage.nextPageToken) {
	// 	  const secondPage = await list(listRef, {
	// 		maxResults: 100,
	// 		pageToken: firstPage.nextPageToken,
	// 	  });
	// 	  // processItems(secondPage.items)
	// 	  // processPrefixes(secondPage.prefixes)
	// 	}
	// }

	// storage_multiple_buckets() :void
	// {
	// 	// Get a non-default Storage bucket
	// 	const firebaseApp = getApp();
	// 	const storage = getStorage(firebaseApp, "gs://my-custom-bucket");
	// }

//  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓


// selectFile(itemRef: any) {
// 		  itemRef.getDownloadURL().then((url: RequestInfo | URL) => {
// 			fetch(url).then((res) => res.blob()).then((blob) => {
// 			  const file = new File([blob], itemRef.name);
// 			  this.fileSelected.emit(file);
// 			});
// 		  });
// 		} */

// 	selectImage(event: any) {
// 		const file = event.target.files[0];
// 		const filePath = `images/${Date.now()}_${file.name}`;
// 		const fileRef = this.storage.ref(filePath);
// 		const task = this.storage.upload(filePath, file);
		
// 		task.snapshotChanges().pipe(
// 		  finalize(() => {
// 			fileRef.getDownloadURL().subscribe(url => {
// 			  this.imagen = {
// 				name?: file.name,
// 				url: url
// 			  };
// 			});
			
// 			this.form.get('image').setValue(filePath);
// 		  })
// 		).subscribe();
// 	  }
	  
	  
// 	// selectImage(image: any) {
// 	// 	this.selectedImage=image;
// 	// }
// 	// obtenerURLArchivo(nombreArchivo: string): Observable<string> {
// 	// 	const referencia = this.storage.ref(nombreArchivo);
// 	// 	return referencia.getDownloadURL();
// 	//   }
// 	// cheDownloadStorage(fileName: string) {
// 	// 	const ref = this.storage.ref(fileName);
// 	// 	ref.getDownloadURL().subscribe( url => {
// 	// 		console.log('file:',fileName,' ',url);
// 	// 		const fURL= url;
// 	// 		return fURL;
// 	// 	});
// 	// }
// 	// this.firebaseService.cargarDatosEnFirebase('educacion',this.educacionList);
// 	// this.getDatosArray();
// 	// this.experienciaList=this.firebase.getDatosArray('experiencia');
// 	// this.educacionService.getElementos().subscribe(elementos => {
// 	// 	this.elementos = elementos;
// 	// });
// 	// this.logopencil = this.obtenerURLArchivo('logoPencil.png');/* .__zone_symbol__value */
// 	// console.log('pen',this.logopencil);
// 	// this.logoadd = this.cheDownloadStorage('logoAdd.png');
// 	// this.logoedu = this.cheDownloadStorage('logoEdu.png');
// 	// this.logosave = this.cheDownloadStorage('logoSave.png');
// 	// this.logocancel = this.cheDownloadStorage('logoCancel.png');
// 	// this.logodelete = this.cheDownloadStorage('logoDelete.png');
// }
// 		this.form = this.formBuilder.group({
// 			name: ['', Validators.required],
// 			image: ['', Validators.required]
// 		  });
		/* const storageRef = firebase.storage().ref();
		const fileRef = storageRef.child(`https://firebasestorage.googleapis.com/v0/b/ap-frontend-ac93a.appspot.com/o/`);

		fileRef.getDownloadURL().then(url => {
  			fetch(url).then(response => {
    		response.text().then(text => {
      		console.log(text);
    		});
  		});
		}); */