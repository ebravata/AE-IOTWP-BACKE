import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor( private usuariosServ: UsuariosService) { }

  ngOnInit(): void {

    this.usuario = this.usuariosServ.user;
    // console.log(this.usuario);

  }


}
