import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../interfaces/bookmark.interface';
import { CreateBookmarkPayload } from './bookmark-state.model';

export const loadBookmarks = createAction(
  '[Bookmarks API] Load'
);

export const loadBookmarksSuccess = createAction(
  '[Bookmarks API] Load Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const updateBookmark = createAction(
  '[Bookmarks] Update',
  props<{ bookmark: Bookmark }>()
);

export const createBookmark = createAction(
  '[Bookmarks] Create',
  props<{ payload: CreateBookmarkPayload }>()
);

export const createBookmarkSuccess = createAction(
  '[Bookmarks] Create Success',
  props<{ bookmark: Bookmark }>()
);