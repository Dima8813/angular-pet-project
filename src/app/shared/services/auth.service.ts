import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { Login, User } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_NAME = 'accessToken';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  public registration(data: User): Observable<User> {
    return this.apiService.post<User>(`/users`, data);
  }

  public login(data: User): Observable<Login> {
    return this.apiService.post<Login>(`/login`, data).pipe(
      tap((data: Login) => {
        this.setAccessToken(data.accessToken);
      })
    );
  }

  public signOut(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  private setAccessToken(accessTokenValue: string): void {
    localStorage.setItem(this.TOKEN_NAME, accessTokenValue);
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_NAME);
  }
}
