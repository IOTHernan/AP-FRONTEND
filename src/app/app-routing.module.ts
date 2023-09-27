import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Che404Component } from './components/che404/che404.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { LoginComponent } from './components/login/login.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SoftskillsComponent } from './components/softskills/softskills.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { RegisterComponent } from './components/register/register.component';
// import { UserProfileComponent } from './components/user-profile/user-profile.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { BannerComponent } from './components/banner/banner.component';
// import { chelibComponent } from "./components/chelib/chelib.component";
// import { IngresarComponent } from './components/ingresar/ingresar.component';
// import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
	{ path: 'portfolio', /* canActivate:[GuardGuard], */ component: PortfolioComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'skills', component: SkillsComponent },
	{ path: 'softskills', component: SoftskillsComponent },
	{ path: 'proyectos', component: ProyectosComponent },
	{ path: '**', component: Che404Component }
	// { path: 'chelib', component: chelibComponent },
	// { path: 'user-profile', component: UserProfileComponent },
	// { path: 'footer', component: FooterComponent },
	// { path: 'banner', component: BannerComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { } 