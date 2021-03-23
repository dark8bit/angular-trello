import {Component, Input, OnInit } from '@angular/core';
import { BoardModel } from '../../models/boardModel';
import { BoardService } from '../../services/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  board: BoardModel;

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public taskDrop(event: CdkDragDrop<string[]>): void {
    // @ts-ignore
    moveItemInArray(this.board?.tasks, event.previousIndex, event.currentIndex);

    if (event.previousIndex !== event.currentIndex) {
      this.boardService.updateTasks(this.board.id, this.board.tasks);
    }
  }

  public openDialog(task?: TaskModel, idx?: number): void {
    const newTask = {
      label: 'purple'
    };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task ? {
        task: {...task},
        isNew: false,
        boardId: this.board.id,
        idx
      } : {
        task: newTask,
        isNew: true
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res.isNew) {
          this.boardService.updateTasks(this.board.id, [
            // @ts-ignore
            ...this.board.tasks,
            res.task
          ]);
        } else {
          const update = this.board.tasks;

          update?.splice(res.idx, 1, res.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  public handleDelete(): void {
    this.boardService.deleteBoard(this.board.id);
  }
}
