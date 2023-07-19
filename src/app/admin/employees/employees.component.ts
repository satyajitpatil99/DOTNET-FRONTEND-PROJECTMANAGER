import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  formData:any;
  employees:any;
  id:any;
  

  constructor(private api:ApiService ){
     }

  ngOnInit(): void {
    this.formData = new FormGroup({
      Name: new FormControl("", Validators.compose([Validators.required])),
      Code: new FormControl("", Validators.compose([Validators.required])),
      Gender: new FormControl("", Validators.compose([Validators.required])),
      Eamil: new FormControl("", Validators.compose([Validators.required,Validators.email])),
      MobileNo: new FormControl("", Validators.compose([Validators.required,Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)])),
      Password: new FormControl("", Validators.compose([Validators.required])),
    })

    this.show();
  }

  show(){
    this.api.get("employees").subscribe((result:any)=>{
      this.employees = result
      console.log(this.employees);
    })

  }
    deleteProduct(id:number){
      if(confirm("sure to delete")){
        this.api.delete("employees/"+id).subscribe((result:any)=>{
          this.show();
        })
      }
    }
    submitData(data:any){
      console.log(data);
      if(this.id == null){
      this.api.post("employees",data).subscribe((result:any)=>{
        console.log(result);
        this.show();
      });
    }
      else{
        this.api.put("employees/" + this.id,data).subscribe((result:any)=>{
          console.log(result);
          this.show();
        });
      }
        
        
    }
    EditItem(id:number){
      if(this.id == null){
        this.api.get("employees/" + this.id).subscribe((result:any)=>{
          console.log(result);
          this.formData.patchValue({
            id:this.id,
            name:result.name,
            code:result.code,
            gender:result.gender,
            eamil:result.eamil,
            mobileno:result.mobileno,
            password:result.password

          })
        })
      }
    }
    
}


