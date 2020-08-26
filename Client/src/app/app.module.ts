import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { CurrentVoteStatusComponent } from './components/current-vote-status/current-vote-status.component';
import { ListOfVotersComponent } from './components/list-of-voters/list-of-voters.component';
import { ListOfPartiesComponent } from './components/list-of-parties/list-of-parties.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndividualVoterComponent } from './components/individual-voter/individual-voter.component';
import { IndividualPartyComponent } from './components/individual-party/individual-party.component';
import { RedirectingComponent } from './components/redirecting/redirecting.component';
import { NoVotedPipe } from './pipes/no-voted.pipe';

@NgModule({
  declarations: [
    MainComponent,
    CurrentVoteStatusComponent,
    ListOfVotersComponent,
    ListOfPartiesComponent,
    MenuComponent,
    IndividualVoterComponent,
    IndividualPartyComponent,
    RedirectingComponent,
    NoVotedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
