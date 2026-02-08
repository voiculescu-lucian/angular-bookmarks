import { Component, inject, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { BookmarksService } from '../../services/bookmarks.service';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllBookmarks, selectBookmarksGroupedByDate } from '../../store/bookmarks.selectors';
import { loadBookmarks } from '../../store/bookmarks.actions';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss'],
    standalone: true,
    imports: [
        BookmarksListComponent,
        AsyncPipe
    ]
})
export class BookmarksComponent implements OnInit {
    public bookmarks: Array<Bookmark> = [];

    public readonly store = inject(Store);
    public bookmarksByDate$: Observable<{
        today: Array<Bookmark>,
        yesterday: Array<Bookmark>,
        older: Array<Bookmark>
    }> = this.store.select(selectBookmarksGroupedByDate);

    private readonly _bookmarksService = inject(BookmarksService);
  
    public ngOnInit(): void {
        this.store.select(selectAllBookmarks)
            .pipe(take(1))
            .subscribe(bookmarks => {
            if (!bookmarks.length) {
                this.store.dispatch(loadBookmarks());
            }
        });
    }
}
