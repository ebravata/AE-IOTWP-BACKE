import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CalzeusService } from '../../services/calzeus.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styles: [
  ]
})
export class ReportComponent implements OnInit {

  public cargando: boolean = true;
  
  public time!:   number[];
  public _2fr!:   number[];
  public _2fz!:   number[];
  public _at!:    number[];
  public _curr!:  number[];
  public _fr!:    number[];
  public _fz!:    number[];
  public _im!:    number[];
  public _power!: number[];
  public _rc!:    number[];
  public _volt!:  number[];
  public num_serie= '';
  
  constructor( private calzeusServ: CalzeusService,
               private actRoute: ActivatedRoute) { }
  
  ngOnInit(): void {

      
    this.actRoute.params
        .subscribe( (params: any) => {
         
          // this.num_serie = params.ns
         console.log(params);
         
        })
     

    // this.calzeusServ.getReport( this.num_serie)
    //     .subscribe( ( data: any )=>{ 

    //       this.time     = data.time;
    //       this._2fr     = data._2fr;
    //       this._2fz     = data._2fz;
    //       this._at      = data._at;
    //       this._curr    = data._curr;
    //       this._fr      = data._fr;
    //       this._fz      = data._fz;
    //       this._im      = data._im;
    //       this._power   = data._power;
    //       this._rc      = data._rc;
    //       this._volt    = data._volt;
    //       this.cargando = false

    //       })
  }

}
