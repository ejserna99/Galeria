import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGaleriaComponent } from '../modal-galeria/modal-galeria.component';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  galeriaItems = [
    {image: 'https://concepto.de/wp-content/uploads/2018/09/pintura2-e1536849433346.jpg'},
    // tslint:disable-next-line:max-line-length
    {image: 'https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1427048841/content-items/001/251/612/IMG_7410_como_objeto_inteligente-1-original.jpg?1427048841'},
    {image: 'https://i.blogs.es/8a5aab/650_1000_640px-vangogh-starry_night/450_1000.jpg'},
    // tslint:disable-next-line:max-line-length
    {image: 'https://previews.123rf.com/images/number168/number1681710/number168171000023/87696687-pintura-a-%C3%B3leo-colorida-abstrata-na-textura-da-lona-m%C3%A3o-desenhada-pincelada-fundo-de-pinturas-a-cores-de-.jpg'},
    {image: 'https://www.superprof.co/blog/wp-content/uploads/2019/04/pintura-tecnica-acuarela.jpg'},
    // tslint:disable-next-line:max-line-length
    {image: 'https://i0.wp.com/dibujoypintura.net/wp-content/uploads/2018/04/Errores-A-Evitar-En-Tus-Pinturas-Acr%C3%ADlicas.jpg?resize=525%2C640&ssl=1'},
    // tslint:disable-next-line:max-line-length
    {image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'},
    {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9Wtvoe9-PtCEEztnc5-E5X6Ra4bcJJlznFcUPRAtThpVKoaPa'},
    {image: 'https://i.blogs.es/6fd7ce/van-gogh/450_1000.jpg'},
    {image: 'https://spanish.people.com.cn/NMediaFile/2018/1116/FOREIGN201811161551000590566917792.jpg'},
    {image: 'https://www.chusbelinchon.com/wp-content/uploads/2018/10/El-ni%C3%B1o-de-las-pinturas.jpg'}
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(evt): void {
    const dialogRef = this.dialog.open(ModalGaleriaComponent, {
      width: '80%',
      height: '80vh',
      data: { img: evt }
    });
  }
}
