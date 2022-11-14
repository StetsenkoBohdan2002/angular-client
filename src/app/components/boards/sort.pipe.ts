import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: Board[], sort: keyof Board, order: string = ''):Board[]{
    console.log(value)
    if (!value || !sort) {
      return value;
    }
    if (value.length <= 1) {
      return value;
    }
    if (order === 'ASC') {
      return value.sort((a:Board, b:Board) => compare(a, b, sort));
    } else {
      return value.sort((a:Board, b:Board) => compare(a, b, sort)).reverse();
    }
  }
}

function compare(a:Board, b:Board, value: keyof Board) {
  if (a[value] < b[value]) {
    return -1;
  }
  if (a[value] > b[value]) {
    return 1;
  }
  return 0;
}
