import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

// Componentes de Administrador
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
import { DataApiService } from './services/data-api.service';
import { DomSeguroPipe } from './pipes/dom-seguro.pipe';

@NgModule({
  declarations: [
    AppComponent,
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
    CmsGaleriaComponent,
    DomSeguroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDialogModule
  ],
  entryComponents: [ModalGaleriaComponent],
  providers: [DataApiService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
