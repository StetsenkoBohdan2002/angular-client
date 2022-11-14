import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { getAuthData } from 'src/app/store/auth-store/store/auth.selectors';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { User } from 'src/app/models/user.model';
import { Answer } from 'src/app/models/request.model';
@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent implements OnInit {
  @Output() openModal = new EventEmitter<boolean>(true);

  boardForm = new FormGroup({
    boardName: new FormControl('', [
      Validators.pattern(/\S+/gi),
      Validators.minLength(3),
      Validators.required,
    ]),
    boardDesc: new FormControl('', [
      Validators.pattern(/\S+/gi),
      Validators.minLength(3),
      Validators.required,
    ]),
  });
  user?: User;
  constructor(
    private authService: AuthService,
    private store$: Store,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedInUser.subscribe((value) => {
      if (value) {
        this.store$.pipe(select(getAuthData)).subscribe((value) => {
          this.user = value;
        });
      }
    });
    console.log(this.user);
  }
  showModal(event: boolean | undefined) {
    this.openModal.emit(event);
  }
  createBoard() {
    if (this.boardForm.valid && this.user) {
      this.boardsService
        .createNewBoard(this.user, this.boardForm)
        .subscribe((res: Answer) => {
          if (res.status === 200 && this.user) {
            this.boardsService
              .getUserBoards(this.user.accessToken)
              .subscribe((res: Board[]) => {
                this.boardsService.setBoards(res);
                this.openModal.emit(false);
              });
          }
        });
    }
  }
}
