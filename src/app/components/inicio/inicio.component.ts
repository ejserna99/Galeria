import { Component, OnInit } from '@angular/core';
import { ModalGaleriaComponent } from '../modal-galeria/modal-galeria.component';
import { MatDialog } from '@angular/material/dialog';
import { DataApiService } from 'src/app/services/data-api.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

export interface ItemInicio { id: string; titulo: string; descripcion: string; image: string; }

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  cardItems: ItemInicio[];

  constructor(private dataApiService: DataApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataApiService.getGallerys('inicio').subscribe(data => {
      this.cardItems = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ItemInicio;
      });
    });
  }

  openDialog(title, img, desc): void {
    const dialogRef = this.dialog.open(ModalGaleriaComponent, {
      width: '50%',
      data: { titulo: title, image: img, descripcion: desc }
    });
  }
}
