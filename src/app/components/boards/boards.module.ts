import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { ShorterPipe } from '../shorter.pipe';
import { BoardComponent } from './board/board.component';
import { ClickedOutsideDirectiveModal } from './add-board/modal.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort.pipe';
import { BoardInfoComponent } from './board/board-info/board-info.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BoardsComponent,
    AddBoardComponent,
    ShorterPipe,
    BoardComponent,
    ClickedOutsideDirectiveModal,
    FilterPipe,
    SortByPipe,
    BoardInfoComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [BoardsComponent],
})
export class BoardsModule {}
