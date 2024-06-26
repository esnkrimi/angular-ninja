import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Author } from '../../../author-model';
import { Subscription, pipe, map } from 'rxjs';
import { selectArtice, selectComment } from '../../../+state/select';
import { Article } from '../../../article-model';
import { Comment } from '../../../comment-model';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss',
})
export class AuthorDetailsComponent implements OnChanges, OnInit, OnDestroy {
  commentPageNumber = 0;
  articePageNumber = 0;
  @Output() returnToList = new EventEmitter<boolean>();
  @Input() author: Author;
  observableHandle: Subscription;
  articleList: Article[];
  commentList: Comment[];

  constructor(private store: Store) {}
  ngOnDestroy(): void {
    this.observableHandle.unsubscribe();
  }
  ngOnInit(): void {
    this.connectToArticlelist();
    this.connectToCommentlist();
  }
  ngOnChanges(changes: SimpleChanges): void {}

  returnToPArentComponent() {
    this.returnToList.emit(false);
  }
  returnNumberToArrayForLoops(l: number) {
    const result: any = [];
    result.length = Math.max(this.articleList.length, this.commentList.length);
    return result.fill('F', 0, l + 1);
  }
  connectToArticlelist() {
    this.observableHandle = this.store
      .select(selectArtice)
      .pipe(
        map((res: any) => res.filter((res: any) => res.id === this.author.id))
      )
      .subscribe((res) => {
        this.articleList = res;
      });
  }
  openFileUploading(id: string) {
    document.getElementById(id)?.click();
  }
  connectToCommentlist() {
    this.observableHandle = this.store
      .select(selectComment)
      .pipe(
        map((res: any) => res.filter((res: any) => res.id === this.author.id))
      )
      .subscribe((res) => {
        this.commentList = res;
      });
  }
}
