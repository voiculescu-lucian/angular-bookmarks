import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as BookmarksActions from './bookmarks.actions';
import { BookmarksService } from '../services/bookmarks.service';
import { Router } from '@angular/router';

@Injectable()
export class BookmarksEffects {
  private actions$ = inject(Actions);
  private bookmarksService = inject(BookmarksService);
  private router = inject(Router);

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

  createBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.createBookmark),
      switchMap(({ payload }) =>
        this.bookmarksService.create({
          ...payload,
          createdAt: new Date().toISOString(),
        }).pipe(
          switchMap(bookmark => [
            BookmarksActions.createBookmarkSuccess({ bookmark }),
            BookmarksActions.loadBookmarks()
          ])
        )
      )
    )
  );
}
