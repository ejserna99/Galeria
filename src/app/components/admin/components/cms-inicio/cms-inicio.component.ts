import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-inicio',
  templateUrl: './cms-inicio.component.html',
  styleUrls: ['./cms-inicio.component.css']
})
export class CmsInicioComponent implements OnInit {

  public inicioCmsForm = new FormGroup({
    image: new FormControl(null, Validators.required),
    titulo: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required)
  });

  public mensajeArchivo = 'No hay una imagen seleccionada';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public respuesta = { color: 'success', mensaje: '' };
  public porcentaje = 0;
  public finalizado = false;

  constructor(public dataApiService: DataApiService) {
    $(document).ready(function() {
      $("#success-alert").hide();
    });
  }

  ngOnInit() {
    $("#success-alert").hide();
  }

  public cambioArchivo(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Imagen preparada: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('image');
        this.datosFormulario.append('image', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay una imagen seleccionado';
    }
  }

  public insertarDatos(value: any) {
    $('.btn').prop('disabled', true);
    $('.text-btn').addClass('d-none');
    $('.cargando').removeClass('d-none').addClass('d-block');

    const nombreArchivo = `upload/images/inicio/card_${this.nombreArchivo}`;
    const archivo = this.datosFormulario.get('image');
    const referencia = this.dataApiService.referenciaCloudStorage(nombreArchivo);
    const tarea = this.dataApiService.cloudStorage(nombreArchivo, archivo);

    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      console.log(this.porcentaje);
      
      if (this.porcentaje === 100) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          this.dataApiService.createNewGallery('inicio', { titulo: value.titulo, descripcion: value.descripcion, image: URL })
          .then(res => {
            console.log(res);
            this.respuesta.mensaje = 'Registro guardado correctamente.';
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
              $("#success-alert").slideUp(500);
            });
            $('.btn').prop('disabled', false);
            $('.text-btn').removeClass('d-none');
            $('.cargando').removeClass('d-block').addClass('d-none');
            this.inicioCmsForm.reset();
            return;
          }, err => {
            console.log(err);
            this.respuesta.color = 'danger';
            this.respuesta.mensaje = 'No se pudo guardar el registro';
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
              $("#success-alert").slideUp(500);
            });
            return;
          });
        });
      }
    });

  }
}
