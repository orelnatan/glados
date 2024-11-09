import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRootComponent } from './app/app-root.component';

import { environment } from './environments/environment.development';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppRootComponent, appConfig)
  .catch((err) => console.error(err));
