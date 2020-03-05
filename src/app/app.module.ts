import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

// Componentes de Administrador
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/components/login/login.component';
import { DashboardComponent } from './components/admin/components/dashboard/dashboard.component';

// Componentes
import { BlogComponent } from './components/blog/blog.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ModalGaleriaComponent } from './components/modal-galeria/modal-galeria.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SliderComponent } from './components/slider/slider.component';
import { CmsInicioComponent } from './components/admin/components/cms-inicio/cms-inicio.component';
import { CmsSliderComponent } from './components/admin/components/cms-slider/cms-slider.component';
import { CmsGaleriaComponent } from './components/admin/components/cms-galeria/cms-galeria.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    BlogComponent,
    ContactoComponent,
    FooterComponent,
    GaleriaComponent,
    HeaderComponent,
    InicioComponent,
    ModalGaleriaComponent,
    NosotrosComponent,
    PrincipalComponent,
    SliderComponent,
    CmsInicioComponent,
    CmsSliderComponent,
    CmsGaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule
  ],
  entryComponents: [ModalGaleriaComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
