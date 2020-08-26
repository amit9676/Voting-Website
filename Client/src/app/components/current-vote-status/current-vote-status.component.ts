import { Component, OnInit } from '@angular/core';
import { Parties } from 'src/app/models/parties';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-vote-status',
  templateUrl: './current-vote-status.component.html',
  styleUrls: ['./current-vote-status.component.css']
})
export class CurrentVoteStatusComponent implements OnInit {

  public parties: Parties[];

  public pageLoad = false;
  public errorPage = false;

  constructor(private server: ServerCommunicationService, private router: Router) { }

  ngOnInit() {
    this.server.getTheParties().subscribe(items => {this.parties = items; this.pageLoad = true;} , () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

}
