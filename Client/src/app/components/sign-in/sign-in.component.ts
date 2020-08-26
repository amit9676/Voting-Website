import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voters } from 'src/app/models/voters';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  public allVoters:Voters[] = [];
  public socialNumber = "";
  public issueDate: Date = new Date();

  public pageLoad = false;
  public errorPage = false;

  constructor(private router: Router, private server: ServerCommunicationService) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("loggedVoter"))){
      alert("אתה כבר מחובר למערכת ההצבעה!");
      this.router.navigate(['/vote-screen/vote-page']);
    }
    this.loadItems();
  }

  public loadItems(){
    this.server.getTheVoters().subscribe(items => {this.allVoters = items;
        this.pageLoad = true;}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public checkDate(){
    console.log(this.issueDate)
  }

  public logIn(){
    this.pageLoad = false;
    for(let item of this.allVoters){
      if(this.socialNumber == item.socialNumber && new Date(this.issueDate).toDateString() == new Date(item.socialNumberIssueDate).toDateString()){
        localStorage.setItem("loggedVoter", JSON.stringify(item))
        this.router.navigate(['/vote-screen/vote-page']);
        return;
      }
    }
    alert("מספר זהות או תאריך ההנפקה אינו מתאים, נא נסה שנית.");
    this.pageLoad = true;
  }

}
