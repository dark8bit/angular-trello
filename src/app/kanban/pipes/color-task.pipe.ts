import { Pipe, PipeTransform } from '@angular/core';
import {TaskColors} from '../enums/task-color.enum';

@Pipe({
  name: 'colorTask'
})
export class ColorTaskPipe implements PipeTransform {
  transform(color: TaskColors): string {
    return `${color}`;
  }
}
