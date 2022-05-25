import { Component, OnInit } from '@angular/core';
import { CalzeusService } from 'src/app/services/calzeus.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(
    // private calzeusServ: CalzeusService
    ) { }

  ngOnInit(): void {

    // this.calzeusServ.getTests()
    //     .subscribe({
    //       next: ( res ) =>{
    //         console.log(res);

    //       }
    //     })

  }

}
