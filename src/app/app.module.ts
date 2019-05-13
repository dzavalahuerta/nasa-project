import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { APODComponent } from './apod/apod.component';
import { ServerService } from './services/server.service';
import { CrossComponentCommunicationService } from './services/cross-component-communication.service';

const Routes = [
  { path: '', component: APODComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    APODComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers: [ServerService, CrossComponentCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
