import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list.component';
import { UserRoutingModule } from './user-list-routing';
import { UserTableComponent } from './user-table/user-table.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        UserRoutingModule,
        NgbModule.forRoot(),
        DataTablesModule
    ],
    declarations: [UserListComponent, UserTableComponent]
})
export class UserListModule { }