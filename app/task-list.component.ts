import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  template: `
  <select (change)='onChange($event.target.value)'>
    <option value='allTasks'>All Tasks</option>
    <option value='completedTasks'>Completed Tasks</option>
    <option value='incompleteTasks' selected='selected'>Incomplete Tasks</option>
  </select>

  <ul>
      <li *ngFor="let currentTask of childTaskList | completeness:filterByCompleteness">{{currentTask.description}}    {{currentTask.priority}}
        <input *ngIf="currentTask.done" type="checkbox" checked (click)="toggleDone(currentTask, false)"/>
        <input *ngIf="!currentTask.done" type="checkbox" (click)="toggleDone(currentTask, true)"/>
        <button (click)="editButtonHasBeenClicked(currentTask)">Edit!</button>
      </li>
    </ul>
  `
})

export class TaskListComponent {
  @Input() childTaskList: Task[];
  @Output() clickSender = new EventEmitter();
  filterByCompleteness: string = 'incompleteTasks';

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

  editButtonClicked(taskToEdit: Task) {
    this.clickSender.emit(taskToEdit);
  }

  onChange(filterOption) {
    this.filterByCompleteness = filterOption;
  }

  toggleDone(clickedTask: Task, setCompleteness: boolean) {
    clickedTask.done = setCompleteness;
  }
}
