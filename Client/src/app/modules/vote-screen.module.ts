import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { VoteLayoutComponent } from '../components/vote-layout/vote-layout.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { VotePageComponent } from '../components/vote-page/vote-page.component';

const routes: Routes = [
  { 
    path: "", component: VoteLayoutComponent, children:
    [
      
      {path: "sign-in", component: SignInComponent},
      {path: "sign-up", component: SignUpComponent},
      {path: "vote-page", component: VotePageComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'sign-in'}
      
    ]
  }
]

@NgModule({
  declarations: [VoteLayoutComponent, SignInComponent, SignUpComponent, VotePageComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule
  ]
})
export class VoteScreenModule { }
