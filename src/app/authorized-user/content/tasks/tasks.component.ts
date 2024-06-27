import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { FunctionalityService } from '../../../../shared/services/functionality.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DragDropModule, NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];

  private _functionalityService = inject(FunctionalityService);
  functionalities$ = this._functionalityService.getFunctionalities().pipe();

  projectName!: string;
  projectId!: number;

  constructor(public modal: MatDialog) {}

  public isAlertState(task: any): string {
    if (task.state === 'todo') return 'RED';
    else if (task.state === 'doing') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  public isAlertPriority(task: any): string {
    if (task.priority === 'high') return 'RED';
    else if (task.priority === 'medium') return 'ORANGE';
    else {
      return 'GREEN';
    }
  }

  public onCardDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      setTimeout(() => {
        const currentTask = event.container.data[event.currentIndex];

        if (event.container.id === 'done') {
          currentTask.state = 'done';
        } else if (event.container.id === 'doing') {
          currentTask.state = 'doing';
        } else if (event.container.id === 'todo') {
          currentTask.state = 'todo';
        }

        // this._taskService.updateTaskState(currentTask.functionalityId, currentTask).subscribe();
      }, 0);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
