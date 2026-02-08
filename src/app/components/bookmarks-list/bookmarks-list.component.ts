import { Component, inject, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { BookmarksService } from '../../services/bookmarks.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBookmarksGroupedByDate } from '../../store/bookmarks.selectors';
import { loadBookmarks } from '../../store/bookmarks.actions';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe
  ]
})
export class BookmarksListComponent implements OnInit {
    public bookmarks: Array<Bookmark> = [];

    public readonly store = inject(Store);
    public bookmarksByDate$: Observable<{
        today: Array<Bookmark>,
        yesterday: Array<Bookmark>,
        older: Array<Bookmark>
    }> = this.store.select(selectBookmarksGroupedByDate);

    private readonly _bookmarksService = inject(BookmarksService);
  
    public ngOnInit(): void {
        this._bookmarksService.list().subscribe({
            next: (bookmarks: Array<Bookmark>) => {
                this.store.dispatch(loadBookmarks({ bookmarks }));
            },
            error: (error) => {
                console.error('Error fetching bookmarks:', error);
            }
        });
    }
}
