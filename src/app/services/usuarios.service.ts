import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService  {

  public user!: Usuario;

  public users = [
    {
      nombre: 'Marcos Adriano',
      correo: 'marcos.adriano@adriano-e.com',
      password: 'Marcos',
      img: './assets/'

    },
    {
      nombre: 'Oliver Villanueva',
      correo: 'oliver.villanueva@adriano-e.com',
      password: 'Oliver',
      img: './assets/'
    },
    {
      nombre: 'Eugenio Bravata',
      correo: 'eugenio.bravata@adriano-e.com',
      password: 'Eugenio',
      img: './assets/'
    }
  ]

  constructor() {
    const nombre = localStorage.getItem('name') || '';
    const correo = localStorage.getItem('email') || '';

    this.user = {
                nombre,
                correo,
                password:'',
                img: ''

              }


  }

  login(email: string, pass: string): boolean{

    let result= false;


    this.users.forEach( usuario => {

      if (usuario.correo===email && usuario.password === pass){
            this.user= usuario;
            localStorage.setItem('session', 'ok');
            localStorage.setItem('email', usuario.correo);
            localStorage.setItem('name', usuario.nombre);
            result = true;
          }
    });

    return result;


  }
}
