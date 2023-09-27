import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { Image } from '../interfaces/image.interface';
@Injectable()
export class ImageService {
  constructor(private storage: AngularFireStorage) {}

  getImages(): Observable<Image[]> {
    const imagesRef = this.storage.ref('images');
    return imagesRef.listAll().pipe(
      map(result => {
        return result.items.map(item => {
          return {
            name: item.name,
            url: item.getDownloadURL()
          };
        });
      })
    );
  }
}
