import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projectmodules',
  templateUrl: './projectmodules.component.html',
  styleUrls: ['./projectmodules.component.css']
})
export class ProjectmodulesComponent {

  ProjectModules:any;
  formData:any;
  id:any;
  project:any
  projectid:any;

  constructor (private api:ApiService,private route:ActivatedRoute ){
    this.projectid = this.route.snapshot.paramMap.get("projectid");
  }
  ngOnInit(): void {
this.api.get("projects/" + this.projectid).subscribe((result:any)=>{
  this.project = result;
})

    this.formData = new FormGroup({
      id:new FormControl(0),
      projectid: new FormControl(this.projectid, Validators.compose([Validators.required])),
      name: new FormControl("", Validators.compose([Validators.required])),
      
    })

    this.show();
  }
  show(){
    this.api.get("Projectmodules").subscribe((result:any)=>{
      this.ProjectModules = result
      console.log(this.ProjectModules);
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
        this.api.delete("Projectmodules/"+id).subscribe((result:any)=>{
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
    this.api.post("Projectmodules",data).subscribe((result:any)=>{
      console.log(result);
      this.show();
    });
  }
    else{
      this.api.put("Projectmodules/" + this.id,data).subscribe((result:any)=>{
        console.log(result);
        this.show();
      });
    }
      
      
  }
  EditItem(id:number){
    this.id = id;
      if(this.id != null){
        this.api.get("Projectmodules/"+ this.id).subscribe((result:any)=>{
          console.log(result);
          this.formData.patchValue({
            id:this.id,
            projectid:result.projectid,
            name:result.name,
            
          })
        })
      }
    }

}
