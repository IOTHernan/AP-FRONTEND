import { Injectable, InjectionToken } from '@angular/core';

export const COLLECTION_NAME = new InjectionToken<string>('collectionName');


@Injectable()
export class MyService {

  constructor() {
   }
}
