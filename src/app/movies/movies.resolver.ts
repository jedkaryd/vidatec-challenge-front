import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieResponse } from './movies';
import { MoviesService } from './movies.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MoviesResolver implements Resolve<MovieResponse> {
  constructor(private movies: MoviesService, private  router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieResponse> | Promise<MovieResponse> | MovieResponse {
    return this.movies.getMovies(this.movies.currentPage).pipe(
      map((response) => {
        if (response) {
          return response;
        }
        this.redirect404();
      }),
      catchError((reason) => {
        console.error(reason);
        this.redirect404();
        return of({} as MovieResponse);
      })
    );
  }

  redirect404() {
    this.router.navigateByUrl('/');
  }
}
