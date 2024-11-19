import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
}) 
export class SalePipe implements PipeTransform {

  transform(text: string ,limit:number): string {
    return text.split(" ",limit).join(" ");
  }

}
