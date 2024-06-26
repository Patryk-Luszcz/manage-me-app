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

  public getActiveProject(): Observable<Project> {
    return this._httpClient.get<Project>(`${this._url}/projects/active`);
  }

  public createProject(project: Project): Observable<Project> {
    console.log(project);

    return this._httpClient.post<Project>(`${this._url}/projects`, project);
  }

  public updateProject(project: Project): Observable<Project> {
    return this._httpClient.put<Project>(`${this._url}/projects`, project);
  }

  public deleteProject(projectId: number): Observable<Project> {
    return this._httpClient.delete<Project>(`${this._url}/projects/${projectId}`);
  }
}
