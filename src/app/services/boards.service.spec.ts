import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Board } from '../models/board.model';
import { Answer } from '../models/request.model';
import { User } from '../models/user.model';
import { BoardsService } from './boards.service';
import {mockedBoardsList} from '../mocks/boards-mock'
describe('BoardsService', () => {
  let service: BoardsService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BoardsService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should set a list of boards to variables', () => {
    spyOn(service.boardsStore, 'emit');
    service.setBoards(mockedBoardsList);
    expect(service.boardsStore.emit).toHaveBeenCalledWith(mockedBoardsList);
    expect(service.boards).toEqual(mockedBoardsList);
    expect(localStorage.getItem('boards')).toEqual(
      JSON.stringify(mockedBoardsList)
    );
  });

  it('should return boards list', () => {
    service.boards = mockedBoardsList;
    expect(service.getBoards()).toEqual(mockedBoardsList);
  });

  it('should add new board to list', () => {
    service.boards = [];
    spyOn(service.boardsStore, 'emit');
    service.addBoard(mockedBoardsList[0]);
    expect(service.boards).toEqual([mockedBoardsList[0]]);
    expect(localStorage.getItem('boards')).toBe(
      JSON.stringify([mockedBoardsList[0]])
    );
    expect(service.boardsStore.emit).toHaveBeenCalledWith([mockedBoardsList[0]]);
  });
  it('should return user boards from server', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const request = service.getUserBoards(token);
    request.subscribe((res: Board[]) => {
      expect(res).toEqual(mockedBoardsList);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'GET',
      url: 'http://localhost:8080/api/boards',
    });
    testRequest.flush(mockedBoardsList);
  });

  it('should delete board by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = '636d7efc8cd774c086ca7b73';
    const mockedAnswerValue = {
      message: 'Board deleted successfully',
      status: 200,
    };
    const request = service.deleteBoard(token, id);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'DELETE',
      url: `http://localhost:8080/api/boards/${id}`,
    });
    testRequest.flush(mockedAnswerValue);
  });

  it('should get board by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = '636d7efc8cd774c086ca7b73';
    const request = service.getBoardById(token, id);
    request.subscribe((res: Board) => {
      expect(res).toEqual(mockedBoardsList[1]);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'GET',
      url: `http://localhost:8080/api/boards/${id}`,
    });
    testRequest.flush(mockedBoardsList[1]);
  });
  it('should update board by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = '636d7efc8cd774c086ca7b73';
    const newMockerBoard = new FormGroup({
      boardName: new FormControl('New Board Name'),
      boardDesc: new FormControl('New Board '),
      createdDate: new FormControl(new Date()),
    });
    const mockedAnswerValue = {
      message: 'Board details changed successfully',
      status: 200,
    };
    const request = service.updateBoard(token, id, newMockerBoard);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'PUT',
      url: `http://localhost:8080/api/boards/${id}`,
    });
    testRequest.flush(mockedAnswerValue);
  });
  it('should create new board', (done) => {
    const user: User = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE2NzIwNGU5NTU1OTJiMzFhNzk1ZSIsImlhdCI6MTY2ODExOTAxMn0._XkZc8xe0WBY4GoKEtXRKYNKDlmYzQ0xNhGrCZKLyuk',
      createdDate: '9/26/2022',
      email: 'test@gmail.com',
      firstName: 'Bohdan',
      lastName: 'Stetsenko',
      userId: '633167204e955592b31a795e',
      userImg:
        'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
    };
    const newMockedBoard = new FormGroup({
      boardName: new FormControl('New Board Name'),
      boardDesc: new FormControl('New Board '),
    });
    const mockedAnswerValue = { message: 'Ok', status: 200 };
    const request = service.createNewBoard(user, newMockedBoard);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'POST',
      url: `http://localhost:8080/api/boards`,
    });
    testRequest.flush(mockedAnswerValue);
  });
});
