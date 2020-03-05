import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  rutaLogin = false;

  constructor(private location: Location) {

    if (location.path().indexOf('login') > 0) {
      this.rutaLogin = true;
    }
  }

  ngOnInit() {
  }

}
