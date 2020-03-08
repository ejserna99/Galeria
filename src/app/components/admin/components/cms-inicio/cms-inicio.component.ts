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
    const nombreArchivo = `upload/images/inicio/card_${this.nombreArchivo}`;
    let archivo = this.datosFormulario.get('image');
    let referencia = this.dataApiService.referenciaCloudStorage(nombreArchivo);
    let tarea = this.dataApiService.cloudStorage(nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          if (this.finalizado) {
            this.dataApiService.createNewGallery('inicio', { titulo: value.titulo, descripcion: value.descripcion, image: URL })
            .then(res => {
              console.log(res);
              this.respuesta.mensaje = 'Registro guardado correctamente.';
              this.inicioCmsForm.reset();
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
