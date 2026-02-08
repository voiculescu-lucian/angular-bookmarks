import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";
import { selectBookmarkById } from "../store/bookmarks.selectors";

export const bookmarkExistsGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  return store.select(selectBookmarkById(id)).pipe(
    take(1),
    map(bookmark => {
      if (!bookmark) {
        router.navigate(['/bookmarks']);
        return false;
      }
      return true;
    })
  );
};