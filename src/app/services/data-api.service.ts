import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  createNewGallery(collection: string, record: any) {
    return this.firestore.collection(collection).add(record);
  }

  getGallerys(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  updateGallery(collection: string, recordId: string, record: any) {
    this.firestore.doc(`${collection}/${recordId}`).update(record);
  }

  deleteGallery(collection: string, recordId: string) {
    this.firestore.doc(`${collection}/${recordId}`).delete();
  }

  // Tarea para subir Imagen
  public cloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  // Referencia de la Imagen
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  addImage(file: any, filePath: string) {
    const id = Math.random().toString(36).substring(2);
    filePath = filePath + id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

    return { porcentaje: this.uploadPercent, urlImage: this.urlImage};
  }
}
