import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { InMemoryDbDataService } from './services/in-memory-db-data.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { bookmarksReducer } from './store/bookmarks.reducer';
import { BookmarksEffects } from './store/bookmark.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    provideStore({
      bookmarks: bookmarksReducer
    }),
    provideEffects(BookmarksEffects),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryDbDataService, {
        delay: 300,
        apiBase: 'api/',
      })
    )
  ]
};

