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
  public finalizado = false;

  constructor(public dataApiService: DataApiService) { }

  ngOnInit() {
  }

  public cambioArchivo(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Imagen preparada: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('image');
        this.datosFormulario.append('image', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay una imagen seleccionado';
    }
  }

  public insertarDatos(value: any) {
    $(".btn").prop('disabled', true);
    $(".text-btn").addClass('d-none');
    $(".cargando").removeClass('d-none').addClass('d-block');

    const ruta = `upload/images/slider/slider_${this.nombreArchivo}`;
    let archivo = this.datosFormulario.get('image');
    let referencia = this.dataApiService.referenciaCloudStorage(ruta);
    console.log(referencia);
    let tarea = this.dataApiService.cloudStorage(ruta, archivo);
    console.log(tarea);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          if (this.finalizado) {
            this.dataApiService.createNewGallery('slider', { image: URL, clase: value.clase, name: this.nombreArchivo })
            .then(res => {
              console.log(res);
              this.respuesta.mensaje = 'Registro guardado correctamente.';
              this.mensajeArchivo = 'No hay una imagen seleccionado';
              $(".btn").prop('disabled', false);
              $(".text-btn").removeClass('d-none');
              $(".cargando").removeClass('d-block').addClass('d-none');
              this.sliderCmsForm.reset();
            }, err => {
              console.log(err);
              this.respuesta.color = 'danger';
              this.respuesta.mensaje = 'No se pudo guardar el registro';
            });
          }
        });
      }
    });
  }

}
