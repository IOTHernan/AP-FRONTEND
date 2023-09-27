// *****************************************
// * npm
// *****************************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../environments/environments';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
// import {makeStateKey, StateKey, TransferState} from '@angular/core';
// import { HotToastModule } from '@ngneat/hot-toast';
// import { CloudinaryModule } from "@cloudinary/ng";
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Placement as PopperPlacement, Options } from '@popperjs/core';
// *****************************************
// * Components
// *****************************************

import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { Che404Component } from './components/che404/che404.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SoftskillsComponent } from './components/softskills/softskills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { RegisterComponent } from './components/register/register.component';
// *****************************************
// * Services
// *****************************************
// import { PortfolioService } from './services/portfolio.service';
// import { EducacionService } from './services/educacion.service';
import { FirebaseService } from './services/firebase.service';
import { InterceptorService } from './services/interceptor.service';
import { DataService } from './services/data.service';
// *****************************************
// * firebase
// *****************************************
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getStorage, provideStorage } from '@angular/fire/storage';

// *****************************************
// * Angular Material
// *****************************************
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { IngresarComponent } from './components/ingresar/ingresar.component';
// import { CloudinaryConfig } from '@cloudinary/url-gen';
import { MiDialogComponent } from './components/mi-dialog-component/mi-dialog-component.component';
import { ErrorHandlingModule } from './modules/error-handling/error-handling.module';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
// import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
// import { PhotoCaptureComponent } from './components/photo-capture/photo-capture.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

const materialModules = [
	MatProgressBarModule, MatTooltipModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatProgressSpinnerModule,
	MatSliderModule, MatToolbarModule, MatIconModule, MatInputModule, MatDialogModule, MatFormFieldModule,
	MatDividerModule, MatListModule, MatMenuModule
];
	// MatDatepickerModule,
	// MatNativeDateModule,

@NgModule({
	declarations: [
		AppComponent, NavbarComponent, BannerComponent, FooterComponent, Che404Component, EducacionComponent,
		ExperienciaComponent, SkillsComponent, SoftskillsComponent, ProyectosComponent, PortfolioComponent,
		LoginComponent, AboutMeComponent, ContactFormComponent, RegisterComponent, MiDialogComponent,
		ImageGalleryComponent, ConfirmationDialogComponent
		// , PdfViewerComponent, PhotoCaptureComponent
	],
	imports: [
		BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule,
		BrowserAnimationsModule, materialModules, AngularFireModule.initializeApp(environment.firebase),
		AngularFireStorageModule, AngularFirestoreModule, AngularFireAuthModule, provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), FontAwesomeModule,
		ErrorHandlingModule
		// , PdfViewerModule
		// CloudinaryModule,
		// AngularFireDatabaseModule,
		// provideFirebaseApp(() => initializeApp(environment.firebase)),
		// HotToastModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
