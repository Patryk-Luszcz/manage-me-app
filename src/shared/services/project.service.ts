import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, catchError } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _url = environment.baseUrl;
  private _httpClient = inject(HttpClient);

  public getProjects(): Observable<Project[]> {
    return this._httpClient.get<Project[]>(`${this._url}/projects`).pipe(
      catchError((error) => {
        throw new Error(error);
      })
    );
  }
}
