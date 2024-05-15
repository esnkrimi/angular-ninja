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
  constructor(private store: Store) {}
  ngOnDestroy(): void {
    this.observableHandle.unsubscribe();
  }
  ngOnInit(): void {
    this.connectToArticlelist();
    this.connectToCommentlist();
  }
  @Output() returnToList = new EventEmitter<boolean>();
  @Input() author: Author;
  observableHandle: Subscription;
  articleList: Article[];
  commentList: Comment[];
  ngOnChanges(changes: SimpleChanges): void {}

  returnToPArentComponent() {
    this.returnToList.emit(false);
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
        console.log(this.commentList);
      });
  }
}
