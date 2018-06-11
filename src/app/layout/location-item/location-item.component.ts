import { Component, OnInit ,ViewChild } from '@angular/core';
import { DataService } from '../../services/index';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

  datas: any[]; 
  LCTitem: any = {}; 

  private hiddenDescript =true;   //ซ่อนช่องแสดง descript
  private itemIdInput: boolean;
  private hiddenhaveLocation: boolean;
  private hiddennoLocation: boolean;
  private hiddenTableDefalse: boolean;
  private ITEM_ID
  private item_desc
  private locations_list
  private CheckHaveItem 
  arrayOfStrings = [];
  
  constructor( 
    private dataService : DataService,  
    private globals: Globals,
  ) { }

  ngOnInit(): void {
    this.getTableLocationItem();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.hiddenhaveLocation = true; 
    this.hiddennoLocation = true;
    this.hiddenTableDefalse = false;
   // this.getITEM_MASTER();
  }

  getTableLocationItem() {
    this.dataService.getTableLocationItem().subscribe
    (res => {                         // ดึงข้อมูล
      this.datas = res.member 
          this.getITEM_MASTER();
      // console.log(this.datas)
    })
  }

  findItemId(searchItem) {
    // console.log('find :' + searchItem)
    // console.log('find' + 
    return this.arrayOfStrings.find((item) =>  {
        return item === searchItem;
    })
  // )
  }

  SearchItemId(){
    // console.log('SearchItemId(ITEM_ID)'+this.ITEM_ID)
    // console.log(this.findItemId(this.ITEM_ID))
    if(this.findItemId(this.ITEM_ID) === undefined) {
      swal(
        'ไม่พบรหัสสินค้าที่กำหนด !',
        'กรุณากรอกรหัสสินค้าใหม่',
        'error',
      )
      this.ITEM_ID = ''
      return
    }
    var user = JSON.parse(localStorage.getItem('currentUser'));   //ค่าจากตอนที่ login เข้าระบบ
    this.LCTitem.CREATE_BY = user.Username;  //ค่าจากตอนที่ login เข้าระบบ
      this.dataService.SearchLocationItem(this.ITEM_ID).subscribe(res=>{
        //  console.log("locations :"+ JSON.stringify(res))
        this.getItemDescript(this.ITEM_ID);
        this.hiddenDescript=false;
        if( res.status === 'success'){
          this.LCTitem.LOCATION_ID  = res.item[0].location_id;  ////// แสดงใน swall
          this.LCTitem.STATUS_AA01 = res.item[0].STATUS_AA01;   ////// แสดงใน swall
          swal({ 
            type: 'warning',
            html:
                'LOCATION ที่ใช้งานอยู่ : '+ '<u>'+ this.LCTitem.LOCATION_ID +'</u>'
                + '<br>' +
                'สถานะ LOCATION : ' + '<u>'+ this.LCTitem.STATUS_AA01  + '</u>'
                + '<br>' +
                ' คุณต้องการเปลี่ยนสถานะ LOCATION  หรือไม่? ',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'เปลี่ยนสถานะ',
            cancelButtonText: 'กลับ',
            backdrop: false
          }).then((result) =>{
            if(result.value){
              this.itemIdInput = true;
              this.hiddenhaveLocation = false;
              this.hiddennoLocation = true;
              this.hiddenTableDefalse = true;
              this.LCTitem.LOCATION_ID  = res.item[0].location_id;
              this.LCTitem.STATUS_AA01 = res.item[0].STATUS_AA01;
            } 
            else if(result.dismiss === 'cancel'){
              this.ITEM_ID = '';
              this.item_desc='';
              this.hiddenDescript=true;
            }
          })
        }
        else if(res.status === 'error'){ 
          swal({
            // html:
            // 'ITEM : '+ '<u>'+ this.ITEM_ID +'</u>'
            // + '<br>' +
            // 'ยังไม่ถูกกำหนด Location ในระบบ'+'</u>'
            // + '<br>' +
            // 'คุณต้องการกำหนด LOCATION_ID หรือไม่ ? ',
            title: 'ITEM ID นี้ ยังไม่ถูกกำหนด Location ในระบบ',
            text: "คุณต้องการกำหนด LOCATION_ID หรือไม่?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'กำหนด Location ',                     
            cancelButtonText: 'กลับ',
            backdrop: false
          }).then((result) => {
            if (result.value) {
            this.itemIdInput = true;
            this.hiddenTableDefalse = true;
            this.hiddenhaveLocation = true;
            this.hiddennoLocation = false;
            }
            else if(result.dismiss === 'cancel'){
              this.ITEM_ID = ''
              this.item_desc='';
              this.hiddenDescript=true;
            }
          })
        }           
      });   
  } 

  showLocationsTable() { ///แสดงงงง location// fast //slow
    var user = JSON.parse(localStorage.getItem('currentUser'));   //ค่าจากตอนที่ login เข้าระบบ
    this.LCTitem.CREATE_BY = user.Username;
    var locationStatus = this.LCTitem.STATUS_AA02;
    // console.log(locationStatus)
    this.dataService.Locations_list(locationStatus).subscribe( res=> {
      //  console.log("locations :"+ JSON.stringify(res))
      if( res.status) {  
          // console.log(res)
          this.locations_list = res.data;
        } else {  } 
    });
  }

  selectLocation(location_id){  ///เลือก location// fast //slow
    swal({
      title: 'กำหนด location_id',
      text: "คุณต้องการกำหนด" + location_id + "หรือไม่?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'OK',                     
      cancelButtonText: 'CANCLE',
    }).then((result) => {
      if(result.value){
        this.insertLocation(location_id) ;
        this.getTableLocationItem();
        this.hiddenTableDefalse = false;
        this.hiddennoLocation = true;
        this.locations_list = []
      }
    })
  }

  insertLocation(location_id) {
    // console.log('insertLocation'+JSON.stringify(this.LCTitem))
    this.LCTitem.LOCATION_ID = location_id;
    this.LCTitem.STATUS_AA02;
    this.LCTitem.ITEM_ID = this.ITEM_ID;
    this.dataService.insertStatusItem(this.LCTitem).subscribe(res=> {
      if (res.status === "success") { 
        //console.log("สำเร็จ : "+res.message)                
          swal({
              type: 'success',
              title: 'insert!',
              text: "บันทึกข้อมูลเรียบร้อยแล้ว",
              showConfirmButton: false, 
              timer:1800, 
          })
          this.getTableLocationItem();
          this.ITEM_ID = '';
          this.item_desc='';
          this.hiddenDescript=true;
          this.clear();
      }else{
        //console.log('ไม่สำเร็จ'+JSON.stringify(res))
        swal(
          'Oops...',
          'ข้อมูลไม่ถูกต้อง !',
          'error'
      )}
    });
  }
   
  UpdStatusItem() { 
    // console.log(this.LCTitem)
    this.dataService.UpdStatusItem(this.LCTitem).subscribe(res=>{
    if (res.status === 'success'){ 
      // console.log("สำเร็จ : "+res.message)                 
        swal({
            type: 'success',
            title: 'update!',
            text: "บันทึกข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false, 
            timer:1800, 
        })
        this.getTableLocationItem();
        this.hiddenTableDefalse = false;
        this.hiddenDescript=true;
        this.clear();
      }
    else if(res.status === 'error'){ 
      // console.log('ไม่สำเร็จ'+JSON.stringify(res))
      swal( 
        'Oops...',
        'ข้อมูลไม่ถูกต้อง !',
        'error'
      )
    } 
    });
  }

  getITEM_MASTER(){
    this.dataService.SearchITEM_MASTER().subscribe( res =>{
      // console.log(res.data);
      this.CheckHaveItem = res.data;
      // console.log('adsdada :' +  JSON.stringify(res.data))=
        res.data.forEach(element => {
        // console.log(element.ITEM_ID) ;
        this.arrayOfStrings.push(element.ITEM_ID);
      });      
    });
     //console.log(this.arrayOfStrings);
  }

  valueChanged(Z) {
    this.ITEM_ID = Z;
    // console.log("Case 2: value is changed to ",  this.ITEM_ID);   
  }

  clear(){
    this.ITEM_ID = ''
    this.LCTitem.STATUS_AA02 = ''
    this.LCTitem.STATUS_AA01 = ''
    this.item_desc=''
    this.hiddenhaveLocation = true;
    this.hiddennoLocation = true;
    this.hiddenTableDefalse = false;
    this.itemIdInput = false;
    this.hiddenDescript = true;
  }

  getItemDescript(itemId){
    this.dataService //class ชื่อ Dataservice
    .SearchItemDesc(itemId) //function ใน class Dataservice
    .subscribe( response => { // ค่าที่ return มาจาก function
    // ไว้ทำงานกับค่า response  ว่าจะเอาไปทำอะไร
      if(response.status) 
      {
        // console.log(response.data)
        this.item_desc = response.data[0].ITEM_DESC
      }
      else
      {
        console.log('getItemDescript Error')
      }
    });
  }






}

