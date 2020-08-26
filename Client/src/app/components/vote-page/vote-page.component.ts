import { Component, OnInit, HostListener } from '@angular/core';
import { Parties } from 'src/app/models/parties';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';
import { Router } from '@angular/router';
import { MultiComponentsFunctionsService } from 'src/app/services/multi-components-functions.service';
import { Voters } from 'src/app/models/voters';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {

  public cond = true;
  public parties: Parties[];
  public hasVoted: Voters = JSON.parse(localStorage.getItem("loggedVoter"));
  public chosenParty: Parties = new Parties();

  public pageLoad = false;
  public errorPage = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.cond = this.multi_function_service.reSize(window.innerWidth);
  }

  constructor(private server: ServerCommunicationService, private router: Router, public multi_function_service: MultiComponentsFunctionsService) { }

  ngOnInit() {

    if(!JSON.parse(localStorage.getItem("loggedVoter"))){
      alert("בבקשה התחבר למשתמש");
      this.router.navigate(['/vote-screen/sign-in']);
    }


    this.cond = this.multi_function_service.reSize(window.innerWidth);
    this.loadItems();
    
  }

  public loadItems(){
    this.server.getTheParties().subscribe(items => {this.parties = items;
        this.pageLoad = true;}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public voted(chosenParty: HTMLSelectElement):void{
    this.chosenParty = this.parties.find(p => p.id == Number(chosenParty.value));
    this.pageLoad = false;
    this.server.addVote(this.chosenParty).subscribe(() => {

      this.hasVoted.votedTo = this.chosenParty;
      this.server.editVoter(this.hasVoted).subscribe(() => 
      {
        alert("תודה רבה על הצבעתך!");
        localStorage.setItem("loggedVoter" ,JSON.stringify(this.hasVoted));
        this.router.navigate(['/currentvote']);
      }, () => {
        this.hasVoted.votedTo = null;
        this.pageLoad = true;
        alert("חלה שגיאה בהצבעה, נא טען את העמוד או בדוק את החיבור.");
        }
      )
    })
  }

  public logOut(){
    localStorage.removeItem("loggedVoter");
  }

}
