import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/services';

@Injectable()
export class SkillsService {
  constructor(private apiService: ApiService) {}

  public getSkills(): Observable<string[]> {
    return this.apiService.get<string[]>(`/skills`);
  }
}
