import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGaleriaComponent } from '../modal-galeria/modal-galeria.component';
import { DataApiService } from 'src/app/services/data-api.service';

export interface ItemGaleria { id: string; miniatura: string; image: string; }

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  galeriaItems: ItemGaleria[];

  constructor(private dataApiService: DataApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataApiService.getGallerys('galeria').subscribe(data => {
      this.galeriaItems = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() } as ItemGaleria;
      });
    });
  }

  openDialog(evt): void {
    const dialogRef = this.dialog.open(ModalGaleriaComponent, {
      width: '80%',
      height: '80vh',
      data: { img: evt }
    });
  }
}
