import {  Component, Input,Output, OnInit, ViewChild ,EventEmitter,ElementRef} from '@angular/core';
import { DataService } from '../../../services/index';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Globals } from '../../../components/globals/globals';


@Component({
  selector: 'app-change-grade-datepicker',
  templateUrl: './change-grade-datepicker.component.html',
  styleUrls: ['./change-grade-datepicker.component.scss'],
  providers: [NgbDatepickerConfig]
})
export class ChangeGradeDatepickerComponent implements OnInit { 
  @ViewChild("myInput") inputEl: ElementRef;
  @ViewChild("B")B;
  @Input() date;
  @Output() dateend = new EventEmitter<number>();
  today = new Date();
  d:number = this.today.getDate() + 1;
  m:number = this.today.getMonth() + 1;
  y:number = this.today.getFullYear();

  constructor(
    private globals: Globals,
    private dataservice: DataService,
    private config: NgbDatepickerConfig,
  ){     // customize default values of datepickers used by this component tree
    config.minDate = {year: this.y, month:this.m, day:this.d};
    config.maxDate = {year: 2099, month: 12, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
     config.markDisabled = (date: NgbDateStruct) => {
     const d = new Date(date.year, date.month - 1, date.day);
     return d.getDay() === 0 || d.getDay() === 6;
    };
  }

  ngOnInit(){ 
  }


  checkdate() {
    if (this.date == undefined){
      this.inputEl.nativeElement.blur();
    swal({
        title:'กรุณากรอก Start Date!',
        type:'warning',
        showConfirmButton:false,
        timer:1500
    })
   }else{
     this.config.minDate = {year:this.date.year, month:this.date.month, day:this.date.day};
     this.B.toggle();
   }
  };

  dateout(){
    this.dateend.emit(this.globals.datepicker.END_DATE_CNANGE_GRADE);
  }


}
