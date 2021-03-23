import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoardModel } from '../models/boardModel';
import { TaskModel } from '../models/task.model';
import firebase from 'firebase/app';
import firestore = firebase.firestore;
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  /**
   * Create board
   * @param data
   */
  public async createBoard(data: BoardModel): Promise<DocumentReference<unknown>> {
    const user = await this.angularFireAuth.currentUser;
    const firstTask = {
      title: 'Task name',
      description: 'Task description',
      label: 'yellow'
    };

    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [firstTask]
    });
  }

  /**
   * Delete Board
   * @param boardId
   */
  public deleteBoard(boardId: string | undefined): Promise<void> {
    return this.db.collection('boards')
      .doc(boardId)
      .delete();
  }

  /**
   * Update Tasks
   * @param boardId
   * @param tasks
   */
  public updateTasks(boardId: string | undefined, tasks: TaskModel[] | undefined): Promise<void> {
    return this.db.collection('boards')
      .doc(boardId)
      .update({tasks});
  }

  /**
   * Remove TaskModel
   * @param boardId
   * @param task
   */
  public removeTask(boardId: string, task: TaskModel): Promise<void> {
    return this.db.collection('boards')
      .doc(boardId)
      .update({
        tasks: firestore.FieldValue.arrayRemove(task)
      });
  }

  /**
   * Get all board owned by current user
   */
  public getUserBoards(): Observable<BoardModel[]> {
    return this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<BoardModel>('boards', ref => {
            return ref.where('uid', '==', user.uid).orderBy('priority');
          }).valueChanges({
            idField: 'id'
          });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run batch write to change the priority of each board for sorting
   * @param boards
   */
  public sortBoards(boards: BoardModel[]): void {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(board => db.collection('boards').doc(board.id));

    refs.forEach((ref, idx) => batch.update(ref, {
      priority: idx
    }));
    batch.commit();
  }
}
