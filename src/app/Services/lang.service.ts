import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private readonly _TranslateService = inject(TranslateService);
  constructor() {
    // get language
    let SavedLang = localStorage.getItem('lang');
    //Defult Lang
    this._TranslateService.setDefaultLang('en');
    //use lang in local storge
    this._TranslateService.use(SavedLang!);
    //Direction
  }
  ChangeDirection():void{ //rtl or ltr
    let SavedLang = localStorage.getItem('lang');
    if(SavedLang=='en'){
      document.body.style.direction = 'ltr';
    }
    else if(SavedLang=='ar'){
      document.body.style.direction = 'rtl';
    }
  }
}
