import { Component, OnInit } from '@angular/core';
import { MovieDetail } from './movie-detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent  {
  movieDetail: MovieDetail = this.route.snapshot.data.movie;
  constructor(private route: ActivatedRoute) { }
}
