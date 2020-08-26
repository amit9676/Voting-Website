import { Component, OnInit } from '@angular/core';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';
import { MultiComponentsFunctionsService } from 'src/app/services/multi-components-functions.service';
import { Voters } from 'src/app/models/voters';
import { Parties } from 'src/app/models/parties';

@Component({
  selector: 'app-list-of-voters',
  templateUrl: './list-of-voters.component.html',
  styleUrls: ['./list-of-voters.component.css']
})
export class ListOfVotersComponent implements OnInit {

  public allVoters: Voters[];
  public allOddVoters: Voters[];
  public allEvenVoters: Voters[];

  public selectedVoters: Voters[];
  public selectedOddVoters: Voters[];
  public selectedEvenVoters: Voters[];

  public parties: Parties[];

  public searchMode = false;
  public cond = true;

  public pageLoad = false;
  public errorPage = false;
  private connectionCheck: boolean[] = [];

  public voterToSearch = new Voters(null,"","","","","","",new Date(),"",new Parties(0, "all"));
  constructor(private server: ServerCommunicationService, public multi_function_service: MultiComponentsFunctionsService) { }

  ngOnInit() {
    this.cond = this.multi_function_service.reSize(window.innerWidth);

    this.server.getTheVoters().subscribe(items => {
      for(let item of items){
        item.id = items.indexOf(item) + 1;
      }
      this.allVoters = items;
      this.selectedVoters = items;

       this.allEvenVoters = items.filter(p => p.id % 2 === 0);
       this.selectedEvenVoters = items.filter(p => p.id % 2 === 0);

       this.allOddVoters = items.filter(p => p.id % 2 !== 0);
       this.selectedOddVoters = items.filter(p => p.id % 2 !== 0);
       this.serverLoad(true);
      }, () => this.serverLoad(false));

       this.server.getTheParties().subscribe(items => {this.parties = items;this.serverLoad(true);}, () => this.serverLoad(false));
  }

  public serverLoad(condition: boolean){
    this.connectionCheck.push(condition)
    for(let item of this.connectionCheck){
      if(!item){
        if(this.connectionCheck.length === 2){
          alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור.");
          this.errorPage = true;
        }
        return;
      }
    }
    if(this.connectionCheck.length === 2){
      this.pageLoad = true;
    }
  }

  onResize(event) {
    
    this.cond = this.multi_function_service.reSize(window.innerWidth);
  }

  public search(givenVotedTo?: HTMLSelectElement){
    
    if(givenVotedTo){
      this.voterToSearch.votedTo.name = givenVotedTo.value;
    }
    

    this.selectedVoters = this.allVoters.filter(p => p.firstName.toLowerCase().indexOf(this.voterToSearch.firstName.toLowerCase()) > -1 && 
    p.lastName.toLowerCase().indexOf(this.voterToSearch.lastName.toLowerCase()) > -1 &&
    p.phone.toLowerCase().indexOf(this.voterToSearch.phone.toLowerCase()) > -1 &&
    p.email.toLowerCase().indexOf(this.voterToSearch.email.toLowerCase()) > -1 &&
    p.city.toLowerCase().indexOf(this.voterToSearch.city.toLowerCase()) > -1 &&
    p.socialNumber.toLowerCase().indexOf(this.voterToSearch.socialNumber.toLowerCase()) > -1
    );

    if(this.voterToSearch.votedTo.name != "all"){
      this.selectedVoters = this.selectedVoters.filter(p => this.voterToSearch.votedTo.name !='none' ? p.votedTo.name == this.voterToSearch.votedTo.name : !p.votedTo.name);
    }

    for(let i = 0; i < this.selectedVoters.length; i++){
      this.selectedVoters[i].id = i + 1;
    }

    this.selectedEvenVoters = this.selectedVoters.filter(p => p.id % 2 === 0);
    this.selectedOddVoters = this.selectedVoters.filter(p => p.id % 2 !== 0);
  }

}
