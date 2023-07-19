import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import{MAT_DATE_FORMATS} from '@angular/material/core';
import Swal from 'sweetalert2';

export const MY_DATE_FORMATS ={
  parse:{
    dateInput:'DD/MM/YYYY',
  },

  display: {
    dateInput:'DD/MM/YYYY',
    monthYearLable:'MMMM YYYY',
    dateA11yLable:'LL',
    monthYearA11Lable:'MMMM YYYY',
  }
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS}
  ]
})
export class ProjectComponent {
  projects:any;
  formData:any;
  id:any;
  employees:any;

  
  constructor(private api:ApiService ,private route : ActivatedRoute){
    this.id = route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.formData = new FormGroup({
      id:new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      startdate: new FormControl(new Date(), Validators.compose([Validators.required])),
      targetdate: new FormControl(new Date(), Validators.compose([Validators.required])),
      managerid: new FormControl("", Validators.compose([Validators.required])),
    })

    this.show();
  }
  show(){
    this.api.get("Projects/listprojects").subscribe((data:any)=>{
      this.projects = data;
      console.log(data);
    })

    this.api.get("employees").subscribe((data:any)=>{
      this.employees = data;
      console.log(data);
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
        this.api.delete("projects/"+id).subscribe((result:any)=>{
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
    this.api.post("projects",data).subscribe((result:any)=>{
      console.log(result);
      this.show();
    });
  }
    else{
      this.api.put("projects/" + this.id,data).subscribe((result:any)=>{
        console.log(result);
        this.show();
      });
    }
      
      
  }
  EditItem(id:number){
    this.id = id;
      if(this.id != null){
        this.api.get("projects/"+ this.id).subscribe((result:any)=>{
          console.log(result);
          this.formData.patchValue({
            id:this.id,
            name:result.name,
            description:result.description,
            startdate:result.startdate,
            targetdate:result.targetdate,
            managerid:result.managerid
          })
        })
      }
    }
    
}
