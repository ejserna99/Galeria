import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Location, DOCUMENT } from '@angular/common';

export interface ItemSlider { id: string; rutaImg: string; clase: string; }

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public slides: ItemSlider[];
  public logo = true;
  windowScrolled = false;

  constructor(private location: Location, private dataApiService: DataApiService, @Inject(DOCUMENT) document) {
    if (location.path().indexOf('admin') > 0) {
      this.logo = false;
    }
  }

  ngOnInit() {
    this.dataApiService.getGallerys('slider').subscribe(data => {
      this.slides = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() } as ItemSlider;
      });
    });
  }

  @HostListener('window:scroll', ['$event'])onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 470) {
      $('.logo-brand').removeClass('fadeIn').addClass('fadeOut');
      this.logo = false;
    } else if ((this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 500) {
      this.logo = true;
      $('.logo-brand').removeClass('fadeOut').addClass('fadeIn');
    }
  }

}
