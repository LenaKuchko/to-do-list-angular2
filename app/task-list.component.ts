import {Component} from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  template: `
  <ul>
    <li [class]='priorityColor(currentTask)' *ngFor='let currentTask of tasks'>{{currentTask.description}}  <button (click)='editTask(currentTask)' class='btn btn-xs'>Edit</button></li>
  </ul>
  `
})

export class TaskListComponent {
  tasks: Task[] = [
    new Task('Finish weekend Angular homework for Epicodus course', 3),
    new Task('Second task', 1),
    new Task('final task', 2)
  ];

  isDone(clickedTask: Task) {
    clickedTask.done ? alert('This task is done') : alert('This task is not yet complete');
  }

  priorityColor(task: Task) {
    if(task.priority === 3) {
      return 'bg-danger';
    } else if(task.priority === 2) {
      return 'bg-warning';
    } else {
      return 'bg-info';
    }
  }
}
