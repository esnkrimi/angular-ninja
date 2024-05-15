export class Author {
  id: number;
  name: string;
  imageUrl: string;
  totalPosts: number;
  totalComments: number;
  constructor(props?: Partial<Author>) {
    Object.assign(this, props);
  }
}

export enum AuthorSortType {
  name = 'name',
  totalPosts = 'total-posts',
  totalComments = 'total-comments',
}
