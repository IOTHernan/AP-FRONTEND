import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environments';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
   if (environment.production) enableProdMode();
  