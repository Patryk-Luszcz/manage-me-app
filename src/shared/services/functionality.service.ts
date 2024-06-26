import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { Functionality } from '../interfaces/functionality.inteface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityService {
  private _url = environment.baseUrl;

  private _httpClient = inject(HttpClient);

  public getFunctionalities() {
    return this._httpClient.get<Functionality[]>(`${this._url}/functionalities`);
  }

  public createFunctionality(functionality: Functionality): Observable<Functionality> {
    return this._httpClient.post<Functionality>(`${this._url}/functionalities`, functionality);
  }

  public updateFunctionality(functionality: Functionality): Observable<Functionality> {
    return this._httpClient.put<Functionality>(`${this._url}/functionalities`, functionality);
  }

  public deleteFunctionality(functionalityId: number): Observable<Functionality> {
    return this._httpClient.delete<Functionality>(
      `${this._url}/functionalities/${functionalityId}`
    );
  }
}
