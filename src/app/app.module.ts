import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducerStates } from './+state/reducer';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LazyModuleModule } from './lazy-module/lazy-module.module';
import { storeEffects } from './+state/effetcs';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './Authors/authors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDRepeatedValidatorDirective } from './Authors/validator.id';

@NgModule({
  declarations: [AppComponent, AuthorComponent,],
  imports: [
    BrowserModule,
    IDRepeatedValidatorDirective,
    AppRoutingModule,
    HttpClientModule,
    LazyModuleModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ store: reducerStates.reducer }),
    EffectsModule.forRoot([storeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
