import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit {
  mytasks:any;
  employeid:any

  constructor (private api:ApiService){

  }
  ngOnInit(): void {
    this.employeid = localStorage.getItem("id");
    console.log(this.employeid);
    this.load();
  }
  load(){
    this.api.get("Projecttasks/mytasks/" + this.employeid).subscribe((data:any)=>{
      this.mytasks = data;
      console.log(data);
      
    })
  }

  Open(id:number){
    let data = null;
    this.api.put("projecttasks/updatestatus/" + id + "/Pending",data).subscribe((result:any)=>{
      alert("Status Updated")
      this.load();
    })
  }

  Close(id:number){
    let data = null;
    this.api.put("projecttasks/updatestatus/" + id + "/Complited",data).subscribe((result:any)=>{
      alert("Status Updated")
      this.load();
    })
  }

}
