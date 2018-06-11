import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../components/globals/globals';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  constructor( private globals : Globals ) { }

  ngOnInit() {
    startTime();
  }

  onLoggedout() {
    localStorage.removeItem('currentUser');
  }
}

function startTime() {
  var today = new Date();
  var Datenow = today.toISOString().slice(0, 10);
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =
    Datenow + " " +  h + ":" + m + ":" + s ;
  setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };
  return i;
}