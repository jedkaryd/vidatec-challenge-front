import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MoviesAddService {
  constructor(private api: ApiService) { }

  postMovies(formData): Observable<any>  {
    return this.api.upload(`movies`, formData);
  }
}
