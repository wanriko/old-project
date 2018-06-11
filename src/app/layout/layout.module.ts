import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout.routing';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, TopnavComponent, FooterComponent } from './components/index';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbDropdownModule.forRoot(),
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    TopnavComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
