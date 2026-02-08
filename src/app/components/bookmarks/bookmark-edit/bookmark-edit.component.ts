import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Bookmark } from '../../../interfaces/bookmark.interface';
import { map, Observable, switchMap } from 'rxjs';
import { selectBookmarkById } from '../../../store/bookmarks.selectors';
import { updateBookmark } from '../../../store/bookmarks.actions';
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-bookmark-edit',
    templateUrl: './bookmark-edit.component.html',
    styleUrls: ['./bookmark-edit.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ]
})
export class BookmarkEditComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private store = inject(Store);
    private router = inject(Router);

    public readonly form = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        url: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    private bookmark!: Bookmark;

    public readonly bookmark$: Observable<Bookmark | null> = this.route.paramMap.pipe(
        map(params => params.get('id')!),
        switchMap(id => this.store.select(selectBookmarkById(id)))
    );

    public ngOnInit(): void {
        this.bookmark$.subscribe((bookmark: Bookmark | null) => {
            if (!bookmark) {
                return;
            }

            this.bookmark = bookmark;
            this.form.patchValue({
                title: bookmark.title,
                url: bookmark.url
            });
        });
    }

    public save() {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(
            updateBookmark({
                bookmark: {
                ...this.bookmark,
                ...this.form.getRawValue()
                }
            })
        );

        this.router.navigate(['/bookmarks']);
    }
}
