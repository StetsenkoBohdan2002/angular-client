import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, loginUserData } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/app/store/auth-store/store/auth.actions';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { Answer } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  error: boolean = false;
  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store$: Store,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {}
  signIn(): void {
    if (
      this.profileForm.valid &&
      this.profileForm.get('password')?.value ===
        this.profileForm.get('confirmPassword')?.value
    ) {
      this.authService
        .loginUser(this.profileForm)
        .subscribe((res: loginUserData) => {
          if (res.status === 200) {
            const {
              userId,
              userImg,
              firstName,
              lastName,
              email,
              createdDate,
              accessToken,
            } = res;
            this.authService.isLoggedIn();
            localStorage.setItem(
              'user-info',
              JSON.stringify({
                userId,
                accessToken,
                userImg,
                firstName,
                lastName,
                email,
                createdDate,
              })
            );
            this.store$.dispatch(
              loginSuccess({
                userId,
                accessToken,
                userImg,
                firstName,
                lastName,
                email,
                createdDate,
              })
            );
            this.boardsService
              .getUserBoards(res.accessToken)
              .subscribe((res: Board[]) => {
                this.boardsService.setBoards(res);
                this.router.navigate(['']);
              });
          }
        });
      // this.http
      //   .post('http://localhost:8080/api/auth/login', this.profileForm.value)
      //   .subscribe((res: any) => {
      //     const { userId, userImg, firstName, lastName, email, createdDate } =
      //       res;
      //     if (res.status === 200) {
      //       this.authService.isLoggedIn();
      //       localStorage.setItem(
      //         'user-info',
      //         JSON.stringify({
      //           userId,
      //           accessToken: res.jwt_token,
      //           userImg,
      //           firstName,
      //           lastName,
      //           email,
      //           createdDate,
      //         })
      //       );
      //       this.store$.dispatch(
      //         loginSuccess({
      //           userId,
      //           accessToken: res.jwt_token,
      //           userImg,
      //           firstName,
      //           lastName,
      //           email,
      //           createdDate,
      //         })
      //       );
      //       const httpOptions = {
      //         headers: new HttpHeaders({
      //           'Content-Type': 'application/json',
      //           Authorization: `Token ${res.jwt_token}`,
      //         }),
      //       };
      //       this.http
      //         .get<Board[]>('http://localhost:8080/api/boards', httpOptions)
      //         .subscribe((res: Board[]) => {
      //           this.boardsService.setBoards(res);
      //         });
      //       // this.boardsService.setBoards()
      //       this.router.navigate(['']);
      //     }
      //   });
    } else {
      this.error = true;
    }
  }
}
