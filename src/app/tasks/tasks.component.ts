import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTask } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;
  tasks = dummyTasks;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  onCompleteTask(taskId: string) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseNewTask() {
    this.isAddingTask = false;
  }

  onAddNewTask({ title, summary, dueDate }: NewTask) {
    this.tasks.unshift({
      id: `t${this.tasks.length + 1}`,
      userId: this.userId,
      title,
      summary,
      dueDate,
    });
    this.isAddingTask = false;
  }
}
