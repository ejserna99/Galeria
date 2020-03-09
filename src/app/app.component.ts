import { Component, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Location, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade',
    [
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})
export class AppComponent {
  title = 'Galeria';
  rutaAdmin = false;
  windowScrolled = false;

  constructor(private location: Location, private router: Router, @Inject(DOCUMENT) document) {
    // console.log(location.path().indexOf('admin'));
    if (location.path().indexOf('admin') > 0) {
      this.rutaAdmin = true;
    }

    if (location.path() === '') {
      window.location.href = '/inicio';
    }
  }

  @HostListener('window:scroll', ['$event'])onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 620) {
      this.windowScrolled = true;
      $('#navbar').removeClass('bg-dark').addClass('bg-light fixed-top fadeInUp');
      // tslint:disable-next-line:max-line-length
      $('.active').css({color: 'color: rgba(0,0,0,.5) !important', 'text-shadow': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;'});
      $('.btn-whatsapp,.scroll-top').removeClass('d-none');
    } else if ((this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 500) {
      this.windowScrolled = false;
      $('#navbar').removeClass('bg-light fixed-top fadeInUp').addClass('bg-dark');
      $('.btn-whatsapp,.scroll-top').addClass('d-none');
    }
  }
}
