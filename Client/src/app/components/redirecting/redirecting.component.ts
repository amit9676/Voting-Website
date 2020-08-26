import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecting',
  templateUrl: './redirecting.component.html',
  styleUrls: ['./redirecting.component.css']
})
export class RedirectingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("loggedVoter"))){
      this.router.navigate(['/vote-screen/vote-page']);
    }
    else{
      this.router.navigate(['/vote-screen/sign-in']);
    }
  }

}
