import {Pipe, PipeTransform} from '@angular/core';
import {Task} from './task.model';

@Pipe({
  name: 'completeness',
  pure: false
})

export class CompletenessPipe implements PipeTransform {
  transform(input: Task[], desiredCompleteness) {
    if(desiredCompleteness === 'incompleteTasks') {
      return input.filter(task => !task.done)
    } else if(desiredCompleteness === 'completedTasks') {
      return input.filter(task => task.done)
    } else {
      return input;
    }
  }
}
