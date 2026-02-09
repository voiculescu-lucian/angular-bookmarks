import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BookmarksActions from '../../../store/bookmarks.actions';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './bookmark-create.component.html',
  styleUrl: './bookmark-create.component.scss',
  selector: 'app-bookmark-create',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatLabel,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkCreateComponent {
        public readonly fb = inject(FormBuilder);
        private router = inject(Router);
        private snackBar = inject(MatSnackBar);

        public form = this.fb.nonNullable.group({
            title: ['', Validators.required],
            url: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
        });

        private readonly _store = inject(Store);

        public create(): void {
            if (this.form.invalid) {
                return;
            }

            this._store.dispatch(
                BookmarksActions.createBookmark({
                    payload: this.form.getRawValue(),
                })
            );

            this.snackBar.open(
                'Bookmark created successfully',
                'OK',
                { duration: 3000 }
            );

            this.form.reset({
                title: '',
                url: '',
            });

            this.router.navigate(['/bookmarks']);
        }
}
