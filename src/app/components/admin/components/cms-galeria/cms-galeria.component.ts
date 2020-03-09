import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-galeria',
  templateUrl: './cms-galeria.component.html',
  styleUrls: ['./cms-galeria.component.css']
})
export class CmsGaleriaComponent implements OnInit {

  public galeriaCmsForm = new FormGroup({
    miniatura: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required)
  });

  public datosFormulario = new FormData();
  public mensajeArchivo = { miniatura: 'Cargar imagen en miniatura', image: 'Cargar imagen' };
  public nombreArchivo = { miniatura: '', image: '' };
  public respuesta = { color: 'success', mensaje: '' };
  public porcentaje = { miniatura: 0, image: 0 };
  public finalizado = false;

  constructor(public dataApiService: DataApiService) { }

  ngOnInit() {
  }

  public cambioArchivo(event: any) {
    if (event.target.files.length > 0 && event.target.id == 'miniatura')
    {
      this.mensajeArchivo.miniatura = `Imagen preparada: ${event.target.files[0].name}`;
      this.nombreArchivo.miniatura = event.target.files[0].name;
      this.datosFormulario.delete('miniatura');
      this.datosFormulario.append('miniatura', event.target.files[0], event.target.files[0].name);
    }
    else if (event.target.files.length > 0 && event.target.id == 'image')
    {
  
      this.mensajeArchivo.image = `Imagen preparada: ${event.target.files[0].name}`;
      this.nombreArchivo.image = event.target.files[0].name;
      this.datosFormulario.delete('image');
      this.datosFormulario.append('image', event.target.files[0], event.target.files[0].name);
    }
    else
    {
      this.mensajeArchivo = {
        miniatura: 'No hay una miniatura seleccionada',
        image: 'No hay una imagen seleccionada'
      };
    }
  }

  public insertarDatos(value: any) {
    $(".btn").prop('disabled', true);
    $(".text-btn").addClass('d-none');
    $(".cargando").removeClass('d-none').addClass('d-block');

    // Creo la ruta de las imagenes
    const rutaMin = `upload/images/galeria/galeria_min_${this.nombreArchivo.miniatura}`;
    const rutaImg = `upload/images/galeria/galeria_${this.nombreArchivo.image}`;

    // Obtengo en archivo almacenado en el FormData
    let miniatura = this.datosFormulario.get('miniatura');
    let image = this.datosFormulario.get('image');

    // Creo la referencia de las images en el Storage
    let referenciaMin = this.dataApiService.referenciaCloudStorage(rutaMin);
    let referenciaImg = this.dataApiService.referenciaCloudStorage(rutaImg);

    // Creo la tarea que se encarga de subor las imagenes
    let tareaMin = this.dataApiService.cloudStorage(rutaMin, miniatura);
    let tareaImg = this.dataApiService.cloudStorage(rutaImg, image);

    // Capturo el cambio de porcentaje de subida para las imagenes
    tareaMin.percentageChanges().subscribe((porcentajeMin) => {
      this.porcentaje.miniatura = Math.round(porcentajeMin);
      tareaImg.percentageChanges().subscribe((porcentajeImg) => {
        this.porcentaje.image = Math.round(porcentajeImg);

        if (this.porcentaje.image == 100 && this.porcentaje.miniatura == 100)
        {
          this.finalizado = true;
          console.log(this.finalizado);

          // Obtengo la url de las imagenes subidas
          referenciaMin.getDownloadURL().subscribe((URLMIN) => {
            referenciaImg.getDownloadURL().subscribe((URLIMG) => {

              // Seguardan las urls en la base de datos
              this.dataApiService.createNewGallery('galeria', {
                miniatura: URLMIN, image: URLIMG, name: this.nombreArchivo.image 
              }).then(res => {
                this.respuesta.mensaje = 'Registro guardado correctamente.';
                this.mensajeArchivo = { miniatura: 'Cargar imagen en miniatura', image: 'Cargar imagen' };
                $(".btn").prop('disabled', false);
                $(".text-btn").removeClass('d-none');
                $(".cargando").removeClass('d-block').addClass('d-none');
                this.galeriaCmsForm.reset();
              }, err => {
                this.respuesta.color = 'danger';
                this.respuesta.mensaje = 'No se pudo guardar el registro';
              });
            });
          });
        }
      });
    });
  }

}
