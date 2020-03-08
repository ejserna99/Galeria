import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

export interface ItemSlider { id: string; rutaImg: string; clase: string; }

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  slides: ItemSlider[];

  constructor(private dataApiService: DataApiService) { }

  ngOnInit() {
    this.dataApiService.getGallerys('slider').subscribe(data => {
      this.slides = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() } as ItemSlider;
      });
    });
  }

}
