import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { DataTest } from '../interfaces/data-test.interface';

const base_url = environment.base_url;
console.log(base_url);

@Injectable({
  providedIn: 'root'
})
export class CalzeusService implements OnInit {
  public dataTest!: DataTest;

  constructor( private http: HttpClient) { }
  ngOnInit(): void {

    
  }

  getReport(){
    
    const sn = this.dataTest.serial_number;
    const start = this.dataTest.range_start;
    const stop = this.dataTest.range_stop;

    const url = `${ base_url }/calzeus/report/${ sn }/${ start }/${ stop }`;
    return this.http.get( url );
    
    console.log(this.dataTest);
    
  }

  getTests(){
    const url = `${ base_url }/calzeus/tests`;
    return this.http.get( url )
               .pipe( map ( (result:any) => result.tests));
  }

  searchTests(station: string, model: string, serial: string, range_start: string, range_end: string){
    const url = `${ base_url }/calzeus/search/${ station }/${ model }/${ serial }/${ range_start }/${ range_end }`;
    return this.http.get( url )
               .pipe( map ( (result:any) => result.tests));
  }
  
  
  getStations(){
    const url = `${ base_url }/calzeus/stations`;
    return this.http.get( url )
               .pipe( map ( (result:any) => result.stations));
  }
  
  getModels(){
    const url = `${ base_url }/calzeus/models`;
    return this.http.get( url )
               .pipe( map ( (result:any) => result.models));
  }
}
