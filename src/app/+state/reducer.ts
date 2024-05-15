import { createFeature, createReducer, on } from '@ngrx/store';
import { AppState } from './state';
import { actions } from './actions';

export const reducerStates = createFeature({
  name: 'store',
  reducer: createReducer(
    AppState,
    on(actions.fetchAuthorList, function (states: any, action: any) {
      return {
        ...states,
        author: action.data,
      };
    }),

    on(actions.startAddAuthor, function (states: any, action: any) {
      return {
        ...states,
        author: [action.data, ...states.author],
      };
    }),

    on(actions.fetchArticleList, function (states: any, action: any) {
      return {
        ...states,
        artice: action.data,
      };
    }),

    on(actions.fetchCommentList, function (states: any, action: any) {
      return {
        ...states,
        comment: action.data,
      };
    })
  ),
});
