import { Component, OnInit, Input, Output,ViewChild ,EventEmitter,ElementRef } from '@angular/core';
import { DataService } from '../../../services/index';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from '../../../components/globals/globals';
import swal from 'sweetalert2';

@Component({
  selector: 'app-count-stock-datepicker',
  templateUrl: './count-stock-datepicker.component.html',
  styleUrls: ['./count-stock-datepicker.component.scss'],
  providers: [NgbDatepickerConfig]
})
export class CountStockDatepickerComponent implements OnInit {
  insertCS:any ={};
  @ViewChild("myInput") inputEl: ElementRef;
  @ViewChild("d1")B;
  @Input() date;
  @Output() endDate= new EventEmitter<number>();

 today = new Date();                               /////////////////////////////////////// config date
    d:number = this.today.getDate() + 1;            ////// 
    m:number = this.today.getMonth() + 1;           //////
    y:number = this.today.getFullYear();            //////

  constructor(
    private dataService : DataService,       
    private globals: Globals,
    private config: NgbDatepickerConfig )              
    { //////  config Date
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

  ngOnInit() {
  }

  CheckDate(){
    if (this.date == undefined){
      this.inputEl.nativeElement.blur();
    swal({
        title:'กรุณากรอก Start Date!',
        type:'warning',
        showConfirmButton:false,
        timer:1500
      })
    }else{
    this.config.minDate = {year: this.date.year, month:this.date.month, day:this.date.day}; 
    this.B.toggle();
  }
 };

  SendEndDate(){
    this.endDate.emit(this.globals.datepicker.END_DATE_COUNT_STOCK);
  }

}
