import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Board[], searchValue: string): Board[] {
    if (!searchValue) return value;
    return value.filter(
      (board: Board) =>
      board.boardName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      board.boardDesc.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
