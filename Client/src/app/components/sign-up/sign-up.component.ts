import { Component, OnInit } from '@angular/core';
import { MultiComponentsFunctionsService } from 'src/app/services/multi-components-functions.service';
import { Voters } from 'src/app/models/voters';
import { ServerCommunicationService } from 'src/app/services/server-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public cond = true;
  public loggedVoter = JSON.parse(localStorage.getItem("loggedVoter"));
  public existingVoters: Voters[];
  public validatedEmail = true;
  public validatedSocialNumber = true;
  public validatedPhone = true;

  public button = "הירשם";
  public isFuture = false;
  public focusMode: boolean[] = [true,true,true,true,true,true,true,true]
  public newVoter = new Voters(null,"","", "", "זכר", "", "", null,"", null);

  public pageLoad = false;
  public errorPage = false;

  constructor(private server: ServerCommunicationService, private router: Router, public multi_function_service: MultiComponentsFunctionsService) { }

  ngOnInit() {

    if(this.loggedVoter){
      this.button = "ערוך פרטים"
      this.newVoter.id = this.loggedVoter.id;
      this.newVoter.city = this.loggedVoter.city;
      this.newVoter.socialNumber = this.loggedVoter.socialNumber;
      this.newVoter.phone = this.loggedVoter.phone;
      this.newVoter.email = this.loggedVoter.email;
      this.newVoter.lastName = this.loggedVoter.lastName;
      this.newVoter.firstName = this.loggedVoter.firstName;
      this.newVoter.socialNumberIssueDate = new Date(this.loggedVoter.socialNumberIssueDate);
      this.newVoter.gender = this.loggedVoter.gender;
      this.newVoter.votedTo = this.loggedVoter.votedTo;
    }

    

    this.cond = this.multi_function_service.reSize(window.innerWidth);
    this.loadItems();
  }

  onResize(event) {
    this.cond = this.multi_function_service.reSize(window.innerWidth);
  }

  public loadItems(){
    this.server.getTheVoters().subscribe(items => {this.existingVoters = items;
        this.pageLoad = true;}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public editOrSign(){
    this.loggedVoter ? this.editUser() : this.signUp();
  }

  public editUser(){
    this.pageLoad = false;
    this.server.editVoter(this.newVoter).subscribe(() => {
      alert("הפרטים נערכו בהצלחה");
      localStorage.setItem("loggedVoter", JSON.stringify(this.newVoter));
      this.router.navigate(['/vote-screen/vote-page']);
      this.pageLoad = true;
    }
    , () => {alert("חל שגיאה בעדכון הפרטים"); this.pageLoad = true;});
  }

  public signUp(){
    this.pageLoad = false;
    this.server.AddVoter(this.newVoter).subscribe(p => {
      alert("ההרשמה בוצעה בהצלחה");
      this.newVoter.id = p.id;
      localStorage.setItem("loggedVoter", JSON.stringify(this.newVoter));
      this.router.navigate(['/vote-screen/vote-page']);
      this.pageLoad = true;
    }
    , () => {alert("חל שגיאה בעדכון הפרטים"); this.pageLoad = true;});
  }






  public getYear(date: Date): number {
    if(date){
      return date.getFullYear();
    }
    else return undefined;
  }

  public getMonth(date: Date): string {
    if(date){
      let m = date.getMonth();
      if (m < 9) {
        return '0' + String(m + 1);
      }
      else {
        return String(m + 1);
      }
    }
    else return undefined;
    

  }

  public getDay(date: Date): string {
    if(date){
      var d = date.getDate();

      if (d < 10) {
        return '0' + String(d);
      }
      else {
        return String(d);
      }
    }
    else return undefined;
  }

  public checkYearInput(year: number):string{
    if(year > 99 && year < 1000){
      return '0' + String(year);
    }
    else if(year > 9 && year < 100){
      return '00' + String(year);
    }
    else if(year > 0 && year < 10){
      return '000' + String(year);
    }
    else{ return String(year);}
  }

  public editDate(inputDate: HTMLInputElement): Date{
    if(inputDate.value){
      return new Date(inputDate.value);
      
    }
    else{
      return null;
    }
  }

  public checkDate(inputDate: any): boolean{
    let dateToCheck: Date;
    if(inputDate instanceof HTMLInputElement){
      dateToCheck = new Date(inputDate.value);
    }
    else{
      dateToCheck = new Date(inputDate);;
    }

    let today= new Date();
    let tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);
    tommorow.setHours(0,0,0);

    if(dateToCheck >= tommorow){
      return true;
    }
    else{
      return false;
    }
  }

  public dataValidation(value: string):boolean{
    for(let prop in this.newVoter)
    {
      if(prop === value)
      {
        for(let item of this.existingVoters)
        {
          if(this.newVoter[prop].toLowerCase()  == item[prop].toLowerCase() && this.newVoter.id !=item.id)
          {
            return false;
          }
        }
        return true;
      }
    }
    return true;
  }

}
