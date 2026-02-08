import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as BookmarksActions from './bookmarks.actions';
import { BookmarksService } from '../services/bookmarks.service';

@Injectable()
export class BookmarksEffects {
  private actions$ = inject(Actions);
  private bookmarksService = inject(BookmarksService);

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.loadBookmarks),
      switchMap(() =>
        this.bookmarksService.list().pipe(
          map(bookmarks =>
            BookmarksActions.loadBookmarksSuccess({ bookmarks })
          )
        )
      )
    )
  );
}
