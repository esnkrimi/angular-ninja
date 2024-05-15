import { Article } from '../article-model';
import { Author } from '../author-model';
import { Comment } from '../comment-model';

export interface state {
  author: Author[];
  comment: Comment[];
  artice: Article[];
}

export const AppState: state = {
  author: [],
  comment: [],
  artice: [],
};
