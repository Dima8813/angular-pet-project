import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { AdminTable } from '../interfaces';

@Injectable()
export class AdminServices {
  constructor(private apiService: ApiService) {}

  public getAdmins(): Observable<AdminTable[]> {
    return this.apiService.get<AdminTable[]>(`/admins`);
  }
}
