import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { FunctionalityService } from '../../../../shared/services/functionality.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../../shared/services/project.service';
import { Task } from '../../../../shared/interfaces/task.interface';
import { MatTooltip } from '@angular/material/tooltip';
import { ActionsStrategyService } from '../../../../shared/services/actions-strategy/actions-strategy.service';
import { Functionality } from '../../../../shared/interfaces/functionality.inteface';
import { TaskService } from '../../../../shared/services/task.service';
import { TitleCasePipe } from '@angular/common';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DragDropModule, NgFor, MatTooltip, TitleCasePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  private _projectService = inject(ProjectService);
  private _functionalityService = inject(FunctionalityService);
  private _modal = inject(MatDialog);
  private _actionsStrategyService = inject(ActionsStrategyService);
  private _taskService = inject(TaskService);
  private _notificationService = inject(NotificationService);

  taskStates: Record<string, string> = {
    todo: 'RED',
    doing: 'ORANGE',
    done: 'GREEN',
  };

  priorityStates: Record<string, string> = {
    high: 'RED',
    medium: 'ORANGE',
    low: 'GREEN',
  };

  activeProject = toSignal(this._projectService.getActiveProject());

  functionalities = signal([] as Functionality[]);

  public ngOnInit() {
    this._getFunctionalities();
  }

  public isAlertState(state: string) {
    return this.taskStates[state];
  }

  public isAlertPriority(priority: string) {
    return this.priorityStates[priority];
  }

  public onCardDrop(event: CdkDragDrop<any[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;

    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
      return;
    }

    const currentTask = previousContainer.data[previousIndex];

    if (['doing', 'done'].includes(container.id) && currentTask.assignedUsers.length === 0) {
      alert('Task with state doing or done requires an assigned user');
      return;
    }

    if (container.id === 'done') {
      currentTask.state = 'done';
    } else if (container.id === 'doing') {
      currentTask.state = 'doing';
    } else if (container.id === 'todo') {
      currentTask.state = 'todo';
    }

    this._taskService.updateTaskState(currentTask.functionalityId, currentTask).subscribe({
      next: () => this._getFunctionalities(),
      error: () => alert('Error'),
    });

    transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
  }

  private _getFunctionalities() {
    this._functionalityService
      .getFunctionalities()
      .pipe(
        map((functionalities) =>
          functionalities.filter(({ projectId }) => projectId === this.activeProject()?.id)
        )
      )
      .subscribe((funcionalities) => {
        this.functionalities.set(funcionalities);

        this.todoTasks = this._categorizeTasks(funcionalities, 'todo');
        this.inProgressTasks = this._categorizeTasks(funcionalities, 'doing');
        this.doneTasks = this._categorizeTasks(funcionalities, 'done');
      });
  }

  private _categorizeTasks(functionalities: Functionality[], state: string) {
    return functionalities
      .flatMap(({ tasks }) => tasks)
      .filter((task: Task) => task.state === state);
  }

  public handleOperationType({ actionType, item }: { actionType: string; item?: Task }) {
    const action = `${actionType}_TASK`;
    const component = this._actionsStrategyService.actionStrategyHandler(action);

    const modalRef = this._modal.open(component, {
      data: {
        title: action,
        task: item,
        functionalities: this.functionalities(),
        alertInfo: 'Are you sure you want to delete this task ?',
      },
      minWidth: '60vw',
    });

    modalRef.afterClosed().subscribe((payload) => {
      if (!payload) return;

      if (action === 'DELETE_TASK') {
        this._taskService.deleteTask(item!.id, item!.functionalityId).subscribe({
          next: () => this._getFunctionalities(),
          error: (error) => alert(error.message),
        });
      }

      if (action === 'ADD_TASK') {
        this._taskService.createTask(payload).subscribe({
          next: (task) => {
            if (task.assignedUsers.length !== 0 && ['medium', 'high'].includes(task.priority)) {
              const message = {
                taskName: task.name,
                message: `User assigned to task ${task.name}`,
                priority: task.priority,
                assignedUsers: task.assignedUsers,
              };

              this._notificationService.notificationsAmount.next(message);
              this._notificationService.createNotification(message).subscribe();
            }

            this._getFunctionalities();
          },
          error: (error) => alert(error.message),
        });
      }

      if (action === 'EDIT_TASK') {
        this._taskService.updateTask(payload).subscribe({
          next: () => this._getFunctionalities(),
          error: (error) => alert(error.message),
        });
      }
    });
  }
}
