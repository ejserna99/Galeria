import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-galeria',
  templateUrl: './modal-galeria.component.html',
  styleUrls: ['./modal-galeria.component.css']
})
export class ModalGaleriaComponent implements OnInit {

  image: any;
  dataInicio: any;

  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<ModalGaleriaComponent>, @Inject(MAT_DIALOG_DATA) public message: any) {
    if (message.img) {
      this.image = this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${message.img})`);
    } else {
      this.dataInicio = message;
    }
  }

  ngOnInit() {
  }

}
