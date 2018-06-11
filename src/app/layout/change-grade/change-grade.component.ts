import { AfterViewInit, Component, Input, OnInit, ViewChild,VERSION } from '@angular/core';
// Import DataTable
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/index';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-change-grade',
    templateUrl: './change-grade.component.html',
    styleUrls: ['./change-grade.component.scss'],
    providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
})
export class ChangeGradeComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    busy: Subscription;
    dtable : boolean = false;
    CG: any = {};
    dataCGs:any[];
    today = new Date();
    d:number = this.today.getDate() + 1;
    m:number = this.today.getMonth() + 1;
    y:number = this.today.getFullYear();

    //qr
    startCam = false;
    cam = true;
    cameraStarted = false;
    qrResult: string;
    selectedDevice: object;
    availableDevices: object = [];
    

    constructor(
        public dataservice: DataService,
        private globals: Globals,
        config: NgbDatepickerConfig
    ) {
        this.loadAllCG();
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
    }
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
        };
        this.CG.REMARK = "";
        this.globals.navTitle = "CHANGE GRADE";
        this.globals.editMode = true;
        setInterval(()=> this.loadAllCG(),60000)
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

    loadAllCG() {
        this.busy = this.dataservice.CGlist().subscribe(res => {
            this.dataCGs = res.data;
            if (this.dataCGs.length === 0){
                this.globals.showtable = true;
            } else {
                this.rerender();
                console.log("dataCGs = " + this.dataCGs.length);
            }
        });
    }

    enddate(date) {
        this.CG.END_DATE_CNANGE_GRADE = date;
        console.log(date)
    }

    cancel(){
        this.CG = {};
        this.globals.ShowTable();
        this.loadAllCG();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
        this.globals.datepicker.END_DATE_CNANGE_GRADE = {};
    }
    
    Update(id: number) {
        this.globals.UpdateForm(); // แสดงฟอร์ม staff
        this.CG = this.dataCGs[id]; // ดึงข้อมูลจาก staffs อิงจาก index ของ array
        console.log(this.CG)
        this.CG.START_DATE_CNANGE_GRADE = { year: Number(this.CG.START_DATE_CNANGE_GRADE.slice(0, 4)), month: Number(this.CG.START_DATE_CNANGE_GRADE.slice(5, 7)), day: Number(this.CG.START_DATE_CNANGE_GRADE.slice(8, 10))};
        this.CG.END_DATE_CNANGE_GRADE = { year: Number(this.CG.END_DATE_CNANGE_GRADE.slice(0, 4)), month: Number(this.CG.END_DATE_CNANGE_GRADE.slice(5, 7)), day: Number(this.CG.END_DATE_CNANGE_GRADE.slice(8, 10)) };
        this.globals.datepicker.END_DATE_CNANGE_GRADE = this.CG.END_DATE_CNANGE_GRADE;
        this.globals.editmode = true; // อยู่ในโหมดแก้ไขข้อมูล
    }

    Delete(id) {
        swal({ // เรียก popup confrim การลบ staff
            title: 'Are you sure?',
            html: 'คุณต้องการลบ ID: <font color = "red">' + id + "</font> หรือไม่?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
                this.dataservice.delCG(id).subscribe(res => {// ลบ User รายการที่่มี id ตรงกับค่า User_ID ใน database
                    if (res.status === "success") { //เมื่อลบ staff แล้ว
                        swal({//ให้แสดง popup success
                            type: 'success',
                            title: 'Deleted!',
                            text: 'ลบข้อมูลเรียบร้อยแล้ว',
                            showConfirmButton: false, //ปิดปุ่มยืนยัน
                            timer: 1500 // ระยะเวลาแสดง popup (1000 = 1วินาที)
                        })
                        this.loadAllCG();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
                    } else {
                        console.log(res.data);
                    }
                });
            }
        })
    }


    doSubmitCG() {
        var user = JSON.parse(localStorage.getItem('currentUser'));       //ค่าจาก login ของเอ ที่เก็บค่าไว้จากตอนที่ login เข้าระบบ
        this.CG.USER_CREATE = user.Username;       //ค่าจาก login ของเอ ที่เก็บค่าไว้จากตอนที่ login เข้าระบบ
        // ไม่ใช่โหมดแก้ไข เป็นโหมดเพิ่มข้อมูลใหม่
        // ในการทดสอบนี้เราทำาร push array ของ object staff ใหม่ เพิ่ม

        if (this.globals.editmode == false) {
            this.CG.START_DATE = this.CG.START_DATE_CNANGE_GRADE.year + '/' + this.CG.START_DATE_CNANGE_GRADE.month + '/' + this.CG.START_DATE_CNANGE_GRADE.day;
            this.CG.END_DATE = this.CG.END_DATE_CNANGE_GRADE.year + '/' + this.CG.END_DATE_CNANGE_GRADE.month + '/' + this.CG.END_DATE_CNANGE_GRADE.day;
            this.busy = this.dataservice.addCG(this.CG).subscribe(res => {
                if (res.status === 'error') {
                    console.log(res.member);
                    swal(
                        'Oops...',
                        'ข้อมูลไม่ถูกต้อง !',
                        'error'
                    )
                } else {
                    swal({
                        type: 'success',
                        title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.loadAllCG();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง
                    this.CG = {};
                    this.globals.datepicker.END_DATE_CNANGE_GRADE = {};
                    
                }
            });
        } else { // แต่ถ้าเป็นโหมดแก้ไข เราก็ให้อัพเดทข้อมูล staffs array ตาม index ที่ส่งมา แก้ไข

            swal({ // เรียก popup confrim การลบ staff
                title: 'Are you sure?',
                html: '<font color = "orange">คุณต้องการแก้ไข </font>' + this.CG.CHANGE_GRADE_ITEM_ID + " หรือไม่?",
                type: 'warning',

                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.value) {
                    console.log(this.CG)
                    this.CG.START_DATE = this.CG.START_DATE_CNANGE_GRADE.year + '/' + this.CG.START_DATE_CNANGE_GRADE.month + '/' + this.CG.START_DATE_CNANGE_GRADE.day;
                    this.CG.END_DATE = this.CG.END_DATE_CNANGE_GRADE.year + '/' + this.CG.END_DATE_CNANGE_GRADE.month + '/' + this.CG.END_DATE_CNANGE_GRADE.day;
                    this.dataservice.updateCG(this.CG).subscribe(res => {
                        if (res.status === "success") { //เมื่อแก้ไข staff แล้ว
                            swal({//ให้แสดง popup success
                                type: 'success',
                                title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                                showConfirmButton: false, //ปิดปุ่มยืนยัน
                                timer: 1500 // ระยะเวลาแสดง popup (1000 = 1วินาที)
                            })
                            this.loadAllCG();//เรียกฟังชันโหลดรายชื่อ staff เพื่อรีเฟสข้อมูลในตาราง

                        } else {
                            console.log(res.member)
                            swal(
                                'Oops...',
                                'ข้อมูลไม่ถูกต้อง !',
                                'error'
                            )
                        }
                    });
                }
            })
        }
    }


    checkNum(num){
        if(num.length >= 13){
          num = num.slice(0,13)
          this.CG.BARCODE_ITEM_CHANGE = num;
          this.CG.BARCODE_NEW_ITEM_CHANGE = num;
      }} 
      
      

      //qr
      startScan(){
        this.startCam = true;
        this.cam = false;
      }

      displayCameras(cameras: object[]) {

        console.log('Devices: ', cameras);
  
        this.availableDevices = cameras;
  
        if (cameras && cameras.length > 0) {
            this.selectedDevice = cameras[0];
        }
    }
  
    handleQrCodeResult(result: string) {
  
        console.log('Result: ', result);

        if (result != null){
            this.CG.BARCODE_NEW_ITEM_CHANGE = result;
            this.startCam = false;
            this.cam = true;
        }
      
    }
  
    onChange(selectedValue: object) {
  
        console.log('Selection changed: ', selectedValue);
  
        this.cameraStarted = false;
        this.selectedDevice = selectedValue;
        this.cameraStarted = true;
    }

}
