import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/index';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import 'rxjs/add/operator/map';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  errorMessage: string;
  login: any = {};
  returnUrl: string;
  result: string;
  loading = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() { 
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.errorMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.errorMessage = null);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'; 
  }

  btnlogin() {
    if (this.login.username == null || this.login.password == null) {
      console.log('1');
    } else {
      this.loading = true;
      this.dataService.login(this.login).subscribe(res=>{
          if (res.status === "success") {
            localStorage.setItem('currentUser', JSON.stringify(res.member));
            this.router.navigate([this.returnUrl]);
          } else {
            this.Message();
          }
          return false;
        });
    }
  };

  Message() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }

}