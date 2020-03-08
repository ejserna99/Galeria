import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/admin/components/login/login.component';
import { DashboardComponent } from './components/admin/components/dashboard/dashboard.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AuthGuard } from './guard/auth.guard';
import { AppComponent } from './app.component';
import { IsLoggetGuard } from './guard/is-logget.guard';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'inicio',   component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'galeria',  component: GaleriaComponent },
  // { path: 'blog',     component: BlogComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin/login',   component: LoginComponent },
  { path: 'admin/home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
