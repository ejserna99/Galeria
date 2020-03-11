import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private router: Router) { }

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
    this.rutaDash = ruta;
  }

  cerrarSesion() {
    this.authService.logoutUser();
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 300);
  }
}
