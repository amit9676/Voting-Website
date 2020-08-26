import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigate(){
    if(JSON.parse(localStorage.getItem("loggedVoter"))){
      this.router.navigate(['/vote-screen/vote-page']);
    }
    else{
      this.router.navigate(['/vote-screen/sign-in']);
    }
  }

}
