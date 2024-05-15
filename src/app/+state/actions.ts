import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Author } from '../author-model';
import { Article } from '../article-model';
import { Comment } from '../comment-model';
export const actions = createActionGroup({
  source: 'store',
  events: {
    'start add author': props<{ data: any }>(),
    'start search ': props<{ title: string }>(),
    'start fetch author list': props<{ sortType: string }>(),
    'fetch author list': props<{ data: Author[]; sortType: string }>(),
    'start fetch comment list': emptyProps(),
    'fetch comment list': props<{ data: Comment[] }>(),
    'start fetch article list': emptyProps(),
    'fetch  article list': props<{ data: Article[] }>(),
  },
});
