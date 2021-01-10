import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member';
import { Team } from '../models/Team';
import { Office } from '../models/Office';
import { ApiConfig } from '../api-config';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  members: Member[] = []
  public teams: Team [] = []
  public offices: Office [] = []
 
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
      ) {
  }
 
  ngOnInit(): void {
    var baseApiUrl = ApiConfig.getBaseUrl();
    var headers = ApiConfig.getDefaultHeaders();
    this.http.get(`${baseApiUrl}/teams/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.teams = response.map((team: { _id: number; name: string; }) => {
        return new Team(team._id, team.name);
      });
      console.log(this.teams);
    });
    this.http.get(`${baseApiUrl}/offices/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.offices = response.map((office: { _id: number; name: string; }) => {
        return new Office(office._id, office.name);
      });
      console.log(this.offices);
    });
 
    this.http.get(`${baseApiUrl}/members/`, {headers}).subscribe(res => {
      var response = res as any[];
      this.members = response.map((member:any) => {
        let teamName = this.teams.find(team => team.id === member.team)?.name;
        let officeName = this.offices.find(office => office.id === member.office)?.name;
 
        return new Member(
          member._id,
          member.name,
          member.email,
          member.image,
          member.createdAt,
          member.team,
          teamName,
          "", // Start date property
          member.office,
          officeName
          );
      });
      console.log(this.members);
    });
  }
}