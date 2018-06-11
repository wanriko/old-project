import { Injectable, ErrorHandler } from '@angular/core';
import { Http,RequestOptions, ResponseContentType, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { errorHandler } from '@angular/platform-browser/src/browser';
import { error } from 'util';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Injectable()
export class DataService {
  constructor(private http: Http) {  }

  login(user) {
    return this.http.post('http://10.0.120.126:1669/api/member/',user)
      .map(res => res.json());
  }

  getfile(){
    var user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get('http://10.0.120.126:1669/api/filelist/'+ user.Username)
      .map(res => res.json());
  }

  getuserlist(){
    return this.http.get('http://10.0.120.126:1669/api/userlist/')
      .map(res => res.json());
  }

  addUser(user : string){
    return this.http.post('http://10.0.120.126:1669/api/adduser',user)
    .map(res=> res.json());
  }
  
  updateUser(dataUser) {
    return this.http.post('http://10.0.120.126:1669/api/updateuser', dataUser)
  }

  delUser(id) {
    var userID = { id };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://10.0.120.126:1669/api/deluser', userID)
      .map(res => res.json());
  }

  downloadFile(id): Observable<Blob> {
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http.get('/' + id, options)
      .map(res => res.blob());
  }
  
  logout() {
    localStorage.removeItem('currentUser');
  }

  addCG(CG) {
    return this.http.post('http://10.0.120.126:1669/api/adCG', CG)
      .map(res => res.json());
  }

  getdataCG() {
    return this.http.get('http://10.0.120.126:1669/api/dataCG')
      .map(res => res.json());
  }
  
  CGlist() {
    return this.http.post('http://10.0.120.126:1669/api/CGlist',{})
      .map(res => res.json());
  }

  updateCG(CG) {
    return this.http.post('http://10.0.120.126:1669/api/upCG', CG)
      .map(res => res.json());
  }

  delCG(id) {
    var CHANGE_GRADE_ITEM_ID = { id };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://10.0.120.126:1669/api/delCG', CHANGE_GRADE_ITEM_ID)
      .map(res => res.json());
  }

  //////////////// show TableCountStock /////////////////
  getTableCountStock(){
    return this.http.get('http://10.0.120.126:1669/api/TableCountStock')
    .map(res => res.json());
  }

  //////////////// insertCountStock /////////////////                                    //insertCS -*--ใช้กับ .คอลัมน์
  AddCountStock (insertCS){                                                   //AddCountStock------3
    // console.log(insertCS);  
    return this.http.post('http://10.0.120.126:1669/api/insertCStock',insertCS )           //insertCountStock --------4
    .map(res=> res.json());
  }

  /////////Delete CSTK_SUPPLIER_PLAN_COUNT_STOCK
  DellCStock(id) {
    var COUNT_STOCK_ITEM_ID = { id };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://10.0.120.126:1669/api/delCStock',COUNT_STOCK_ITEM_ID)
      .map(res => res.json());
  }

  //////////////// update CSTK_SUPPLIER_PLAN_COUNT_STOCK /////////////////                  
  UpdCStock(insertCS){    
    // console.log(insertCS);                                                //UpdCStock------3
    return this.http.post('http://localhost:1234/api/updateCStock',insertCS)      //insertCS -----1    //updateCStock --------4  
    .map(res=> res.json());
  }

  //////////////// show  LocationItem /////////////////
  getTableLocationItem(){
    return this.http.post('http://localhost:1234/api/TableLOCATION_ITEM','')
    .map(res => res.json());
  }

//////////////// Search  LocationItem ///////////////// 
  SearchLocationItem(ITEM_ID){
    // console.log('dataservice/SearchLocationItem ITEM_ID  :'+ITEM_ID);
    var LocationItem = { ITEM_ID };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://localhost:1234/api/SearchLOCATION_ITEM',LocationItem)
    .map(res => res.json());
  }


  Locations_list(STATUS_AA02) {
    // console.log('dataservice/Locations_list(STATUS_AA02): '+STATUS_AA02);
    return this.http.post('http://localhost:1234/api/locationsList',{STATUS_AA02})
    .map(res => res.json());
  }

   //////////////// update LocationItem /////////////////    
  UpdStatusItem(LCTitem){
    // console.log("dataservice/UpdStatusItem(LCTitem) :" + LCTitem.STATUS_AA01 )
   //var StatusItem = { LOCATION_ID };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://localhost:1234/api/UpdateStatusLocation', LCTitem)
      .map(res => res.json());
  }

  //////////////// insert LocationItem /////////////////    
  insertStatusItem(location_id){
    // console.log("dataservice/insertStatusItem(location_id) :" + location_id )
    // console.log('dataservice/ไม่สำเร็จ'+JSON.stringify(location_id))
   //var StatusItem = { LOCATION_ID };//เอาค่า id ใส่ใน array userID
    return this.http.post('http://localhost:1234/api/insertLOCATION_ITEM', location_id)
      .map(res => res.json());
  }

  //////////////// Search   ITEM_MASTER ///////////////// 
  SearchITEM_MASTER(){
    return this.http.post('http://localhost:1234/api/SearchITEM_MASTER','')
    .map(res => res.json());
  }

  //////////////// Search   ITEM_DESC ///////////////// 
  SearchItemDesc(itemId){
    return this.http.post('http://localhost:1234/api/SearchITEM_DESC',{itemId:itemId})
    .map(res => 
      res.json()
    );
  }



}


