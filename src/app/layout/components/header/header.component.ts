import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../components/globals/globals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    
    constructor( private globals : Globals ) {
    }
    ngOnInit() {  }

    onLoggedout() {
        localStorage.removeItem('currentUser');
    }

}
