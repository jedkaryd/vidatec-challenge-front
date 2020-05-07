import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieDetail } from './movie-detail';
import { MovieDetailService } from './movie-detail.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieDetailResolver implements Resolve<MovieDetail> {
  constructor(private movie: MovieDetailService, private  router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieDetail> | Promise<MovieDetail> | MovieDetail {
    return this.movie.getMovie(route.params.id).pipe(
      map((response) => {
        if (response) {
          return response;
        }
        this.redirect404();
      }),
      catchError((reason) => {
        console.error(reason);
        this.redirect404();
        return of({} as MovieDetail);
      })
    );
  }

  redirect404(): void {
    this.router.navigateByUrl('/');
  }
}
