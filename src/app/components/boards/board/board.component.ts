import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/services/boards.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Board } from 'src/app/models/board.model';
import { Answer } from 'src/app/models/request.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  openBoardInfo: boolean = false;
  @Input() board!: Board;
  user!: User;
  constructor(
    private boardsService: BoardsService,
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user-info') || '');
  }
  openBoardModal(event?: boolean | Event | undefined, status: boolean = false) {
    if (status && event && typeof event !== 'boolean') {
      event.stopPropagation();
    }
    if (typeof event === 'boolean') {
      this.openBoardInfo = event;
    } else {
      this.openBoardInfo = !this.openBoardInfo;
    }
  }
  deleteBoard(event: Event) {
    event.stopPropagation();
    console.log(this.user.accessToken);
    this.boardsService
      .deleteBoard(this.user.accessToken, this.board._id)
      .subscribe((res: Answer) => {
        if (res.status === 200) {
          this.boardsService
            .getUserBoards(this.user.accessToken)
            .subscribe((res: Board[]) => {
              this.boardsService.setBoards(res);
            });
        }
      });
  }
  openBoard() {
    this.boardsService
      .getBoardById(this.user.accessToken, this.board._id)
      .subscribe((res: Board) => {
        this.tasksService.setBoard(res);
        this.tasksService
          .getBoardTasks(this.user.accessToken, this.board._id)
          .subscribe((tasks: Task[]) => {
            this.tasksService.setTasks(tasks);
            this.router.navigate([`tasks/${this.board._id}`]);
          });
      });
  }
}
