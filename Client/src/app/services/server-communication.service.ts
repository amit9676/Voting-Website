import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parties } from '../models/parties';
import { Voters } from '../models/voters';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {

  constructor(private httpClient: HttpClient) { }

  public getTheParties():Observable<Parties[]>{

    const url = "http://localhost:63056/api/parties";
    return this.httpClient.get<Parties[]>(url);
  }

  public getTheVoters():Observable<Voters[]>{

    const url = "http://localhost:63056/api/voters";
    return this.httpClient.get<Voters[]>(url);
  }

  public addVote(party: Parties):Observable<Parties>{

    const url = 'http://localhost:63056/api/parties';
    return this.httpClient.put<Parties>(url + "/" + party.id, party);
  }

  public editVoter(voter: Voters):Observable<Voters>{

    const url = 'http://localhost:63056/api/voters';
    return this.httpClient.put<Voters>(url + "/" + voter.id, voter);
  }

  public AddVoter(voter: Voters):Observable<Voters>{

    const url = 'http://localhost:63056/api/voters';
    return this.httpClient.post<Voters>(url, voter);
  }
}
