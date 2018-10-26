import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})


export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('it');

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    /*  return value.filter(function(item){
          return JSON.stringify(item).toLowerCase().includes(args);
      });*/

    return value.filter(it => {
      console.log(it);
      return it.title.toLowerCase().includes(args);
    });
  }

}
