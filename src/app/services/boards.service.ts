import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { Answer } from '../models/request.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardsStore = new EventEmitter<Board[]>();
  boards: Board[] = [];
  constructor(private http: HttpClient) {}
  setBoards(arr: Board[]) {
    console.log(arr)
    localStorage.setItem('boards', JSON.stringify(arr));
    this.boards = arr;
    this.boardsStore.emit(this.boards.slice());
  }
  getBoards() {
    return this.boards.slice();
  }
  addBoard(board: Board) {
    this.boards.push(board);
    localStorage.setItem('boards', JSON.stringify(this.boards));
    this.boardsStore.emit(this.boards.slice());
  }
  getUserBoards(token: string): Observable<Board[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.get<Board[]>(
      'http://localhost:8080/api/boards',
      httpOptions
    );
  }
  deleteBoard(token: string, id: string): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.delete<Answer>(
      `http://localhost:8080/api/boards/${id}`,
      httpOptions
    );
  }
  getBoardById(token: string, id: string): Observable<Board> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.get<Board>(
      `http://localhost:8080/api/boards/${id}`,
      httpOptions
    );
  }
  updateBoard(token: string, id: string, form: FormGroup): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    const obj = form.value;
    return this.http.put<Answer>(
      `http://localhost:8080/api/boards/${id}`,
      obj,
      httpOptions
    );
  }
  createNewBoard(user: User, form: FormGroup):Observable<Answer> {
    console.log(user)
    console.log(form)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${user.accessToken}`,
      }),
    };
    const obj = { userId: user.userId, ...form.value };
    return this.http.post<Answer>('http://localhost:8080/api/boards', obj, httpOptions);
  }
}
