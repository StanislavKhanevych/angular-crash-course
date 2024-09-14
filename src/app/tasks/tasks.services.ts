import { Injectable } from '@angular/core';
import { dummyTasks } from '../dummy-tasks';
import { Task, NewTask } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = dummyTasks;

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask({ title, summary, dueDate }: NewTask, userId: string) {
    this.tasks.unshift({
      id: `t${this.tasks.length + 1}`,
      userId: userId,
      title,
      summary,
      dueDate,
    });
    this.saveTasks();
  }

  removeTask(taskId: string) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
