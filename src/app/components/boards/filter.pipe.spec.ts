import { FilterPipe } from './filter.pipe';
import { Task } from 'src/app/models/task.model';
import { mockedBoardsList } from 'src/app/mocks/boards-mock';
import { Board } from 'src/app/models/board.model';

describe('FilterPipeBoards', () => {
  const pipe = new FilterPipe();
  let list:Board[];
  beforeEach(() => {
     list = [...mockedBoardsList];
  });
  it('should return list of tasks with character a in taskName', () => {
    expect(pipe.transform(list, 'a')).toEqual([list[1]]);
  });
  it('should return empty list', () => {
    expect(pipe.transform(list, 'g')).toEqual([]);
  });
});
