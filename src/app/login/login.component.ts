import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:any

  constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    this.loginform = new FormGroup({
      email:new FormControl("",Validators.compose([Validators.required])),
       password:new FormControl("",Validators.compose([Validators.required])),
    })
  }

  login(data:any){
    console.log(data);
    
    this.api.post("authentication/login",data).subscribe((result:any)=>{
      console.log(result);
      
      if(result.length == 0){
        alert("Invalid Credentials");

      }
      else{
        localStorage.setItem("usertype","admin");
        localStorage.setItem("name",result[0].name);
        localStorage.setItem("email",result[0].email);
        localStorage.setItem("id",result[0].id);
        this.router.navigate(['/admin/dashboard']);
      }
    })
  }
  
}