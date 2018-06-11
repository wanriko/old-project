import { Component, OnInit,ViewChild,AfterViewInit,Input } from '@angular/core';
import { DataService } from '../../services/index';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { Http } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { log } from 'util';

@Component({
  //moduleId: module.id,
  selector: 'app-count-stock',
  templateUrl: './count-stock.component.html',
  styleUrls: ['./count-stock.component.scss'],
  providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers 
})

export class CountStockComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dtable : boolean = false;
  files: any[];  
  insertCS: any = {};  // ใช้กับ AddCountStock

  insCS: any = {};    // ใช้กับ AddCS     


  today = new Date();                               /////////////////////////////////////// config date
    d:number = this.today.getDate() + 1;            ////// 
    m:number = this.today.getMonth() + 1;           //////
    y:number = this.today.getFullYear();            //////

  constructor(
    private dataService : DataService,   
    private globals: Globals,    
    config: NgbDatepickerConfig )              
    { //////  config Date
      this.getTableCountStock();
      // customize default values of datepickers used by this component tree 
      config.minDate = {year: this.y, month:this.m, day:this.d}; 
      config.maxDate = {year: 2099, month: 12, day: 31}; 

       // days that don't belong to current month are not visible 
      config.outsideDays = 'hidden'; 

       // weekends are disabled 
      config.markDisabled = (date: NgbDateStruct) => { 
        const d = new Date(date.year, date.month - 1, date.day); 
        return d.getDay() === 0 || d.getDay() === 6; 
      };                            
    } //////////////////////////////////////////////////////////////////////////////////// config date

    

  ngOnInit(): void {
    this.getTableCountStock();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
  };
    this.globals.navTitle = "COUNT STOCK";
    this.globals.editMode = true;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
}

rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
}

  getTableCountStock() {
    this.dataService.getTableCountStock().subscribe
    (res => {                         // ดึงข้อมูล
      this.files = res.member 
      console.log(res.member)
      if (this.files.length === 0){
        this.globals.showtable = true
    }else{
        this.rerender();
    }        // สำหรับ Search 
    })
  }

  checkNum(num){
    if(num.length >= 3){
      num = num.slice(0,3)
      this.insertCS.NUMBER_OF_TEAM_COUNTSTOCK = num;
  }}  

  SendEndD(SendEndDate){
    this.insertCS.END_DATE_COUNT_STOCK = SendEndDate;
    console.log(this.insertCS.END_DATE_COUNT_STOCK)
  }

  cancel(){
    this.insertCS = {};
    this.globals.ShowTable();
    this.getTableCountStock();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
    this.globals.datepicker.END_DATE_COUNT_STOCK = {};
  }

  editItemCs(id: number) {   // ปุ่ม Update เล็ก
    this.globals.UpdateForm(); // แสดงฟอร์ม staff
    this.insertCS = this.files[id]; // ดึงข้อมูลจาก staffs อิงจาก index ของ array
    this.insertCS.START_DATE_COUNT_STOCK = { year: Number(this.insertCS.START_DATE_COUNT_STOCK.slice(0, 4)), month: Number(this.insertCS.START_DATE_COUNT_STOCK.slice(5, 7)), day: Number(this.insertCS.START_DATE_COUNT_STOCK.slice(8, 10))};
    this.insertCS.END_DATE_COUNT_STOCK = { year: Number(this.insertCS.END_DATE_COUNT_STOCK.slice(0, 4)), month: Number(this.insertCS.END_DATE_COUNT_STOCK.slice(5, 7)), day: Number(this.insertCS.END_DATE_COUNT_STOCK.slice(8, 10)) };
    this.globals.datepicker.END_DATE_COUNT_STOCK = this.insertCS.END_DATE_COUNT_STOCK;
    this.globals.editmode = true; // อยู่ใน
    console.log(id)
  }

  checkStartDateAndEndDate(startDate,endDate,startTime,endTime) {
    function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
    }
    console.log(startDate,endDate)
    startDate = startDate.year+'/'+addZero(startDate.month)+'/'+addZero(startDate.day);
    endDate = endDate.year+'/'+addZero(endDate.month)+'/'+addZero(endDate.day);
    this.insertCS.START_DATE = startDate;
    this.insertCS.END_DATE = endDate;

    //// เช็คค่าวัน-เวลา ////////
    startDate = startDate.replace(/\//g,"");                                
    endDate   = endDate.replace(/\//g,"");  
    startTime = startTime.replace(/:/g,"");                                
    endTime   = endTime.replace(/:/g,"");  
    console.log(startDate,endDate)
    console.log("TIME"+startTime,endTime)
      if ( startDate == endDate && startTime >= endTime ){
        swal(
          'Oops...',
          'กรุณาแก้ไขข้อมูลวันที่/ข้อมูลเวลา !',
          'warning',
        ) 
        return false; 
      }
      else
      {
        return true;
      };
  }

  //----------------------- เปรียบเทียบค่าที่ออกมาจาก start date --------------------------//
  //ใช้ ngbdatepicker
  // sdate= {
  //   year: "2019",
  //   month: "01",
  //   date: "29"
  // }
  //ไม่ใช้ ngbdatepicker
//  sdate = "2019/01/29"; 

  /////// insert +++++ update 
  insertCountStock() {
    var user = JSON.parse(localStorage.getItem('currentUser'));       //ค่าจากตอนที่ login เข้าระบบ
    /////////////////////  InsertMode   ///////////////////////////////////////////
    if (this.globals.editmode == false) 
    {  
      let checkDate = this.checkStartDateAndEndDate(
        this.insertCS.START_DATE_COUNT_STOCK,
        this.globals.datepicker.END_DATE_COUNT_STOCK,
        this.insertCS.START_TIME_COUNT_STOCK,
        this.insertCS.END_TIME_COUNT_STOCK
      );
        if(!checkDate){return}                              
      this.insertCS.CREATE_BY = user.Username;  
      this.dataService.AddCountStock(this.insertCS).subscribe(res=> {  //insertCS -----1  AddCountStock------3
        if (res.status === 'error') {
        console.log(res);
        swal(
          'Oops...',
          'ข้อมูลไม่ถูกต้อง !',                
          'error'
        )
        } else {        
        swal({
          title: "บันทึกข้อมูลเรียบร้อยแล้ว",
          type: 'success',
          showConfirmButton: false,
          timer: 1800
        })
        this.getTableCountStock();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
        this.insertCS = {};
        this.globals.datepicker.END_DATE_COUNT_STOCK = {};
        //this.modeSwitch('default');
      }
      });
    }
     ////////////////////////////////////UpDate////////////////////////
    else
    {   
      let checkDate = this.checkStartDateAndEndDate(
        this.insertCS.START_DATE_COUNT_STOCK,
        this.globals.datepicker.END_DATE_COUNT_STOCK,
        this.insertCS.START_TIME_COUNT_STOCK,
        this.insertCS.END_TIME_COUNT_STOCK);

      if(!checkDate){return} 
      swal({
        title: "คุณต้องการแก้ไข" + this.insertCS.SUPPLIER_ID + "หรือไม่?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'ยืนยัน',                     
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          console.log(result.value);
            this.dataService.UpdCStock(this.insertCS).subscribe(res=>{
                if (res.status === "success"){  
                  console.log( this.insertCS.START_DATE_COUNT_STOCK, this.insertCS.END_DATE_COUNT_STOCK)    
                  console.log("สำเร็จ : "+res.message)                 
                    swal({
                        type: 'success',
                        title: 'แก้ไขข้อมูลเรียบร้อยแล้ว!',
                        showConfirmButton: false, 
                        timer:1800, 
                    })
                    this.getTableCountStock();
                }else{
                  console.log('ไม่สำเร็จ'+res.message)
                  swal(
                    'Oops...',
                    'ข้อมูลไม่ถูกต้อง !',
                    'error'
                )} 
            });
        }
      })
    } 
  }

  deleteCStock(id) {
    console.log(id)
    console.log(this.files)
    
      swal({ 
        title: "คุณต้องการลบ" + id + "หรือไม่?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
            this.dataService.DellCStock(id).subscribe(res=>{
                if (res.status === "success"){ 
                    swal({              // ให้แสดง popup success
                        title: "ลบข้อมูลเรียบร้อยแล้ว",
                        type: 'success',
                        showConfirmButton: false, //ปิดปุ่มยืนยัน
                        timer: 1800    // ระยะเวลาแสดง popup (1000 = 1วินาที)
                      })
                      this.getTableCountStock();          
                }else{
                    console.log(res.member); }
            }
          );
        }
      }
    )
    
  }
  



}

