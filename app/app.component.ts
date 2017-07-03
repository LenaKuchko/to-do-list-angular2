import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>To Do List {{month}}/{{day}}/{{year}}</h1>
    <h3>{{currentFocus}}</h3>
    <task-list [childTaskList]='masterTaskList' (clickSender)='editTask($event)'></task-list>
    <hr>
    <edit-task [childSelectedTask]='selectedTask' (doneButtonClickedSender)='finishedEditing()'></edit-task>
    <new-task (newTaskSender)='addTask($event)'></new-task>
  </div>
  `
})

export class AppComponent {
  currentFocus: string = 'Angular Homework';
  currentTime = new Date();
  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  year: number = this.currentTime.getFullYear();
  selectedTask = null;

  masterTaskList: Task[] = [
    new Task('Finish weekend Angular homework for Epicodus course', 3),
    new Task('Second task', 1),
    new Task('final task', 2)
  ];

  finishedEditing() {
    this.selectedTask = null;
  }

  editTask(clickedTask: Task) {
    this.selectedTask = clickedTask;
  }

  addTask(taskToAdd: Task) {
    this.masterTaskList.push(taskToAdd);
  }
}
