import { Component, OnInit, HostListener } from '@angular/core';
import { MultiComponentsFunctionsService } from 'src/app/services/multi-components-functions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public someheight = 300;
  public cond = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cond = this.multi_function_service.reSize(window.innerWidth);
  }

  constructor(public multi_function_service: MultiComponentsFunctionsService) { }


  ngOnInit() {
    this.cond = this.multi_function_service.reSize(window.innerWidth);
  }
}
