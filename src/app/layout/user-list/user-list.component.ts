import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/index';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
import { Globals } from '../../components/globals/globals'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any = {};

  constructor(
    private dataservice: DataService,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.navTitle = "User List";
    this.globals.editMode = true;
  }

  btadduser() {
    this.dataservice.addUser(this.users).subscribe(res => {
      if (res.status === 'error') {
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
      }
    });
  }
  checknum(num,name){
    console.log(num);
      if (num.length >= 6){
        num = num.slice(0, 6)
        this.users.User_ID = num;
      }
  }
}
