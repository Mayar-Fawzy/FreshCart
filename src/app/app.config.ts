import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';
import { AnimationBuilder } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/Interceptors/header.interceptor';
import { errorInterceptor } from './core/Interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(), provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor]))
    ,importProvidersFrom(BrowserAnimationsModule)
  ]
};
