import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  cargado = false;
  constructor() { 
    console.log('me invocaste', this.cargado);
  }

  ngOnInit() {
  }

  procesaPropagar(mensaje) {
    this.cargado = mensaje;
    console.log(mensaje);
  }

}
