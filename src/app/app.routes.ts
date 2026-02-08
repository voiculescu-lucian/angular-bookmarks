import { Routes } from '@angular/router';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'bookmarks',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'bookmarks'
  },
  {
    path: 'bookmarks',
    component: BookmarksListComponent
  }
];
