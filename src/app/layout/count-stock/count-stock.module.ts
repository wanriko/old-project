import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CountStockRoutingModule } from './count-stock.routing';
import { CountStockComponent } from './count-stock.component';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CountStockDatepickerComponent } from './count-stock-datepicker/count-stock-datepicker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CountStockRoutingModule,
        NgbModule,
        DataTablesModule,
    ],
    declarations: [CountStockComponent, CountStockDatepickerComponent]
})
export class CountStockModule { }