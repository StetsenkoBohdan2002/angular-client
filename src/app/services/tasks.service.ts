import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';
import { Comment } from '../models/comment.model';
import { Answer } from '../models/request.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  currentBoard = new EventEmitter<Board>();
  board!: Board;
  currentTasks = new EventEmitter<Task[]>();
  tasks!: Task[];
  constructor(private http: HttpClient) {}
  setBoard(res: Board) {
    localStorage.setItem('currentBoard', JSON.stringify(res));
    this.board = res;
    this.currentBoard.emit(res);
  }
  getBoard() {
    return this.board;
  }
  setTasks(arr: Task[]) {
    localStorage.setItem('currentTasks', JSON.stringify(arr));
    this.tasks = arr;
    this.currentTasks.emit(arr);
  }
  getTasks() {
    return this.tasks;
  }
  addTask(item: Task) {
    this.tasks.push(item);
    localStorage.setItem('currentTasks', JSON.stringify(this.tasks));
    this.currentTasks.emit(this.tasks.slice());
  }
  getBoardTasks(token: string, id: string): Observable<Task[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.get<Task[]>(
      `http://localhost:8080/api/tasks/${id}`,
      httpOptions
    );
  }
  updateCurrentTask(token: string, obj: { taskId: string; taskName: string }): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.put<Answer>(
      `http://localhost:8080/api/tasks`,
      obj,
      httpOptions
    );
  }
  openTaskComments(token: string, id: string): Observable<Comment[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.get<Comment[]>(
      `http://localhost:8080/api/comments/${id}`,
      httpOptions
    );
  }
  deleteCurrentTask(token: string, id: string): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.delete<Answer>(
      `http://localhost:8080/api/tasks/${id}`,
      httpOptions
    );
  }
  archiveCurrentTask(
    token: string,
    obj: { taskId: string; archived: boolean }
  ): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.put<Answer>(
      `http://localhost:8080/api/tasks/archive`,
      obj,
      httpOptions
    );
  }
  changeTaskColor(
    token: string,
    obj: { boardId: string; status: string; color: string }
  ): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.post<Answer>(
      `http://localhost:8080/api/tasks/color`,
      obj,
      httpOptions
    );
  }
  createNewTask(
    token: string,
    obj: { boardId: string; taskName: string; status: string }
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.post<Answer>(
      `http://localhost:8080/api/tasks/`,
      obj,
      httpOptions
    );
  }
  changeTaskStatus(token:string,obj:{taskId:string,status:string}){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http
    .put<Answer>(`http://localhost:8080/api/tasks/status`, obj, httpOptions)
  }
}
