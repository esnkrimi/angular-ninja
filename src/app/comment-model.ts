export class Comment {
  id: number;
  user: string;
  title: string;
  createdOn: Date;
  constructor(props?: Partial<Comment>) {
    Object.assign(this, props);
  }
}
