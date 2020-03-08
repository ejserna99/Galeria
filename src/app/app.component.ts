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

    if (location.path() == '') {
      window.location.href = '/inicio';
    }
  }

  // @HostListener('window:scroll', ['$event'])onWindowScroll(e) {
  //   // if (window.pageYOffset > 900) {
  //   //   const element = document.getElementById('navbar');
  //   //   element.classList.add('sticky', 'fadeInUp');

  //   //   const link = document.querySelector('.active');
  //   //   if (link) {
  //   //     link.classList.add('active-sticky');
  //   //     link.classList.remove('active');
  //   //   }
  //   // } else {
  //   //   const element = document.getElementById('navbar');
  //   //   element.classList.remove('sticky', 'fadeInUp');

  //   //   const link = document.querySelector('.active-sticky');
  //   //   if (link) {
  //   //     link.classList.remove('active-sticky');
  //   //     link.classList.add('active');
  //   //   }
  //   // }
  // }

  @HostListener('window:scroll', ['$event'])onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 620) {
      this.windowScrolled = true;
      $('nav').removeClass('bg-dark').addClass('bg-light fixed-top fadeInUp');
      $('.active').css({"color": "color: rgba(0,0,0,.5) !important", "text-shadow": "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"});
    } 
    else if ((this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 500) {
      this.windowScrolled = false;
      $('nav').removeClass('bg-light fixed-top fadeInUp').addClass('bg-dark');
    }
  }
}
