import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { ColorTaskPipe } from './pipes/color-task.pipe';


@NgModule({
  declarations: [BoardListComponent, BoardComponent, ColorTaskPipe, TaskDialogComponent, BoardDialogComponent],
  exports: [
    BoardListComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  entryComponents: [BoardDialogComponent, TaskDialogComponent]
})
export class KanbanModule { }
