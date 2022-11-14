import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Task[], searchValue: string): Task[] {
    if (!searchValue) return value;
    return value.filter(
      (task: Task) =>
        task.taskName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        task.taskName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
