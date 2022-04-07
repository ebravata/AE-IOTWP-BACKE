import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;

  constructor() {}

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(){
    this._ocultarModal = false;
  }
  
  cerrarModal(){
    this._ocultarModal = true;
  }


  lanzarQuery(): Observable <number> {
    
    return new Observable <number> ( observer => {

      let i = 0;
      const intervalo = setInterval ( () => {
        
        i++;
        
        if ( !this._ocultarModal )
          observer.next( i );
        
      }, 500 )
    })
  }


}
