import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-galeria',
  templateUrl: './modal-galeria.component.html',
  styleUrls: ['./modal-galeria.component.css']
})
export class ModalGaleriaComponent implements OnInit {

  image: string;
  dataInicio: any;

  constructor(public dialogRef: MatDialogRef<ModalGaleriaComponent>, @Inject(MAT_DIALOG_DATA) public message: any) {
    if (message.img) {
      this.image = message.img;
    } else {
      this.dataInicio = message;
    }
  }

  ngOnInit() {
  }

}
