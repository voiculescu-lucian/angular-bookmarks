import { createReducer, on } from "@ngrx/store";
import * as BookmarksActions from './bookmarks.actions';
import { Bookmark } from "../interfaces/bookmark.interface";

export interface BookmarksState {
    bookmarks: Array<Bookmark>;
}

const initialState: BookmarksState = {
    bookmarks: []
};

export const bookmarksReducer = createReducer(
     initialState,

  on(BookmarksActions.loadBookmarks, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
  })),

  on(BookmarksActions.updateBookmark, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map((book: Bookmark) =>
      book.id === bookmark.id ? bookmark : book
    ),
  })),
);