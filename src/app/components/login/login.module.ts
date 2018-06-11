import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from './directives/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { AlertService } from '../../services/index';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    NgbModule,
  ],
  declarations: [LoginComponent,AlertComponent],
  providers: [
    AlertService
  ]
})
export class LoginModule {

}
