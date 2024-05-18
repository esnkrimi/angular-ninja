import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { PublicationService } from '../service';
import { Subscription, filter, map } from 'rxjs';
import { selectAuthor } from '../+state/select';
import { Author } from '../author-model';

@Directive({
  selector: '[repeatedID]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IDRepeatedValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class IDRepeatedValidatorDirective
  implements Validator, OnInit, OnDestroy
{
  @Input('ID') ID = '';
  authorList: any;
  observableHandle: Subscription;
  constructor(
    private store: Store,
    private el: ElementRef
  ) {}
  ngOnDestroy(): void {
    this.observableHandle.unsubscribe();
  }
  ngOnInit(): void {}
  public validate(control: AbstractControl): ValidationErrors | null {
    this.observableHandle = this.store
      .select(selectAuthor)
      .pipe(
        map((res: any) => res.filter((res: any) => res.id === control.value))
      )
      .subscribe((res) => {
        let result =
          res.length === 0 ? null : { repeated: { value: control.value } };
        if (result) {
          this.el.nativeElement.style.backgroundColor = 'red';
          this.el.nativeElement.style.color = 'white';
        } else {
          this.el.nativeElement.style.backgroundColor = 'white';
          this.el.nativeElement.style.color = 'green';
          this.el.nativeElement.style.border = 'solid 1px green';
        }
        return result;
      });
    return null;
  }
}
