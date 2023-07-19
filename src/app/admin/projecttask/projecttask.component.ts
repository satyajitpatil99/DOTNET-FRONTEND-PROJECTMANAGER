import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import{MAT_DATE_FORMATS} from '@angular/material/core';
import Swal from 'sweetalert2';

export const MY_DATE_FORMATS ={
  parse:{
    dateInput:'DD/MM/YYY',
  },

  display: {
    dateInput:'DD/MM/YYYY',
    monthYearLable:'MMM YYYY',
    dateA11yLable:'LL',
    monthYearA11Lable:'MMMM YYYY',
  }
}

@Component({
  selector: 'app-projecttask',
  templateUrl: './projecttask.component.html',
  styleUrls: ['./projecttask.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS}
  ]
})
export class ProjecttaskComponent {
  projecttasks:any;
  formData:any;
  id:any;
  projectid:any;
  moduleid:any;
  project:any;
  module:any;
  managerid:any
  constructor (private api:ApiService,private route:ActivatedRoute){
    this.moduleid = this.route.snapshot.paramMap.get("moduleid");

    this.projectid = this.route.snapshot.paramMap.get("projectid");

    this.managerid = this.route.snapshot.paramMap.get("managerid");
  }
  ngOnInit(): void {
     
    this.api.get("projects/" + this.projectid).subscribe((result:any)=>{
      this.project = result;

    })
    this.api.get("Projectmodules/" + this.moduleid).subscribe((result:any)=>{
      this.module = result;

    })

    
    this.formData = new FormGroup({
      id:new FormControl(0),
      projectid: new FormControl(this.projectid),
      moduleid: new FormControl(this.moduleid),
      task: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      employeid: new FormControl(this.managerid),
      startdate: new FormControl(new Date(), Validators.compose([Validators.required])),
      starttime: new FormControl(new Date(), Validators.compose([Validators.required])),
      enddate: new FormControl(new Date(), Validators.compose([Validators.required])),
      endtime: new FormControl(new Date(), Validators.compose([Validators.required])),
      duration: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl("", Validators.compose([Validators.required])),
    })

    this.show();
  }
  show(){
    this.api.get("Projecttasks/listtasks/" + this.moduleid).subscribe((result:any)=>{
      this.projecttasks = result
      console.log(this.projecttasks);
    })

  }
  deleteProduct(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("Projecttasks/"+id).subscribe((result:any)=>{
          this.show();
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  submitData(data:any){
    console.log(data);
    if(this.id == null){
    this.api.post("Projecttasks",data).subscribe((result:any)=>{
      console.log(result);
      this.show();
    });
  }
    else{
      this.api.put("Projecttasks/" + this.id,data).subscribe((result:any)=>{
        console.log(result);
        this.show();
      });
    }
      
      
  }
  EditItem(id:number){
    this.id = id;
      if(this.id != null){
        this.api.get("Projecttasks/"+ this.id).subscribe((result:any)=>{
          console.log(result);
          this.formData.patchValue({
            id:this.id,
            projectid:result.projectid,
            moduleid:result.moduleid,
            task:result.task,
            description:result.description,
            employeid:result.employeid,
            startdate:result.startdate,
            starttime:result.starttime,
            enddate:result.enddate,
            endtime:result.endtime,
            duration:result.duration,
            status:result.status,
          })
        })
      }
    }
    
}
