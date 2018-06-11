import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeGradeComponent } from './change-grade.component';
import { ChangeGradeRoutingModule} from'./change-grade-routing';
import { DataTablesModule } from 'angular-datatables';
import { ChangeGradeDatepickerComponent } from './change-grade-datepicker/change-grade-datepicker.component';
import { BusyModule } from 'angular2-busy';
//qr
import { NgxZxingModule } from 'ngx-zxing';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgbDropdownModule.forRoot(),
        ChangeGradeRoutingModule,
        DataTablesModule,
        BusyModule,
        //qr
        NgxZxingModule.forRoot()
    ],
    declarations: [ChangeGradeComponent, ChangeGradeDatepickerComponent]
  })
  export class ChangeGradeModule {}
  