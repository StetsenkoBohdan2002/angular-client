import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { BoardsService } from './services/boards.service';
import { CommentsService } from './services/comments.service';
import { TasksService } from './services/tasks.service';
import { loginSuccess } from './store/auth-store/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(
    private store$: Store,
    private authService: AuthService,
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private commentsService: CommentsService
  ) {}
  ngOnInit() {
    if (localStorage.getItem('user-info')) {
      const userInfo = JSON.parse(localStorage.getItem('user-info') || '');
      const {
        userId,
        userImg,
        firstName,
        lastName,
        email,
        accessToken,
        createdDate,
      } = userInfo;
      this.store$.dispatch(
        loginSuccess({
          userId,
          userImg,
          firstName,
          lastName,
          email,
          accessToken,
          createdDate,
        })
      );
      this.boardsService.setBoards(
        JSON.parse(localStorage.getItem('boards') || '')
      );
      if (localStorage.getItem('currentBoard')) {
        this.tasksService.setBoard(
          JSON.parse(localStorage.getItem('currentBoard') || '')
        );
      }
      if (localStorage.getItem('currentTasks')) {
        this.tasksService.setTasks(
          JSON.parse(localStorage.getItem('currentTasks') || '')
        );
      }
      if (localStorage.getItem('currentComments')) {
        this.commentsService.setComments(
          JSON.parse(localStorage.getItem('currentComments') || '')
        );
      }
      this.authService.isLoggedIn();
    }
  }
}
