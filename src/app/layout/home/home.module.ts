import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing'

import { StatModule } from './stat/stat.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        HomeRoutingModule,
        StatModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }