import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from './movies';
import { MoviesService } from './movies.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnDestroy, OnInit {
  movieResponse: MovieResponse = this.route.snapshot.data.movies;
  title = '';
  form: FormGroup = this.buildForm();
  private subscription = new Subscription();

  constructor(private movies: MoviesService, private route: ActivatedRoute, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.subscribeToValuesChanges();
  }

  subscribeToValuesChanges(): void {
    this.subscription.add(
      this.form.controls.title.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((title) => this.filterByTitle(title)),
        tap((movieResponse) => this.movieResponse = movieResponse),
      )
      .subscribe({
        error: (reason) => {
          console.error(reason);
        }
      })
    );
  }

  buildForm(): FormGroup {
    return this.builder.group({
      title: ['']
    });
  }

  changePage(next: boolean): void {
    this.movies.currentPage = next ? this.movies.currentPage + 1 : this.movies.currentPage - 1;
    this.subscription.add(
      this.movies.getMovies(this.movies.currentPage)
      .pipe(
        tap((movieResponse) => this.movieResponse = movieResponse),
      )
      .subscribe({
        error: (reason) => {
          console.error(reason);
        }
      })
    );
  }

  filterByTitle(title: string): Observable<MovieResponse> {
    return this.movies.getMovies(this.movies.currentPage, title);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
