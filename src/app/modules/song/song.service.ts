import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SongSearchParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
  genreId?: number;
  searchInLyrics?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SongService {
  private baseUrl = `${environment.url}/api/v1/songs`;

  constructor(private http: HttpClient) {}

  getSongs(params: SongSearchParams = {}): Observable<{ data: any[] }> {
    let httpParams = new HttpParams();
    if (params.pageNumber != null) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params.limit != null) httpParams = httpParams.set('limit', params.limit);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.genreId != null) httpParams = httpParams.set('genreId', params.genreId);
    if (params.searchInLyrics != null) httpParams = httpParams.set('searchInLyrics', params.searchInLyrics);
    return this.http.get<{ data: any[] }>(this.baseUrl, { params: httpParams });
  }

  getSong(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
