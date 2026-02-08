import { Injectable } from "@angular/core";
import { Bookmark } from "../interfaces/bookmark.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private apiUrl = '/api/bookmarks';

  constructor(private http: HttpClient) {}

  public list(): Observable<Array<Bookmark>> {
    return this.http.get<Array<Bookmark>>(this.apiUrl);
  }

  public getById(id: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.apiUrl}/${id}`);
  }

  public create(bookmark: Omit<Bookmark, 'id'>) {
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  public update(bookmark: Bookmark) {
    return this.http.put<Bookmark>(`${this.apiUrl}/${bookmark.id}`, bookmark);
  }

  public delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}