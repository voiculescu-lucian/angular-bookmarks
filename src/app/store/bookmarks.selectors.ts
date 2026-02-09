import { createSelector } from "@ngrx/store";
import { BookmarksState } from "./bookmarks.reducer";
import { startOfDay } from "../utils/date.utils";
import { Bookmark } from "../interfaces/bookmark.interface";

export const selectBookmarksState = (state: any): BookmarksState =>
  state.bookmarks;

export const selectAllBookmarks = createSelector(
  selectBookmarksState,
  (state) => state?.bookmarks ?? []
);

export const selectBookmarksGroupedByDate = createSelector(
  selectAllBookmarks,
  (bookmarks) => {
    const timeToday = startOfDay(new Date());
    const timeYesterday = new Date(timeToday);
    timeYesterday.setDate(timeToday.getDate() - 1);
    return {
      today: bookmarks.filter((bookmark: Bookmark) =>
        startOfDay(new Date(bookmark.createdAt)).getTime() === timeToday.getTime()
      ),
      yesterday: bookmarks.filter((bookmark: Bookmark) =>
        startOfDay(new Date(bookmark.createdAt)).getTime() === timeYesterday.getTime()
      ),
      older: bookmarks.filter((bookmark: Bookmark) =>
        startOfDay(new Date(bookmark.createdAt)).getTime() < timeYesterday.getTime()
      )
    };
  }
);

export const selectBookmarkById = (id: string) =>
  createSelector(
    selectAllBookmarks,
    bookmarks => bookmarks.find(bookmark => bookmark.id === Number(id)) ?? null
  );
