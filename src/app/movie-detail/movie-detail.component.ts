import { Component, OnInit } from '@angular/core';
import { MovieDetail } from './movie-detail';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from './movie-detail.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  constructor(private movie: MovieDetailService, private route: ActivatedRoute) { }
  movieDetail: MovieDetail = this.route.snapshot.data.movie;

  ngOnInit(): void {
  }
}
