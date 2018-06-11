import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationItemComponent } from './location-item.component';
import { LocationItemRoutingModule } from './location-item-routing';
import { DataTablesModule } from 'angular-datatables';
import { BusyModule } from 'angular2-busy';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        LocationItemRoutingModule,
        DataTablesModule,
        BusyModule,
        Ng2AutoCompleteModule,
        NgbDropdownModule.forRoot(),
    ],
    declarations: [LocationItemComponent]
  })
  export class LocationItemModule {}
  
