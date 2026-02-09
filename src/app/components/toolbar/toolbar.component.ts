import { Component, inject, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
    RouterModule
  ]
})
export class ToolbarComponent {
    public searchDisabled: WritableSignal<boolean> = signal<boolean>(false);
    public readonly searchedTerm: OutputEmitterRef<string> = output<string>();
    public readonly disabledText: string = 'Search is available only on bookmarks listings page';

    private router = inject(Router);

    constructor() {
        this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(e => {
            const url = (e as NavigationEnd).urlAfterRedirects;
            const isBookmarksListPage = url === '/' || url === '/bookmarks';
            this.searchDisabled.set(!isBookmarksListPage);
        });
    }
}
