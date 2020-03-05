import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  slides = [
    { image: 'https://i.pinimg.com/originals/6f/ed/3c/6fed3cfe52eb83f114834296c777bf4d.jpg', clase: 'active'},
    { image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-lake-world-gallery-1920x1080-wallpapers.jpg', clase: '' },
    // tslint:disable-next-line:max-line-length
    { image: 'https://adistorres.files.wordpress.com/2016/03/windows-theme-official-wallpaper-japan-discount-themes-gallery-14368.jpg',  clase: '' },
    // tslint:disable-next-line:max-line-length
    { image: 'https://free-hd-wallpapers.info/wp-content/uploads/2018/03/gallery-wallpaper-art-gallery-wallpaper-1440x900.jpg',     clase: '' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
