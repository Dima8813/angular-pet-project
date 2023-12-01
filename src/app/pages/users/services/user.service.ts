import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { UserTable } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  public getUsers(): Observable<UserTable[]> {
    return this.apiService.get<UserTable[]>(`/users`);
  }
}
