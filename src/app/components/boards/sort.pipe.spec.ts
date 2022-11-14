import { SortByPipe } from './sort.pipe';
import { Board } from 'src/app/models/board.model';
import { mockedBoardsList } from 'src/app/mocks/boards-mock';

describe('SortByPipeBoards', () => {
  const pipe = new SortByPipe();
  let list: Board[];
  beforeEach(() => {
    list = [...mockedBoardsList];
  });
  it('should sort task list with asc and taskName parameters', () => {
    const previousList: Board[] = list;
    const resultList: Board[] = [
      previousList[2],
      previousList[0],
      previousList[1],
    ];
    expect(pipe.transform(list, 'boardName', 'DESC')).toEqual(resultList);
  });
});
