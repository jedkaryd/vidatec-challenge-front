import { Component, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from './movies';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnDestroy {
  movieResponse: MovieResponse = this.route.snapshot.data.movies;
  title: string = '';
  private subscription = new Subscription();

  constructor(private movies: MoviesService, private route: ActivatedRoute) { }

  changePage(next: boolean): void {
    this.movies.currentPage = next ? this.movies.currentPage +1 : this.movies.currentPage - 1;
    this.subscription.add(
      this.movies.getMovies(this.movies.currentPage)
      .pipe(
        tap((response) => {
          this.movieResponse = response;
        }),
      )
      .subscribe()
    );
  }

  filterByTitle(): void {
    this.subscription.add(
      this.movies.getMovies(this.movies.currentPage, this.title)
      .pipe(
        tap((response) => {
          this.movieResponse = response;
        }),
      )
      .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
