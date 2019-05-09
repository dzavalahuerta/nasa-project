import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { APODComponent } from './apod/apod.component';
import { ApodServiceService } from './services/apod-service.service';

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
    InfiniteScrollModule
  ],
  providers: [ApodServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
