import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navItems = [
    { name: 'Inicio',   rute: 'inicio' },
    { name: 'Nosotros', rute: 'nosotros' },
    { name: 'Galeria',  rute: 'galeria' },
    // { name: 'Blog',     rute: 'blog' },
    { name: 'Contacto', rute: 'contacto' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
