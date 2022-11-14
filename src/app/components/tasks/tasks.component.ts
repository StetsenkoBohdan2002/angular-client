import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/services/boards.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Task } from 'src/app/models/task.model';
import { Answer } from 'src/app/models/request.model';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  currentBoard!: Board;
  currentTasksTodo: Task[] = [];
  currentTasksProgress: Task[] = [];
  currentTasksDone: Task[] = [];
  todo: string[] = [];
  done: string[] = [];
  user!: User;
  createTodo: boolean = false;
  createProgress: boolean = false;
  createDone: boolean = false;

  todoTitle!: string;
  progressTitle!: string;
  doneTitle!: string;

  todoColor!: string;
  progressColor!: string;
  doneColor!: string;

  editTask: boolean = false;

  filter!: string;
  sort: string = 'taskName';
  order: string = 'ASC';

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private http: HttpClient,
    private boardsService: BoardsService,
    private commentsService: CommentsService
  ) {}
  goBack() {
    this.router.navigate(['boards']);
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user-info') || '');
    this.currentBoard = this.tasksService.getBoard();

    this.currentTasksTodo = this.tasksService
      .getTasks()
      .filter((item: Task) => {
        return item.status === 'todo';
      });
    this.currentTasksProgress = this.tasksService
      .getTasks()
      .filter((item: Task) => {
        return item.status === 'progress';
      });
    this.currentTasksDone = this.tasksService
      .getTasks()
      .filter((item: Task) => {
        return item.status === 'done';
      });

    this.tasksService.currentBoard.subscribe((res) => {
      this.currentBoard = res;
    });

    this.tasksService.currentTasks.subscribe((res) => {
      const todo = res.filter((item) => {
        return item.status === 'todo';
      });
      const progress = res.filter((item) => {
        return item.status === 'progress';
      });
      const done = res.filter((item) => {
        return item.status === 'done';
      });
      this.currentTasksTodo = todo;
      this.currentTasksProgress = progress;
      this.currentTasksDone = done;
    });
    console.log(this.currentTasksTodo);
  }
  updateTask(item: Task, task: HTMLInputElement) {
    console.log(task);
    console.log(item, task.value);
    const obj = {
      taskId: item._id,
      taskName: task.value,
    };
    this.tasksService
      .updateCurrentTask(this.user.accessToken, obj)
      .subscribe((res: Answer) => {
        if (res.status === 200) {
          this.tasksService
            .getBoardTasks(this.user.accessToken, this.currentBoard._id)
            .subscribe((tasks: Task[]) => {
              this.tasksService.setTasks(tasks);
            });
        }
      });
  }
  openComments(id: string) {
    this.tasksService
      .openTaskComments(this.user.accessToken, id)
      .subscribe((comments: Comment[]) => {
        this.commentsService.setComments(comments);
        this.router.navigate([`comments/${id}`]);
      });
  }
  deleteTask(item: Task) {
    this.tasksService
      .deleteCurrentTask(this.user.accessToken, item._id)
      .subscribe((res: Answer) => {
        if (res.status === 200) {
          this.tasksService
            .getBoardTasks(this.user.accessToken, this.currentBoard._id)
            .subscribe((res: Task[]) => {
              this.tasksService.setTasks(res);
            });
        }
      });
  }
  archiveTask(item: Task) {
    const obj = {
      taskId: item._id,
      archived: !item.archived,
    };
    console.log(obj);
    this.tasksService
      .archiveCurrentTask(this.user.accessToken, obj)
      .subscribe((res: Answer) => {
        console.log(res);
        if (res.status === 200) {
          this.tasksService
            .getBoardTasks(this.user.accessToken, this.currentBoard._id)
            .subscribe((res: Task[]) => {
              this.tasksService.setTasks(res);
            });
        }
      });
  }
  closeCreate(variant?: string) {
    switch (variant) {
      case 'todo':
        this.createTodo = false;
        break;
      case 'progress':
        this.createProgress = false;
        break;
      case 'done':
        this.createDone = false;
        break;
      default:
        this.createTodo = false;
    }
  }
  changeColor(variant: string) {
    let obj = {
      boardId: this.currentBoard._id,
      status: variant,
      color: '',
    };
    if (variant === 'todo') {
      obj.color = this.todoColor;
    } else if (variant === 'progress') {
      obj.color = this.progressColor;
    } else if (variant === 'done') {
      obj.color = this.doneColor;
    }
    this.tasksService
      .changeTaskColor(this.user.accessToken, obj)
      .subscribe((res: Answer) => {
        if (res.status === 200) {
          this.boardsService
            .getBoardById(this.user.accessToken, this.currentBoard._id)
            .subscribe((res: Board) => {
              this.tasksService.setBoard(res);
            });
        }
      });
  }
  createTaskTodo() {
    this.createTask();
    if (this.createTodo) {
      if (this.todoTitle) {
        const obj = {
          boardId: this.currentBoard._id,
          taskName: this.todoTitle,
          status: 'todo',
        };
        this.tasksService
          .createNewTask(this.user.accessToken, obj)
          .subscribe((res: Answer) => {
            if (res.status === 200) {
              this.tasksService
                .getBoardTasks(this.user.accessToken, this.currentBoard._id)
                .subscribe((res: Task[]) => {
                  this.tasksService.setTasks(res);
                  this.todoTitle = '';
                  this.createTodo = false;
                  this.boardsService
                    .getUserBoards(this.user.accessToken)
                    .subscribe((res: Board[]) => {
                      this.boardsService.setBoards(res);
                    });
                });
            }
          });
      }
    } else {
      this.createTodo = true;
    }
  }
  createTaskProgress() {
    this.createTask('progress');
    if (this.createProgress) {
      if (this.progressTitle) {
        const obj = {
          boardId: this.currentBoard._id,
          taskName: this.progressTitle,
          status: 'progress',
        };
        this.tasksService
          .createNewTask(this.user.accessToken, obj)
          .subscribe((res: Answer) => {
            if (res.status === 200) {
              this.tasksService
                .getBoardTasks(this.user.accessToken, this.currentBoard._id)
                .subscribe((res: Task[]) => {
                  this.tasksService.setTasks(res);
                  this.progressTitle = '';
                  this.createProgress = false;
                  this.boardsService
                    .getUserBoards(this.user.accessToken)
                    .subscribe((res: Board[]) => {
                      this.boardsService.setBoards(res);
                    });
                });
            }
          });
      }
    } else {
      this.createProgress = true;
    }
  }
  createTaskDone() {
    this.createTask('done');
    if (this.createDone) {
      if (this.doneTitle) {
        const obj = {
          boardId: this.currentBoard._id,
          taskName: this.doneTitle,
          status: 'done',
        };
        this.tasksService
          .createNewTask(this.user.accessToken, obj)
          .subscribe((res: Answer) => {
            if (res.status === 200) {
              this.tasksService
                .getBoardTasks(this.user.accessToken, this.currentBoard._id)
                .subscribe((res: Task[]) => {
                  this.tasksService.setTasks(res);
                  this.doneTitle = '';
                  this.createDone = false;
                  this.boardsService
                    .getUserBoards(this.user.accessToken)
                    .subscribe((res: Board[]) => {
                      this.boardsService.setBoards(res);
                    });
                });
            }
          });
      }
    } else {
      this.createDone = true;
    }
  }
  createTask(variant: string = 'todo') {
    switch (variant) {
      case 'todo':
        this.createTodo = true;
        break;
      case 'progress':
        this.createProgress = true;
        break;
      case 'done':
        this.createDone = true;
        break;
      default:
        this.createTodo = true;
    }
  }
  drop(event: CdkDragDrop<Task[]>) {
    const previousTasks: Task[] = event.previousContainer.data;
    const containerClass: string = Array.from(
      event.container.element.nativeElement.classList
    ).filter((item: string) => {
      if (item === 'todo' || item === 'progress' || item === 'done') {
        return true;
      }
      return false;
    })[0];
    let savedTaskList: Task[] = [];
    previousTasks.forEach((item: Task, index: number) => {
      savedTaskList[index] = item;
    });
    const taskList: Task[] =
      containerClass === 'todo'
        ? this.currentTasksTodo
        : containerClass === 'progress'
        ? this.currentTasksProgress
        : this.currentTasksDone;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    let droppedTask!: Task;
    for (let i = 0; i < taskList.length; i++) {
      for (let j = 0; j < savedTaskList.length; j++) {
        if (taskList[i]._id === savedTaskList[j]._id) {
          droppedTask = taskList[i];
        }
      }
    }
    const obj = {
      taskId: droppedTask._id,
      status: containerClass,
    };
    this.tasksService
      .changeTaskStatus(this.user.accessToken, obj)
      .subscribe((res: Answer) => {
        if (res.status === 200) {
          this.tasksService
            .getBoardTasks(this.user.accessToken, this.currentBoard._id)
            .subscribe((res: Task[]) => {
              this.tasksService.setTasks(res);
              this.currentTasksTodo = this.tasksService
                .getTasks()
                .filter((item: Task) => {
                  return item.status === 'todo';
                });
              this.currentTasksProgress = this.tasksService
                .getTasks()
                .filter((item: Task) => {
                  return item.status === 'progress';
                });
              this.currentTasksDone = this.tasksService
                .getTasks()
                .filter((item: Task) => {
                  return item.status === 'done';
                });
            });
        }
      });
  }
}
