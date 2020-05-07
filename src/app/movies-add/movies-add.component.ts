import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesAddService } from './movies-add.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnDestroy {
  uploadForm: FormGroup =  this.buildForm();
  private subscription = new Subscription();
  constructor(private movies: MoviesAddService, private formBuilder: FormBuilder) { }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      movies: ['']
    });
  }

  onFileSelect(target: HTMLInputElement): void {
    if (target.files.length > 0) {
      const file = target.files[0];
      this.uploadForm.get('movies').setValue(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('movies').value);
    this.movies.postMovies(formData)
    .subscribe(
      {
       error: (reason) => {
          console.error(reason);
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
