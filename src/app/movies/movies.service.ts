import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MovieResponse } from './movies';

@Injectable({providedIn: 'root'})
export class MoviesService {
  limit = 10;
  currentPage = 1;
  constructor(private api: ApiService) { }

  getMovies(page: number, title?: string): Observable<MovieResponse> {
    let url = `movies?page=${page}&limit=${this.limit}`;
    if (title) { url += `&title=${title}`; }
    return this.api.get(url);
  }
}
