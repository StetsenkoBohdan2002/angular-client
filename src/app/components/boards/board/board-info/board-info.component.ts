import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { User } from 'src/app/models/user.model';
import { Answer } from 'src/app/models/request.model';

@Component({
  selector: 'app-board-info',
  templateUrl: './board-info.component.html',
  styleUrls: ['./board-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardInfoComponent implements OnInit {
  @Output() openModal = new EventEmitter<boolean>(true);
  @Input() board!: Board;
  editBoard: boolean = false;
  constructor(private boardsService: BoardsService) {}
  infoForm = new FormGroup({
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
    createdDate: new FormControl(new Date()),
  });
  user!: User;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user-info') || '');
  }
  showModal(event: boolean | undefined) {
    this.openModal.emit(event);
  }
  updateBoard() {
    this.boardsService
      .updateBoard(this.user.accessToken, this.board._id, this.infoForm)
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
}
