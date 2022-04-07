import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
 public badloggin = false;
 public rem_email!: string;
 public remember= false;


  constructor( private usuariosServ: UsuariosService,
               private router: Router) { }

  ngOnInit(): void {

    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('session');

    this.rem_email = localStorage.getItem('rem_email') || '';

    if (this.rem_email)
      this.remember= true;

  }


  login( form: NgForm){

    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    const remember = form.controls['remember'].value;

    const resp = this.usuariosServ.login( email, password);

    if (resp){
       if (remember)
          localStorage.setItem('rem_email', email);
        else
          localStorage.removeItem('rem_email')

       this.router.navigateByUrl('/dashboard');
    }else{
      this.badloggin = true;
    }
    // console.log('logged:'+ resp);

  }

}
