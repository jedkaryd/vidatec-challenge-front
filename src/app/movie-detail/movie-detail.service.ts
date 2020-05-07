import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MovieDetail } from './movie-detail';

@Injectable({providedIn: 'root'})
export class MovieDetailService {
  constructor(private api: ApiService) { }

  getMovie(movieId: string): Observable<MovieDetail> {
    return this.api.get(`movies/${movieId}`);
  }
}
