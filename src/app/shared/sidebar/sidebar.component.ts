import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario!: Usuario;

  constructor( private usuariosServ: UsuariosService,
               private router: Router) { }

  ngOnInit(): void {

    this.usuario = this.usuariosServ.user;
    // console.log(this.usuario);

  }




}
