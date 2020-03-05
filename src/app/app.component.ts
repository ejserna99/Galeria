import { Component, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Location, DOCUMENT } from '@angular/common';

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

  constructor(private location: Location, @Inject(DOCUMENT) document) {
    // console.log(location.path().indexOf('admin'));
    if (location.path().indexOf('admin') > 0) {
      this.rutaAdmin = true;
      console.log('admin');
    }
  }

  @HostListener('window:scroll', ['$event'])onWindowScroll(e) {
    // if (window.pageYOffset > 900) {
    //   const element = document.getElementById('navbar');
    //   element.classList.add('sticky', 'fadeInUp');

    //   const link = document.querySelector('.active');
    //   if (link) {
    //     link.classList.add('active-sticky');
    //     link.classList.remove('active');
    //   }
    // } else {
    //   const element = document.getElementById('navbar');
    //   element.classList.remove('sticky', 'fadeInUp');

    //   const link = document.querySelector('.active-sticky');
    //   if (link) {
    //     link.classList.remove('active-sticky');
    //     link.classList.add('active');
    //   }
    // }
  }
}
