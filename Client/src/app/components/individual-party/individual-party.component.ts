import { Component, OnInit, Input } from '@angular/core';
import { Parties } from 'src/app/models/parties';

@Component({
  selector: 'app-individual-party',
  templateUrl: './individual-party.component.html',
  styleUrls: ['./individual-party.component.css']
})
export class IndividualPartyComponent implements OnInit {

  @Input()
  public party: Parties;
  constructor() { }

  ngOnInit() {
  }

}
