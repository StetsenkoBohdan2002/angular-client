import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorter',
})
export class ShorterPipe implements PipeTransform {
  transform(value: string, shortNum: number) {
    if (value.length > 30) {
      return value.substr(0, shortNum) + '...';
    }
    return value;
  }
}
