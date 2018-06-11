import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// SERVICES
import { DataService } from './services/index';
// DATA TABLE MODULE
import { DataTablesModule } from 'angular-datatables';
// APP ROUTING
import { routing } from './app.routing';
// APP COMPONENT
import { AppComponent } from './app.component';
// LOGIN GUARD
import { AuthGuard } from './components/guard/login.guard';
// GLOBAL
import { Globals } from './components/globals/globals';
// Loading




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    DataTablesModule,

  ],
  providers: [
    DataService,
    AuthGuard,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
