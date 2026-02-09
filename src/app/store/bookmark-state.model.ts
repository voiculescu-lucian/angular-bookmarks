import { Bookmark } from "../interfaces/bookmark.interface";

export type CreateBookmarkPayload = Omit<
  Bookmark,
  'id' | 'createdAt'
>;