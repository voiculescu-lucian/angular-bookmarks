import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../interfaces/bookmark.interface';

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

