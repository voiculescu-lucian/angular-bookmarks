import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDbDataService implements InMemoryDbService {
  public createDb() {
    // Set date for tody
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Set date for yesterday, last week and older
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const olderDate = new Date(today);
    olderDate.setDate(today.getDate() - 30);

    const bookmarks = [
        // today
        { id: 1, title: 'Angular', url: 'https://angular.io', createdAt: today },
        { id: 2, title: 'Angular Dev', url: 'https://angular.dev/', createdAt: today },
        // yesterday
        { id: 3, title: 'NgRx', url: 'https://ngrx.io/', createdAt: yesterday },
        // lastWeek
        { id: 4, title: 'Typescript', url: 'https://www.typescriptlang.org/', createdAt: lastWeek },
        // older
        { id: 5, title: 'RxJS', url: 'https://rxjs.dev/', createdAt: new Date(olderDate) },
        { id: 6, title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', createdAt: new Date(olderDate) },
        { id: 7, title: 'JavaScript Info', url: 'https://javascript.info/', createdAt: new Date(olderDate) },
        { id: 8, title: 'CSS Tricks', url: 'https://css-tricks.com/', createdAt: new Date(olderDate) },
        { id: 9, title: 'Stack Overflow', url: 'https://stackoverflow.com/', createdAt: new Date(olderDate) },
        { id: 10, title: 'Frontend Masters', url: 'https://frontendmasters.com/', createdAt: new Date(olderDate) }
    ];

    return { bookmarks };
  }
}