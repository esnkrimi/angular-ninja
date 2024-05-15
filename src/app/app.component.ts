import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthor } from './+state/select';
import { actions } from './+state/actions';
import { PublicationService } from './service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  loadingProgressFlag = false;
  subscribe: Subscription;
  constructor(
    private store: Store,
    private publicationService: PublicationService
  ) {}
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.fetchCommentList();
    this.fetchArticleList();
    this.listenToLoadingProgressFlag();
  }

  fetchArticleList() {
    this.store.dispatch(actions.startFetchArticleList());
  }
  fetchCommentList() {
    this.store.dispatch(actions.startFetchCommentList());
  }
  listenToLoadingProgressFlag() {
    this.subscribe = this.publicationService.loadingProgressFlag.subscribe(
      (res) => {
        this.loadingProgressFlag = res;
      }
    );
  }
}
