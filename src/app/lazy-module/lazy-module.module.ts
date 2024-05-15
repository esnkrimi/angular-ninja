import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailsComponent } from './components/Authors/author-details.component';

@NgModule({
  declarations: [AuthorDetailsComponent],
  imports: [CommonModule],
  exports: [AuthorDetailsComponent],
})
export class LazyModuleModule {}
