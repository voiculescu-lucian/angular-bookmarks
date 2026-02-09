import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { bookmarkExistsGuard } from './guards/bookmark-exists.guard';

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
    children: [
      {
        path: '',
        component: BookmarksComponent
      },
      {
        path: 'create',
        loadComponent: () =>
        import('./components/bookmarks/bookmark-create/bookmark-create.component')
          .then(m => m.BookmarkCreateComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
        import('./components/bookmarks/bookmark-edit/bookmark-edit.component')
          .then(m => m.BookmarkEditComponent),
        canActivate: [bookmarkExistsGuard]
      },
    ],
  }
];
