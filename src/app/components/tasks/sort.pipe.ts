import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/task.model';
@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: Task[], sort: string = '', order: string = ''): Task[] {
    if (!value || sort === '' || !sort) {
      return value;
    }
    if (value.length <= 1) {
      return value;
    }
    if (order === 'ASC') {
      if (sort === 'createdDate') {
        return value.sort((a: Task, b: Task) => {
          const firstDate = new Date(b[sort]);
          const secondDate = new Date(a[sort]);
          return firstDate.getTime() - secondDate.getTime();
        });
      }
      return value.sort((a: Task, b: Task) => compare(a, b, sort));
    } else {
      if (sort === 'createdDate') {
        return value
          .sort((a: Task, b: Task) => {
            const firstDate = new Date(b[sort]);
            const secondDate = new Date(a[sort]);
            return firstDate.getTime() - secondDate.getTime();
          })
          .reverse();
      }
      return value.sort((a, b) => compare(a, b, sort)).reverse();
    }
  }
}

function compare(a: Task, b: Task, value: string) {
  if (value === 'createdDate') {
    if (a[value] < b[value]) {
      return -1;
    }
    if (a[value] > b[value]) {
      return 1;
    }
  } else if (value === 'taskName') {
    if (a[value] < b[value]) {
      return -1;
    }
    if (a[value] > b[value]) {
      return 1;
    }
  }
  return 0;
}
