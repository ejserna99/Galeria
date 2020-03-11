import { Component, OnInit, HostListener, Inject, EventEmitter, Output } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Location, DOCUMENT } from '@angular/common';

export interface ItemSlider { id: string; rutaImg: string; clase: string; }

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Output()
  public cargado = new EventEmitter<boolean>();

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
      if (this.slides) {
        this.cargado.emit(true);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 470) {
      $('.logo-brand').removeClass('fadeIn').addClass('fadeOut');
      this.logo = false;
    } else if ((this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 500) {
      if (this.location.path().indexOf('admin') <= 0) {
        this.logo = true;
      }
      $('.logo-brand').removeClass('fadeOut').addClass('fadeIn');
    }
  }

}
