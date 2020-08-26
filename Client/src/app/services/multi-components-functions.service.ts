import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiComponentsFunctionsService {

  constructor() { }

  public reSize(size: number):boolean{
    if (size >= 768) { // 768px portrait
      return true
    }
    else{
      return false;
    }
  }
}
