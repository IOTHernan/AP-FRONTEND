import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.css']
})
export class PhotoCaptureComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor(private storage: AngularFireStorage) {}

  async ngAfterViewInit() {
    const constraints = { video: true };
    const video = this.videoPlayer.nativeElement;
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  capturePhoto() {
    const video = this.videoPlayer.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    canvas.toBlob((blob) => {
      if (blob) {
        const filePath = `photos/${new Date().getTime()}.jpg`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, blob);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL) => {
              console.log('Photo uploaded successfully. URL:', downloadURL);
            });
          })
        ).subscribe();
      }
    }, 'image/jpeg', 0.9);
  }
}

/* En este código, hemos utilizado @ViewChild para obtener una referencia al elemento <video> y capturar la foto cuando 
el usuario hace clic en el botón "Capture Photo". La foto capturada se almacena en Firebase Storage con una ruta única 
generada a partir de la fecha y hora actual.
Recuerda que para que este código funcione, primero debes haber configurado correctamente la conexión a tu proyecto de 
Firebase en el archivo environments/environment.ts.
Una vez que hayas configurado Firebase y completado estos pasos, el componente "photo-capture" permitirá a los usuarios 
tomar una foto con su cámara y guardarla en el almacenamiento de Firebase. */