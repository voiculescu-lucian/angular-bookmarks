import { Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Bookmark } from '../../../interfaces/bookmark.interface';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-bookmarks-list',
    templateUrl: './bookmarks-list.component.html',
    styleUrls: ['./bookmarks-list.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule
    ]
})
export class BookmarksListComponent {
    public title: InputSignal<string> = input<string>('');
    public bookmarks: InputSignal<Array<Bookmark>> = input.required<Array<Bookmark>>();
}
