import {Component, Inject, OnInit} from '@angular/core';
import {TaskColors} from '../../enums/task-color.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BoardService} from '../../services/board.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public colorOptions = Object.values(TaskColors);

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public handleTaskDelete(): void {
    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.onCancel();
  }
}
