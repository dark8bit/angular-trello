import { TaskColors } from '../enums/task-color.enum';

export interface TaskModel {
  title?: string;
  description?: string;
  label: TaskColors;
}
