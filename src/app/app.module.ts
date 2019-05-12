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
import { HomePageComponent } from './home-page/home-page.component';
import { SpiritComponent } from './rover-components/spirit/spirit.component';
import { CuriosityComponent } from './rover-components/curiosity/curiosity.component';
import { OpportunityComponent } from './rover-components/opportunity/opportunity.component';

const Routes = [
  { path: '', component: HomePageComponent},
  { path: 'apod', component: APODComponent},
  { path: 'rovers', children: [
    { path: 'curiosity', component: CuriosityComponent },
    { path: 'opportunity', component: OpportunityComponent },
    { path: 'spirit', component: SpiritComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    APODComponent,
    HomePageComponent,
    SpiritComponent,
    CuriosityComponent,
    OpportunityComponent
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
