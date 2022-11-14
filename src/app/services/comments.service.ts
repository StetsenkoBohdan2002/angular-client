import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { Answer } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  currentComments = new EventEmitter<Comment[]>();
  comments!: Comment[];
  constructor(private http: HttpClient) {}
  setComments(arr: Comment[]) {
    localStorage.setItem('currentComments', JSON.stringify(arr));
    this.comments = arr;
    this.currentComments.emit(arr);
  }
  getComments() {
    return this.comments;
  }
  addComment(item: Comment) {
    this.comments.push(item);
    localStorage.setItem('currentComments', JSON.stringify(this.comments));
    this.currentComments.emit(this.comments.slice());
  }
  createComment(
    token: string,
    obj: { taskId: string; commentName: string }
  ): Observable<Answer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }),
    };
    return this.http.post<Answer>(
      'http://localhost:8080/api/comments',
      obj,
      httpOptions
    );
  }
  getTaskComments(token: string, id: string): Observable<Comment[]> {
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
}
