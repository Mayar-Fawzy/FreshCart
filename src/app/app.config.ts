import { ToastrConfig } from './../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/Interceptors/header.interceptor';
import { errorInterceptor } from './core/Interceptors/error.interceptor';
import { TostService } from './Services/tost.service';
import { provideToastr  } from 'ngx-toastr';
import {  NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()),provideClientHydration(), provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor]))
    ,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};


