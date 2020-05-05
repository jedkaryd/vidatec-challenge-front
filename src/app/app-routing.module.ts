import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MoviesAddComponent } from './movies-add/movies-add.component';
import { MoviesResolver } from './movies/movies.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
