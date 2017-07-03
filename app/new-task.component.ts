import {Component, Output, EventEmitter} from '@angular/core';
import {Task} from './task.model';

@Component({
  selector: 'new-task',
  template: `
  <h1>New Task</h1>
  <div>
    <label>Enter Task Description:</label>
    <input #newDescription>
  </div>
  <div>
    <label>Task Priority:</label>
    <select #newPriority>
      <option [value]="1"> Low Priority </option>
      <option [value]="2"> Medium Priority </option>
      <option [value]="3"> High Priority </option>
    </select>
    <button class='btn' (click)='submitForm(newDescription.value, newPriority.value); newDescription.value =""'>Add new Task</button>
  </div>
  `
})

export class NewTaskComponent {
  @Output() newTaskSender = new EventEmitter();

  submitForm(description: string, priority: number) {
    const newTaskToAdd: Task = new Task(description, priority);
    this.newTaskSender.emit(newTaskToAdd);
  }
}
