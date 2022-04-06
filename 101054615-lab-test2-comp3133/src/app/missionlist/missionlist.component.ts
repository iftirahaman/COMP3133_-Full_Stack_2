import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';
import { SpacexService } from '../network/spacex.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})

export class MissionlistComponent implements OnInit {
 
  dataList: Mission[]= [];
 
  constructor(private spacexservice: SpacexService) { }

  ngOnInit() {
   this.getMissionList();
   
  }
  getMissionList():void{
    
    this.spacexservice.getMission().subscribe((res)=>{
      console.log(res);
     this.dataList = res;
      
      
      
    }); 
  }

  
}
