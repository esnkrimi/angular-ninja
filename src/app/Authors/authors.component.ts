import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from '../+state/actions';
import { selectAuthor } from '../+state/select';
import { Author, AuthorSortType } from '../author-model';
import { Subscription, debounceTime, filter, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicationService } from '../service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent implements AfterViewInit, OnDestroy, OnInit {
  authorList: Author[];
  componentSetting = {
    loadingForShowMore: false,
    paginationCounterForauthorList: 4,
    showDetailsFlag: false,
    authorIndexToShowDetails: 0,
    showAddNew: false,
    sort: '',
  };
  authorSortType: AuthorSortType;
  authorSortTypeArray: any = [];
  observableHandle: Subscription;
  formSearch = new FormGroup({
    itemToSearch: new FormControl(''),
  });
  formNewAuthor = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    totalPosts: new FormControl(Validators.required),
    totalComments: new FormControl(Validators.required),
  });

  constructor(private store: Store, private service: PublicationService) {}
  ngAfterViewInit(): void {
    this.fetchAuthorList('name', 4);
    this.connectToAuthorlist();
    this.listenToSearchInput();
  }
  addNewAuthor() {
    this.service.loadingProgressFlag.next(true);
    this.store.dispatch(
      actions.startAddAuthor({ data: this.formNewAuthor.value })
    );
    this.componentSetting.showAddNew = false;
    setTimeout(() => {
      this.service.loadingProgressFlag.next(false);
    }, 500);
  }
  sort(sortType: any) {
    this.service.loadingProgressFlag.next(true);
    this.componentSetting.sort = sortType.value;
    this.fetchAuthorList(
      sortType.value,
      this.componentSetting.paginationCounterForauthorList
    );
    setTimeout(() => {
      this.service.loadingProgressFlag.next(false);
    }, 500);
  }

  ngOnDestroy(): void {
    this.observableHandle.unsubscribe();
  }
  ngOnInit(): void {
    this.authorSortTypeArray = Object.keys(AuthorSortType);
  }
  compare(row: any, itemToSearch: any) {
    return (
      String(row.name.toLocaleLowerCase()).includes(
        String(itemToSearch.toLocaleLowerCase())
      ) || String(row.id) === String(itemToSearch)
    );
  }
  returnToList() {
    this.componentSetting.showDetailsFlag = false;
    this.componentSetting.authorIndexToShowDetails = 0;
  }
  listenToSearchInput() {
    this.formSearch
      .get('itemToSearch')
      ?.valueChanges.pipe(debounceTime(200))
      .subscribe((res: any) => {
        this.service.loadingProgressFlag.next(true);
        if (res.length > 0)
          this.authorList = this.authorList.filter((result: any) =>
            this.compare(result, res)
          );
        else this.connectToAuthorlist();
        setTimeout(() => {
          this.service.loadingProgressFlag.next(false);
        }, 500);
      });
  }

  showDetailsOfAUthor(index: number) {
    this.componentSetting.showDetailsFlag = true;
    this.componentSetting.authorIndexToShowDetails = index;
  }
  fetchAuthorList(sortType: string, len: number) {
    this.store.dispatch(
      actions.startFetchAuthorList({ sortType: sortType, lengths: len })
    );
  }
  showMore() {
    this.componentSetting.loadingForShowMore = true;
    setTimeout(() => {
      this.componentSetting.paginationCounterForauthorList =
        this.componentSetting.paginationCounterForauthorList + 4;
      this.fetchAuthorList(
        this.componentSetting.sort,
        this.componentSetting.paginationCounterForauthorList
      );
      this.componentSetting.loadingForShowMore = false;
    }, 1000);
  }
  connectToAuthorlist() {
    this.observableHandle = this.store.select(selectAuthor).subscribe((res) => {
      this.authorList = res;
    });
  }
}
