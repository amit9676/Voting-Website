import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentVoteStatusComponent } from './components/current-vote-status/current-vote-status.component';
import { ListOfVotersComponent } from './components/list-of-voters/list-of-voters.component';
import { ListOfPartiesComponent } from './components/list-of-parties/list-of-parties.component';
import { RedirectingComponent } from './components/redirecting/redirecting.component';

const routes: Routes = [
  { path: "vote-screen", loadChildren: "./modules/vote-screen.module#VoteScreenModule" },
  { path: "currentvote", component: CurrentVoteStatusComponent},
  { path: "voterlist", component: ListOfVotersComponent},
  { path: "partylist", component: ListOfPartiesComponent},
  { path: "redirecting", component: RedirectingComponent},
  { path: '', pathMatch: 'full', redirectTo: '/redirecting'},
  { path: '**', pathMatch: 'full', redirectTo: '/redirecting' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
