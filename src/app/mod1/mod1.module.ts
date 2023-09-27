import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MyService } from './../services/myservice.service';
export const COLLECTION_NAME = new InjectionToken<string>('collection_name');

// @Injectable({
//   providedIn: 'root'
// })
export function provideCollectionName(): string{
  return 'skills';
}

@NgModule({
  providers: [
    { provide: COLLECTION_NAME, useFactory: provideCollectionName },
    // MyService
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Mod1Module { }
