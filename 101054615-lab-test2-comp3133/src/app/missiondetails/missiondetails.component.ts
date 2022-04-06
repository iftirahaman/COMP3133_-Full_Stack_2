import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SpacexService } from '../network/spacex.service';
import { Mission } from '../models/mission';
import { MissionlistComponent } from "../missionlist/missionlist.component";
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissiondetailsComponent implements OnInit {

  @ViewChild(MissiondetailsComponent) child: any;
  id:any;
  data:  any;
  constructor(private route:ActivatedRoute, private spacexservice: SpacexService) { 
    
  }

  ngOnInit(): void {
   console.log(this.route.snapshot.params['id']);
   this.id = this.route.snapshot.params['id'];
   this.getMissionDetails();
  
  }
  getMissionDetails():void{
    this.spacexservice.getMissionDetails(this.id).subscribe(res=>{
      if(res){
      JSON.parse(JSON.stringify(res));
      console.log(res);
      this.data= res;
      
      }
      
    })
    
  }

}
