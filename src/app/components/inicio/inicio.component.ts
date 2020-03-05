import { Component, OnInit } from '@angular/core';
import { ModalGaleriaComponent } from '../modal-galeria/modal-galeria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public cardItems = [
    {
      titulo: 'PINTURA',
      // tslint:disable-next-line:max-line-length
      descripcion: 'Técnica con la cual una superficie o soporte se llena de color y a través de líneas, materias y pigmentos se forma una imagen abstracta o figurativa.',
      image: 'https://cdn.shopify.com/s/files/1/1781/0251/files/pintura_239bdb58-a51f-4d01-8708-d00194eeb474_360x304.jpg?v=1501887116'
    },
    {
      titulo: 'PINTURA',
      // tslint:disable-next-line:max-line-length
      descripcion: 'Técnica con la cual una superficie o soporte se llena de color y a través de líneas, materias y pigmentos se forma una imagen abstracta o figurativa.',
      image: 'https://cdn.shopify.com/s/files/1/1781/0251/files/pintura_239bdb58-a51f-4d01-8708-d00194eeb474_360x304.jpg?v=1501887116'
    },
    {
      titulo: 'PINTURA',
      // tslint:disable-next-line:max-line-length
      descripcion: 'Técnica con la cual una superficie o soporte se llena de color y a través de líneas, materias y pigmentos se forma una imagen abstracta o figurativa.',
      image: 'https://cdn.shopify.com/s/files/1/1781/0251/files/pintura_239bdb58-a51f-4d01-8708-d00194eeb474_360x304.jpg?v=1501887116'
    },
    {
      titulo: 'PINTURA',
      // tslint:disable-next-line:max-line-length
      descripcion: 'Técnica con la cual una superficie o soporte se llena de color y a través de líneas, materias y pigmentos se forma una imagen abstracta o figurativa.',
      image: 'https://cdn.shopify.com/s/files/1/1781/0251/files/pintura_239bdb58-a51f-4d01-8708-d00194eeb474_360x304.jpg?v=1501887116'
    },
    {
      titulo: 'PINTURA',
      // tslint:disable-next-line:max-line-length
      descripcion: 'Técnica con la cual una superficie o soporte se llena de color y a través de líneas, materias y pigmentos se forma una imagen abstracta o figurativa.',
      image: 'https://cdn.shopify.com/s/files/1/1781/0251/files/pintura_239bdb58-a51f-4d01-8708-d00194eeb474_360x304.jpg?v=1501887116'
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(title, img, desc): void {
    const dialogRef = this.dialog.open(ModalGaleriaComponent, {
      width: '50%',
      data: { titulo: title, image: img, descripcion: desc }
    });
  }
}
