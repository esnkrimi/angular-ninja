import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { actions } from './actions';
import { PublicationService } from '../service';

@Injectable()
export class storeEffects {
  constructor(
    private actions$: Actions,
    private publicationService$: PublicationService
  ) {}
  startFetchAuthorList: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.startFetchAuthorList),
      switchMap((result: any) => {
        return this.publicationService$
          .fetchAuthors(result.sortType)
          .pipe(
            map((res: any) =>
              actions.fetchAuthorList({ data: res, sortType: result.sortType })
            )
          );
      })
    );
  });

  startFetchArticleList: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.startFetchArticleList),
      switchMap((res: any) => {
        return this.publicationService$
          .fetchArticleList()
          .pipe(map((res: any) => actions.fetchArticleList({ data: res })));
      })
    );
  });

  startFetchCommentList: any = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.startFetchCommentList),
      switchMap((res: any) => {
        return this.publicationService$
          .fetchCommentList()
          .pipe(map((res: any) => actions.fetchCommentList({ data: res })));
      })
    );
  });
}
