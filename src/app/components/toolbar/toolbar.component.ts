import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { BookmarkSearchService } from '../../services/bookmark-search.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ToolbarComponent {
    public searchDisabled: WritableSignal<boolean> = signal<boolean>(false);
    public form = new FormGroup({
      search: new FormControl({ value: '', disabled: true }),
    });
    public readonly disabledText: string = 'Search is available only on bookmarks listings page';
    private readonly _bookmarkSearchService = inject(BookmarkSearchService);

    private destroyRef = inject(DestroyRef);

    private router = inject(Router);

    constructor() {
        this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(e => {
            const url = (e as NavigationEnd).urlAfterRedirects;
            const isBookmarksListPage = url === '/' || url === '/bookmarks';
            this.searchDisabled.set(!isBookmarksListPage);
            if (!this.searchDisabled()) {
             this.enableSearch();
            } else {
              this.disableSearch();
            }
        });
    }

    public ngOnInit(): void {
      this.form.controls.search.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(value => {
          this._bookmarkSearchService.setSearch(value ?? '');
        });
    }

    public enableSearch() {
      this.form.controls.search.enable();
    }

    public disableSearch() {
      this.form.controls.search.disable();
    }
}

