import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take, tap, map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mensaje: string;
  public logget = true;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.isAuth().subscribe(a => {
      this.logget = a ? true : false;
      
      if (this.logget) {
        this.router.navigate(['admin/home']);
        console.log('legget', this.logget);
      }
    });

  }

  ngOnInit() { }

  onSubmit() {
    $('.btn').prop('disabled', true);
    $('.text-btn').addClass('d-none');
    $('.cargando').removeClass('d-none').addClass('d-block');
    const email = $('#email').val().toString();
    const password = $('#password').val().toString();

    this.authService.loginUser(email, password).then(res => {
      this.authService.isAuth();
      console.log(res);
      this.router.navigate(['/admin/home']);
    }, err => {
      if (err.code === 'auth/wrong-password') {
        this.mensaje = 'Contraseña invalida';
      } else {
        this.mensaje = 'Correo invalido';
      }
      console.log(err.code);
    });
    $('.btn').prop('disabled', false);
    $('.text-btn').removeClass('d-none');
    $('.cargando').removeClass('d-block').addClass('d-none');
  }
}
