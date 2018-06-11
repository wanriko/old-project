import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Globals } from '../../components/globals/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition()]
})
export class HomeComponent implements OnInit {

  constructor( private globals:Globals ) { }

  ngOnInit() {
    this.globals.editMode = false;
    this.globals.navTitle = "";
  }

}
