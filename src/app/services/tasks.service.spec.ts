import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';
import { TasksService } from './tasks.service';
import { mockedTasksList } from '../mocks/tasks-mock';
import { mockedBoardsList } from '../mocks/boards-mock';
import { Answer } from '../models/request.model';

describe('TasksService', () => {
  let service: TasksService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TasksService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should set a current board', () => {
    spyOn(service.currentBoard, 'emit');
    service.setBoard(mockedBoardsList[2]);
    expect(service.currentBoard.emit).toHaveBeenCalledWith(mockedBoardsList[2]);
    expect(service.board).toEqual(mockedBoardsList[2]);
    expect(localStorage.getItem('currentBoard')).toEqual(
      JSON.stringify(mockedBoardsList[2])
    );
  });

  it('should return current board', () => {
    service.board = mockedBoardsList[1];
    expect(service.getBoard()).toEqual(mockedBoardsList[1]);
  });
  it('should return current tasks list', () => {
    service.tasks = mockedTasksList;
    expect(service.getTasks()).toEqual(mockedTasksList);
  });
  it('should set tasks', () => {
    service.tasks = [];
    spyOn(service.currentTasks, 'emit');
    service.setTasks(mockedTasksList);
    expect(service.tasks).toEqual(mockedTasksList);
    expect(localStorage.getItem('currentTasks')).toBe(
      JSON.stringify(mockedTasksList)
    );
    expect(service.currentTasks.emit).toHaveBeenCalledWith(mockedTasksList);
  });
  it('should add task to list', () => {
    service.tasks = [];
    spyOn(service.currentTasks, 'emit');
    service.addTask(mockedTasksList[2]);
    expect(service.tasks).toEqual([mockedTasksList[2]]);
    expect(localStorage.getItem('currentTasks')).toBe(
      JSON.stringify([mockedTasksList[2]])
    );
    expect(service.currentTasks.emit).toHaveBeenCalledWith([
      mockedTasksList[2],
    ]);
  });

  it('should get board tasks from server', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = '636d7efc8cd774c086ca7b73';
    const request = service.getBoardTasks(token, id);
    request.subscribe((res: Task[]) => {
      expect(res).toEqual(mockedTasksList);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'GET',
      url: `http://localhost:8080/api/tasks/${id}`,
    });
    testRequest.flush(mockedTasksList);
  });

  it('should delete task by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = '636d7efc8cd774c086ca7b73';
    const mockedAnswerValue = {
      message: 'Task deleted successfully',
      status: 200,
    };
    const request = service.deleteCurrentTask(token, id);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'DELETE',
      url: `http://localhost:8080/api/tasks/${id}`,
    });
    testRequest.flush(mockedAnswerValue);
  });
  it('should update task by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const mockedAnswerValue = {
      message: 'Task details changed successfully',
      status: 200,
    };
    const obj = {
      taskId: '636d7efc8cd774c086ca7b73',
      taskName: 'New Name',
    };
    const request = service.updateCurrentTask(token, obj);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'PUT',
      url: `http://localhost:8080/api/tasks`,
    });
    testRequest.flush(mockedAnswerValue);
  });
  it('should update task archived by id', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const mockedAnswerValue = {
      message: 'Task details changed successfully',
      status: 200,
    };
    const obj = {
      taskId: '636d7efc8cd774c086ca7b73',
      archived: false,
    };
    const request = service.archiveCurrentTask(token, obj);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'PUT',
      url: `http://localhost:8080/api/tasks/archive`,
    });
    testRequest.flush(mockedAnswerValue);
  });
  
});
