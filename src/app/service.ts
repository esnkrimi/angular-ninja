import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  loadingProgressFlag=new BehaviorSubject(false)
  baseUrl = 'assets/datas/';
  constructor(private http: HttpClient) {}

  fetchAuthors(sortType: any) {
    return this.http
      .get(this.baseUrl + 'author-base.json')
      .pipe(
        map((res: any) =>
          res.sort((a: any, b: any) => a[sortType] - b[sortType])
        )
      );
  }
  sortAuthors() {}
  fetchArticleList() {
    return this.http.get(this.baseUrl + 'articel-base-ts.json');
  }
  fetchCommentList() {
    return this.http.get(this.baseUrl + 'comment-base-ts.json');
  }
}
