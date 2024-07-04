import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _url = environment.baseUrl;

  private _httpClient = inject(HttpClient);

  public createTask(task: Task): Observable<Task> {
    return this._httpClient.post<Task>(`${this._url}/task`, task);
  }

  public updateTask(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this._url}/task`, task);
  }

  public updateTaskState(functionalityId: number, currentTask: Task) {
    const payload = {
      id: currentTask.id,
      state: currentTask.state,
      functionalityId: functionalityId,
    };

    return this._httpClient.put(`${this._url}/task/state`, payload);
  }

  public deleteTask(taskId: number): Observable<Task> {
    return this._httpClient.delete<Task>(`${this._url}/task/${taskId}`);
  }
}
