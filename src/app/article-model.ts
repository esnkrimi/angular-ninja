export class Article {
  id: number;
  type: ArticleType;
  title: string;
  createdOn: Date;
  constructor(props?: Partial<Article>) {
    Object.assign(this, props);
  }
}

export enum ArticleType {
  Article = 'ARTICLE',
  Book = 'BOOK',
}
