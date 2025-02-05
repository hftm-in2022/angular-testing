import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.configuration';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
