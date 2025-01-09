import { ApplicationConfig } from '@angular/core';

import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app-routing';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { GlobalErrorHandler } from './core';
import { authConfig } from './core/auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding() /* withPreloading(PreloadAllModules), */,
    ),
    provideAuth(authConfig),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    // provideExperimentalZonelessChangeDetection()
  ],
};
