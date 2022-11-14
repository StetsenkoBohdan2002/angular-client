import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Answer } from '../models/request.model';
import { User } from '../models/user.model';
export interface loginUserData {
  message: string;
  status: number;
  result: string;
  accessToken: string;
  userId: string;
  userImg: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInUser = new BehaviorSubject<boolean>(false);
  checkLogin: boolean = false;
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    this.isLoggedInUser.next(true);
    this.checkLogin = true;
  }
  authLogout() {
    this.isLoggedInUser.next(false);
    this.checkLogin = false;
  }
  registerNewUser(form: FormGroup): Observable<Answer> {
    return this.http.post<Answer>(
      'http://localhost:8080/api/auth/register',
      form.value
    );
  }
  loginUser(form: FormGroup): Observable<loginUserData> {
    return this.http.post<loginUserData>(
      'http://localhost:8080/api/auth/login',
      form.value
    );
  }
}
