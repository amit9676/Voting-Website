import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noVoted'
})
export class NoVotedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value === null){
      return "לא הצביע"
    }
    else{
      return "הצביע ל-" + value
    }
    
  }

}
