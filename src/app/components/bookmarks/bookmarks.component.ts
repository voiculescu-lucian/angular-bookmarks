import { Component, inject, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllBookmarks, selectBookmarksGroupedByDate } from '../../store/bookmarks.selectors';
import { loadBookmarks } from '../../store/bookmarks.actions';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkSearchService } from '../../services/bookmark-search.service';

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
    public readonly _searchService = inject(BookmarkSearchService);

    public bookmarksByDate$: Observable<{
        today: Array<Bookmark>,
        yesterday: Array<Bookmark>,
        older: Array<Bookmark>
    }> = combineLatest([
            this.store.select(selectBookmarksGroupedByDate),
            this._searchService.search$
        ]).pipe(
        map(([grouped, search]) => {
            if (!search || !search.trim()) {
            return grouped;
            }

            const term = search.toLowerCase();

            return {
            today: grouped.today.filter(b =>
                b.title.toLowerCase().includes(term) ||
                b.url.toLowerCase().includes(term)
            ),
            yesterday: grouped.yesterday.filter(b =>
                b.title.toLowerCase().includes(term) ||
                b.url.toLowerCase().includes(term)
            ),
            older: grouped.older.filter(b =>
                b.title.toLowerCase().includes(term) ||
                b.url.toLowerCase().includes(term)
            )
            };
        })
    );

    private readonly _bookmarkSearchService = inject(BookmarkSearchService);
  
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
