import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    $(".btn").prop('disabled', true);
    $(".text-btn").addClass('d-none');
    $(".cargando").removeClass('d-none').addClass('d-block');
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
    $(".btn").prop('disabled', false);
    $(".text-btn").removeClass('d-none');
    $(".cargando").removeClass('d-block').addClass('d-none');
  }
}
