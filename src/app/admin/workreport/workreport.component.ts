import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx';

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
  selector: 'app-workreport',
  templateUrl: './workreport.component.html',
  styleUrls: ['./workreport.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS}
  ]
})
export class WorkreportComponent implements OnInit {

  
  reports:any;
  reportlist:any[] = [];
  projects:any;
  projecttasks:any;
  employees:any;
  originalreportlist:any[] = [];
  projectname="";
  employeename="";
  taskstatus="";
  tabledata:any;
  fileName= 'ExcelSheet.xlsx';

  constructor (private api:ApiService){

  }

  ngOnInit(): void {
   this.load();
  }
    
load(){
  this.api.get("projecttasks/reportlist").subscribe((result:any)=>{
this.originalreportlist = result;
console.log(this.originalreportlist);
this.changed();

  })
   

  this.api.get("projects").subscribe((result:any)=>{
    this.projects = result;

  })

  this.api.get("employees").subscribe((result:any)=>{
    this.employees = result;

  })

  this.api.get("projecttasks").subscribe((result:any)=>{
    this.projecttasks = result;

  })
 }

changed(){
   this.reportlist = this.originalreportlist.filter((data:any)=>{
    let toshow = false;
    if((this.projectname == "" || data.projectname == this.projectname) && (this.employeename == "" || data.employeename == this.employeename)
     && (this.taskstatus == ""|| data.taskstatus == this.taskstatus)){
      toshow = true;
     }
     if(toshow){
      return data;
     }
   })
}
reset(){
  this.projectname = "";
  this.employeename = "";
  this.taskstatus = "";
  this.load();
}
printDiv(divName:string){
  var printContents = document.getElementById(divName)?.innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents!;
  window.print();
  document.body.innerHTML = originalContents;
}

exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }


}


