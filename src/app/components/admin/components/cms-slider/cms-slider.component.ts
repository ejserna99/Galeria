import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-cms-slider',
  templateUrl: './cms-slider.component.html',
  styleUrls: ['./cms-slider.component.css']
})
export class CmsSliderComponent implements OnInit {

  public sliderCmsForm = new FormGroup({
    image: new FormControl(null, Validators.required),
    clase: new FormControl(null, Validators.required)
  });

  public mensajeArchivo = 'No hay una imagen seleccionada';
  public datosFormulario = new FormData();
  public nombreArchivo = 'Cargar imagen';
  public respuesta = { color: 'success', mensaje: '' };
  public porcentaje = 0;
  public finalizado: boolean;

  constructor(public dataApiService: DataApiService) {
    $(document).ready( () => {
      $('#success-alert').hide();
    });
  }

  ngOnInit() {
    $('#success-alert').hide();
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
    this.finalizado = false;
    $('.btn').prop('disabled', true);
    $('.text-btn').addClass('d-none');
    $('.cargando').removeClass('d-none').addClass('d-block');

    const ruta = `upload/images/slider/slider_${this.nombreArchivo}`;
    const archivo = this.datosFormulario.get('image');
    const referencia = this.dataApiService.referenciaCloudStorage(ruta);
    const tarea = this.dataApiService.cloudStorage(ruta, archivo);

    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      console.log(this.porcentaje);

      if (this.porcentaje === 100 && this.finalizado === false) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          this.dataApiService.createNewGallery('slider', { image: URL, clase: value.clase, name: this.nombreArchivo })
          .then(res => {
            console.log(res);
            this.respuesta.mensaje = 'Registro guardado correctamente.';
            $('#success-alert').fadeTo(2000, 500).slideUp(500, () => {
              $('#success-alert').slideUp(500);
            });
            this.mensajeArchivo = 'No hay una imagen seleccionado';
            $('.btn').prop('disabled', false);
            $('.text-btn').removeClass('d-none');
            $('.cargando').removeClass('d-block').addClass('d-none');
            this.sliderCmsForm.reset();
            return;
          }, err => {
            console.log(err);
            this.respuesta.color = 'danger';
            this.respuesta.mensaje = 'No se pudo guardar el registro';
            $('#success-alert').fadeTo(2000, 500).slideUp(500, () => {
              $('#success-alert').slideUp(500);
            });
            return;
          });
        });
      }
    });

  }

}
