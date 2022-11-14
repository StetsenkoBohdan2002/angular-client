import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  openModal: boolean = false;
  boards: Board[] = [];
  filter!: string;
  sort: keyof Board = 'boardName';
  order: string = 'ASC';

  constructor(private boardsService: BoardsService) {}
  ngOnInit(): void {
    this.boards = this.boardsService.getBoards();
    this.boardsService.boardsStore.subscribe((value: Board[]) => {
      this.boards = value;
    });
  }
  openBoardModal(event?: boolean | undefined): void {
    if (event) {
      this.openModal = event;
    } else {
      this.openModal = !this.openModal;
    }
  }
}
