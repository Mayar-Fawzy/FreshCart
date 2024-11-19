import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrOfObject:any[],Klma:string): any[] {
    //وانت بتنادي البايب انه يرجع لي كل الاشياء اللي فيها الكلمة
    //tolowerCase()=>because it case sestive
    return arrOfObject.filter((item)=>item.title.toLowerCase().includes(Klma.toLowerCase()));
  }

}
