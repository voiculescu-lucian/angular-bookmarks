import { Bookmark } from "../interfaces/bookmark.interface";

export interface BookmarkState {
    id: number;
    title: string;
    url: string;
    createdAt: string;
}

export type CreateBookmarkPayload = Omit<
  Bookmark,
  'id' | 'createdAt'
>;