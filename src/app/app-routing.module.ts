import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/components/login/login.component';
import { DashboardComponent } from './components/admin/components/dashboard/dashboard.component';
import { SliderComponent } from './components/slider/slider.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio',   component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'galeria',  component: GaleriaComponent },
  // { path: 'blog',     component: BlogComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin',    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',   component: LoginComponent },
      { path: 'home',    component: DashboardComponent },
      { path: 'inicio',  component: InicioComponent },
      { path: 'slider',  component: SliderComponent },
      { path: 'galeria', component: GaleriaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
