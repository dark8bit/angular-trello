import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardModel} from '../../models/boardModel';
import {Subscription} from 'rxjs';
import {BoardService} from '../../services/board.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {BoardDialogComponent} from '../board-dialog/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
  public boards: BoardModel[];

  private subscription: Subscription;

  constructor(
    public boardService: BoardService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBoards();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public dropBoard(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);


    if (event.previousIndex !== event.currentIndex) {
      this.boardService.sortBoards(this.boards);
    }
  }

  public openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.boardService.createBoard({
          title: res,
          priority: this.boards.length
        });
      }
    });
  }

  private getBoards(): void {
    this.subscription = this.boardService
      .getUserBoards()
      .subscribe(boards => this.boards = boards);
  }
}
