import { TaskModel } from './task.model';

export interface BoardModel {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: TaskModel[];
}


