import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Board } from 'src/app/models/board.model';
import { Comment } from 'src/app/models/comment.model';
import { Answer } from 'src/app/models/request.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewInit {
  currentBoard!: Board;
  task!: Task;
  user!: User;
  commentsList: Comment[] = [];
  commentTitle!: string;
  currentId!: string;
  @ViewChild('titleInput') titleInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user-info') || '');
    this.currentBoard = this.tasksService.getBoard();
    this.commentsList = this.commentsService.getComments();

    console.log(this.currentBoard);
    this.task = this.tasksService.getTasks().filter((item: Task) => {
      this.currentId = this.route.snapshot.params['id'];
      return item._id === this.currentId;
    })[0];
    this.tasksService.currentTasks.subscribe((res: Task[]) => {
      const currentTask = res.filter((item: Task) => {
        this.currentId = this.route.snapshot.params['id'];
        return item._id === this.currentId;
      })[0];
      this.task = currentTask;
    });
    this.commentsService.currentComments.subscribe((res: Comment[]) => {
      this.commentsList = res;
    });
  }
  ngAfterViewInit(): void {
    this.validInput();
  }
  createComment() {
    if (this.titleInput.nativeElement.classList.contains('ng-valid')) {
      const obj = { taskId: this.task._id, commentName: this.commentTitle };
      this.commentsService
        .createComment(this.user.accessToken, obj)
        .subscribe((res: Answer) => {
          if (res.status === 200) {
            this.commentsService
              .getTaskComments(this.user.accessToken, this.task._id)
              .subscribe((res: Comment[]) => {
                this.commentsService.setComments(res);
                this.commentTitle = '';
                this.validInput();
                this.tasksService
                  .getBoardTasks(this.user.accessToken, this.currentBoard._id)
                  .subscribe((res: Task[]) => {
                    this.tasksService.setTasks(res);
                    this.task = this.tasksService
                      .getTasks()
                      .filter((item: Task) => {
                        return item._id === this.route.snapshot.params['id'];
                      })[0];
                  });
              });
          }
        });
    }
  }
  validInput() {
    const re = /\S+/gi;
    if (
      String(this.commentTitle).length < 3 ||
      String(this.commentTitle) === '' ||
      !this.commentTitle ||
      !re.test(String(this.commentTitle))
    ) {
      this.titleInput.nativeElement.classList.remove('ng-valid');
      this.titleInput.nativeElement.classList.add('ng-invalid');
    } else {
      this.titleInput.nativeElement.classList.remove('ng-invalid');
      this.titleInput.nativeElement.classList.add('ng-valid');
    }
  }
}
