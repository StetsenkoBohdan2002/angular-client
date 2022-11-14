import { FilterPipe } from './filter.pipe';
import { mockedTasksList } from '../../mocks/tasks-mock';
import { Task } from 'src/app/models/task.model';

describe('FilterPipeTasks', () => {
  const pipe = new FilterPipe();
  let list:Task[];
  beforeEach(() => {
     list = [...mockedTasksList];
  });
  it('should return list of tasks with character a in taskName', () => {
    expect(pipe.transform(list, 'a')).toEqual([list[1]]);
  });
  it('should return empty list', () => {
    expect(pipe.transform(list, 'g')).toEqual([]);
  });
});
