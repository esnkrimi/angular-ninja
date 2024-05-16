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
    paginationCounterForauthorList: 3,
    showDetailsFlag: false,
    authorIndexToShowDetails: 0,
    showAddNew: false,
  };
  authorSortType: AuthorSortType;
  authorSortTypeArray: any = [];
  observableHandle: Subscription;
  formSearch = new FormGroup({
    itemToSearch: new FormControl(''),
  });
  formNewAuthor = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    totalPosts: new FormControl(0, Validators.required),
    totalComments: new FormControl(0, Validators.required),
  });

  constructor(private store: Store, private service: PublicationService) {}
  ngAfterViewInit(): void {
    this.fetchAuthorList('name');
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

    this.fetchAuthorList(sortType.value);
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
        this.service.loadingProgressFlag.next(true)
        if (res.length > 0)
          this.authorList = this.authorList.filter((result: any) =>
            this.compare(result, res)
          );
        else this.connectToAuthorlist();
        setTimeout(() => {
        this.service.loadingProgressFlag.next(false)
          
        }, 500);
      });
  }

  showDetailsOfAUthor(index: number) {
    this.componentSetting.showDetailsFlag = true;
    this.componentSetting.authorIndexToShowDetails = index;
  }
  fetchAuthorList(sortType: string) {
    this.store.dispatch(actions.startFetchAuthorList({ sortType: sortType }));
  }
  showMore() {
    this.componentSetting.loadingForShowMore = true;
    setTimeout(() => {
      this.componentSetting.paginationCounterForauthorList =
        this.authorList.length >
        this.componentSetting.paginationCounterForauthorList
          ? this.componentSetting.paginationCounterForauthorList + 3
          : this.componentSetting.paginationCounterForauthorList;
      this.componentSetting.loadingForShowMore = false;
    }, 500);
  }
  connectToAuthorlist() {
    this.observableHandle = this.store.select(selectAuthor).subscribe((res) => {
      this.authorList = res;
    });
  }
}
