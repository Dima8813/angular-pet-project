import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of, take } from 'rxjs';

import { ApiService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class UniqueNicknameValidator implements AsyncValidator {
  constructor(private apiService: ApiService) {}

  validate(
    control: AbstractControl<string | null>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.apiService
      .get<unknown[]>(`/users?username=${control.value}`)
      .pipe(
        map((users: unknown[]) => {
          return users.length === 0
            ? null
            : { uniqueNickname: { isTaken: true } };
        }),
        catchError(() => of({ uniqueNickname: { isTaken: true } })),
        take(1)
      );
  }
}
