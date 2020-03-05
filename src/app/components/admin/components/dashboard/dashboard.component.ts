import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rutaDash: string;
  navItems = [
    { name: 'Inicio',       rute: 'inicio' },
    { name: 'Diapositivas', rute: 'slider' },
    { name: 'Galeria',      rute: 'galeria' }
  ];

  constructor(private location: Location) {

    // this.rutaHome = location.path();
  }

  ngOnInit() {
  }

  isMobileMenu() {
    if ( window.innerWidth > 991) {
        return false;
    }
    return true;
  }

  menuToggle() {
    $('#wrapper').toggleClass('toggled');
  }

  cargarRuta(ruta: string) {
    console.log(ruta);
    this.rutaDash = ruta;
  }
}
