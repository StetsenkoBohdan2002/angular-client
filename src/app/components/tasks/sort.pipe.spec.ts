import { SortByPipe } from './sort.pipe';
import { mockedTasksList } from '../../mocks/tasks-mock';
import { Task } from 'src/app/models/task.model';

describe('SortByPipeTasks', () => {
  const pipe = new SortByPipe();
  let list: Task[];
  beforeEach(() => {
    list = [...mockedTasksList];
  });
  it('should sort task list with asc and taskName parameters', () => {
    const previousList: Task[] = list;
    const resultList: Task[] = [
      previousList[1],
      previousList[2],
      previousList[0],
    ];
    expect(pipe.transform(list, 'taskName', 'ASC')).toEqual(resultList);
  });
  it('should sort task list with desc and createdDate parameters', () => {
    const previousList: Task[] = list;
    const resultList: Task[] = [
      previousList[2],
      previousList[1],
      previousList[0],
    ];
    expect(pipe.transform(list, 'createdDate', 'DESC')).toEqual(resultList);
  });
});
