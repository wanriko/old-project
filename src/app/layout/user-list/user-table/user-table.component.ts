import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { DataService } from '../../../services';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-table',
  styleUrls: ['user-table.component.scss'],
  templateUrl: 'user-table.component.html',
})
export class UserTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private http: Http,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadAlluser();
  }

  loadAlluser(){
    this.dataService.getuserlist()
      .subscribe(persons => {
        this.persons = persons.member;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

}