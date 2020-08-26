import { Component, OnInit } from '@angular/core';
import { Parties } from 'src/app/models/parties';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';

@Component({
  selector: 'app-list-of-parties',
  templateUrl: './list-of-parties.component.html',
  styleUrls: ['./list-of-parties.component.css']
})
export class ListOfPartiesComponent implements OnInit {

  public allParties: Parties[];
  public allOddParties: Parties[];
  public allEvenParties: Parties[];

  public selectedParties: Parties[];
  public selectedOddParties: Parties[];
  public selectedEvenParties: Parties[];

  public partyToSearch = new Parties(null,"","","",null);

  public pageLoad = false;
  public errorPage = false;

  constructor(private server: ServerCommunicationService) { }

  ngOnInit() {
    this.server.getTheParties().subscribe(items => {this.allParties = items;
      this.selectedParties = items;
      this.allEvenParties = items.filter(p => p.id % 2 === 0);
      this.selectedEvenParties = items.filter(p => p.id % 2 === 0);
      this.allOddParties = items.filter(p => p.id % 2 !== 0);
      this.selectedOddParties = items.filter(p => p.id % 2 !== 0);
      this.pageLoad = true;
    }, () => {alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור."); this.errorPage = true;});
  }

  public search(){
    
    

    this.selectedParties = this.allParties.filter(p => p.name.toLowerCase().indexOf(this.partyToSearch.name.toLowerCase()) > -1 && 
    p.description.toLowerCase().indexOf(this.partyToSearch.description.toLowerCase()) > -1);

    for(let i = 0; i < this.selectedParties.length; i++){
      this.selectedParties[i].id = i + 1;
    }

    this.selectedEvenParties = this.selectedParties.filter(p => p.id % 2 === 0);
    this.selectedOddParties = this.selectedParties.filter(p => p.id % 2 !== 0);
  }

}
