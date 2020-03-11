import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IsLoggetGuard implements CanActivate {

  public logget: boolean;

  constructor(public authService: AuthService, private router: Router, public afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> | boolean {
    // return this.authService.isAuth().map(authState => {
    //   if (!authState) this.router.navigate(['/login']);
    //   console.log('activate?', !!authState);
    //   return !!authState;
    // }).take(1)

    return true;
  }
}
