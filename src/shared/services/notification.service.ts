import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _url = environment.baseUrl;
  private _httpClient = inject(HttpClient);

  notificationsAmount = new BehaviorSubject<any>([]);

  public getNotifications() {
    return this._httpClient.get<any[]>(`${this._url}/notifications`);
  }

  public createNotification(notification: any) {
    return this._httpClient.post(`${this._url}/notifications`, notification);
  }

  public clearNotifications() {
    return this._httpClient.post<[]>(`${this._url}/notifications/clear`, {});
  }
}
