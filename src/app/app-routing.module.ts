import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MoviesAddComponent } from './movies-add/movies-add.component';
import { MoviesResolver } from './movies/movies.resolver';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieDetailResolver } from './movie-detail/movie-detail.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full'},
  {
    path: 'movies',
    component: MoviesComponent,
    data: { title: 'List of Movies' },
    resolve: {
      movies: MoviesResolver
    }
  },
  {
    path: 'movies-add',
    component: MoviesAddComponent,
    data: { title: 'Load Movies' }
  },
  { 
    path: 'movies/:id',
    component: MovieDetailComponent,
    data: { title: 'Retrieve a Movie' },
    resolve: {
      movie: MovieDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
