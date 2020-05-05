import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MovieResponse } from './movies';

@Injectable({providedIn: 'root'})
export class MoviesService {
  limit: number = 10;
  currentPage: number = 1;
  constructor(private api: ApiService) { }

  getMovies(page: number): Observable<MovieResponse> {
    return this.api.get(`movies?page=${page}&limit=${this.limit}`);
  }
}
