import { ToastrConfig } from './../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/Interceptors/header.interceptor';
import { errorInterceptor } from './core/Interceptors/error.interceptor';
import { provideToastr  } from 'ngx-toastr';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { loadingInterceptor } from './core/Interceptors/loading.interceptor';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Create Function To Load Files from assets/i18n/

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()),provideClientHydration(), provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loadingInterceptor]))
    ,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule, TranslateModule.forRoot({
      defaultLanguage:'en',
         loader: {
        provide: TranslateHttpLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }))
  ]
};


