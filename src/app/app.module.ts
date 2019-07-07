import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { APODComponent } from './NASA-api-content/apod/apod.component';
import { HomePageComponent } from './user-authorization/home-page/home-page.component';
import { SpiritComponent } from './NASA-api-content/rover-components/spirit/spirit.component';
import { CuriosityComponent } from './NASA-api-content/rover-components/curiosity/curiosity.component';
import { OpportunityComponent } from './NASA-api-content/rover-components/opportunity/opportunity.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { NasaApiService } from './NASA-api-content/nasa-api.service';
import { CrossComponentCommunicationService } from './shared/cross-component-communication.service';
import { UserAuthenticationService } from './user-authorization/userAuthentication.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AccountSettingsComponent } from './user-account/account-settings/account-settings.component';
import { LinkSocialMediaComponent } from './user-account/link-social-media/link-social-media.component';
import { ProfileComponent } from './user-account/profile/profile.component';
import { AuthGuard } from './user-authorization/auth.guard';
import { ContentGuard } from './user-authorization/content.guard';
 
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("85125835769-l28qhq37n2no2icmh1ci2iuukf63qvcd.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("486709232093181")
  }
]);
 
export function provideConfig() {
  return config;
}

const Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'apod', component: APODComponent, canActivate: [ContentGuard]},
  { path: 'rovers', children: [
    {path: '', redirectTo: 'curiosity', pathMatch: 'full'},
    { path: 'curiosity', component: CuriosityComponent, canActivate: [ContentGuard] },
    { path: 'opportunity', component: OpportunityComponent, canActivate: [ContentGuard] },
    { path: 'spirit', component: SpiritComponent, canActivate: [ContentGuard] }
  ]},
  { path: 'account-settings', component: AccountSettingsComponent, canActivate :[ContentGuard], children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    { path: 'profile', component: ProfileComponent, canActivate: [ContentGuard] },
    { path: 'link-social-media', component: LinkSocialMediaComponent, canActivate: [ContentGuard] }
  ]},
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    APODComponent,
    HomePageComponent,
    SpiritComponent,
    CuriosityComponent,
    OpportunityComponent,
    PageNotFoundComponent,
    AccountSettingsComponent,
    LinkSocialMediaComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [NasaApiService, CrossComponentCommunicationService, UserAuthenticationService,
    {provide: AuthServiceConfig, useFactory: provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
