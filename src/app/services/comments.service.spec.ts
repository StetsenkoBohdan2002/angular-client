import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Comment } from '../models/comment.model';
import { Answer } from '../models/request.model';
import { CommentsService } from './comments.service';
import {mockedCommentsList} from '../mocks/comments-mock'

describe('CommentsService', () => {
  let service: CommentsService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentsService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should set a list of comments to variables', () => {
    spyOn(service.currentComments, 'emit');
    service.setComments(mockedCommentsList);
    expect(service.currentComments.emit).toHaveBeenCalledWith(
      mockedCommentsList
    );
    expect(service.comments).toEqual(mockedCommentsList);
    expect(localStorage.getItem('currentComments')).toEqual(
      JSON.stringify(mockedCommentsList)
    );
  });

  it('should return comments list', () => {
    service.comments = mockedCommentsList;
    expect(service.getComments()).toEqual(mockedCommentsList);
  });

  it('should add new comment to list', () => {
    service.comments = [];
    spyOn(service.currentComments, 'emit');
    service.addComment(mockedCommentsList[0]);
    expect(service.comments).toEqual([mockedCommentsList[0]]);
    expect(localStorage.getItem('currentComments')).toBe(
      JSON.stringify([mockedCommentsList[0]])
    );
    expect(service.currentComments.emit).toHaveBeenCalledWith(
      [mockedCommentsList[0]]
    );
  });
  it('should return task comments from server', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const id: string = 'reJfeflkefrr555mfef35535';
    const request = service.getTaskComments(token, id);
    request.subscribe((res: Comment[]) => {
      expect(res).toEqual(mockedCommentsList);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'GET',
      url: `http://localhost:8080/api/comments/${id}`,
    });
    testRequest.flush(mockedCommentsList);
  });

  it('should create new comment', (done) => {
    const token: string = 'reJfeflkefrr555mfef35535';
    const mockedAnswerValue = { message: 'Ok', status: 200 };
    const request = service.createComment(token, {
      taskId: mockedCommentsList[1].taskId,
      commentName: 'New Name',
    });
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'POST',
      url: `http://localhost:8080/api/comments`,
    });
    testRequest.flush(mockedAnswerValue);
  });
});
