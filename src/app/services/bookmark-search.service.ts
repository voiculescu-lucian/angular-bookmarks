import { Injectable } from "@angular/core";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BookmarkSearchService {
  private readonly searchSubject = new BehaviorSubject<string>('');
  readonly search$ = this.searchSubject.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged()
  );;

  public setSearch(value: string): void {
    this.searchSubject.next(value);
  }
}