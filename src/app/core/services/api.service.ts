import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

interface HttpClientGetOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  params?: HttpParams;
  responseType?: any;
  observe?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public get hostUrl(): string {
    return environment.baseHref;
  }

  constructor(private readonly httpService: HttpClient) {}

  public get<T>(subUrl: string, params?: HttpClientGetOptions): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.get<T>(url, params);
  }

  public post<T>(subUrl: string, data?: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.post<T>(url, data);
  }

  public patch<T>(subUrl: string, data?: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.patch<T>(url, data);
  }

  public put<T>(subUrl: string, data: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.put<T>(url, data);
  }

  public delete<T>(subUrl: string, params?: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    // @ts-ignore
    return this.httpService.delete<T>(url, params);
  }

  private getFullUrl(subUrl: string): string {
    return `${this.hostUrl}${subUrl}`;
  }
}
