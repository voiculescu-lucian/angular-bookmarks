import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

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
    component: BookmarksComponent
  }
];
