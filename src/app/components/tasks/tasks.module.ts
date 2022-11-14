import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort.pipe';

@NgModule({
  declarations: [TasksComponent,FilterPipe,SortByPipe],
  imports: [CommonModule, TasksRoutingModule,DragDropModule,FormsModule,ReactiveFormsModule],
  bootstrap: [TasksComponent],
})
export class TasksModule {}
