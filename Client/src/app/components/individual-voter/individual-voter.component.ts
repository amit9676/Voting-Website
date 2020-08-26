import { Component, OnInit, Input } from '@angular/core';
import { Voters } from 'src/app/models/voters';
import { Parties } from 'src/app/models/parties';

@Component({
  selector: 'app-individual-voter',
  templateUrl: './individual-voter.component.html',
  styleUrls: ['./individual-voter.component.css']
})
export class IndividualVoterComponent implements OnInit {

  @Input()
  public voter: Voters;

  constructor() { }

  ngOnInit() {
    if(!this.voter.votedTo){
      this.voter.votedTo = new Parties(null,null)
    }
  }

}
