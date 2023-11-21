import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';

import { ClinicTable } from '../interfaces';

@Injectable()
export class ClinicService {
  constructor(private apiService: ApiService) {}

  public getClinics(): Observable<ClinicTable[]> {
    return this.apiService.get<ClinicTable[]>(`/clinics`);
  }

  public addClinic(payload: Omit<ClinicTable, 'id'>): Observable<ClinicTable> {
    return this.apiService.post<ClinicTable>(`/clinics`, payload);
  }

  public editClinic(
    id: number,
    payload: Omit<ClinicTable, 'id'>
  ): Observable<ClinicTable> {
    return this.apiService.put<ClinicTable>(`/clinics/${id}`, payload);
  }

  public deleteClinic(id: number): Observable<unknown> {
    return this.apiService.delete<unknown>(`/clinics/${id}`);
  }
}
