import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriorityConstants } from '../../../../../shared/constants/priority.constansts';
import { StatusConstants } from '../../../../../shared/constants/status.constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from '../../../../../shared/components/modals/modal/modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../../../../shared/services/user.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { Task } from '../../../../../shared/interfaces/task.interface';

@Component({
  selector: 'app-tasks-edit-modal',
  standalone: true,
  imports: [
    ModalComponent,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerModule,
    AsyncPipe,
    MatFormFieldModule,
    NgFor,
    MatSelectModule,
    TitleCasePipe,
  ],
  templateUrl: './tasks-edit-modal.component.html',
  styleUrl: './tasks-edit-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class TasksEditModalComponent implements OnInit {
  statuses = StatusConstants.statuses;
  priorities = PriorityConstants.priorities;

  users$ = inject(UserService).getUsers();

  private _modalRef = inject(MatDialogRef);
  private _formBuilder = inject(FormBuilder);

  modalData = inject(MAT_DIALOG_DATA);

  taskForm = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    state: ['', Validators.required],
    taskBelongToFunctionality: ['', Validators.required],
    assignedUsers: [[] as string[]],
    priority: ['', Validators.required],
    predictedExecutionTime: ['', Validators.required],
  });

  public ngOnInit(): void {
    if (this.modalData?.task) {
      this._updateForm(this.modalData.task);
    }
  }

  private _updateForm(task: Task) {
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      state: task.state,
      taskBelongToFunctionality: task.taskBelongToFunctionality,
      assignedUsers: task.assignedUsers,
      priority: task.priority,
      predictedExecutionTime: task.predictedExecutionTime,
    });
  }

  public saveTask(): void {
    const { state, assignedUsers } = this.taskForm.getRawValue();

    if (['doing', 'done'].includes(state) && assignedUsers.length === 0) {
      alert('Task with state doing required assigned user');
      return;
    }

    const payload: any = {
      ...this.taskForm.getRawValue(),
    };

    if (this.modalData.task) {
      payload.id = this.modalData.task.id;
      payload.functionalityId = this.modalData.task.functionalityId;
      payload.dateAdded = this.modalData.task.dateAdded;
      payload.dateStart = this.modalData.task.dateStart;
      payload.dateEnd = this.modalData.task.dateEnd;
    }

    this._modalRef.close(payload);
  }
}
