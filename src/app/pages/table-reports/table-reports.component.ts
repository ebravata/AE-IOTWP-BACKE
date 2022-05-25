import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { DataTest } from 'src/app/interfaces/data-test.interface';


import { CalzeusService } from 'src/app/services/calzeus.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-table-reports',
  templateUrl: './table-reports.component.html',
  styles: [
  ]
})
export class TableReportsComponent implements OnInit {

  @ViewChild('selStation') selStation!:  ElementRef;
  @ViewChild('selModel') selModel!:  ElementRef;
  @ViewChild('txtSerial') selSerial!:  ElementRef;

  public stations!: any[];
  public models!: any[];

  public cargando: boolean = true;
  public allPages!: any[];

  public pages!: any[];
  public totalPages!: number;
  public indexPage!: number;

  public start!: number;
  public end!: number;

  public toShow: number = 10;
  public total!: number;

  public filters!: boolean;

  public start_range= new Date; //yyyy-MM-dd HH:mm:ss-SS
  public stop_range= new Date; //yyyy-MM-dd HH:mm:ss-SS

  public searchByDate!: boolean;

  public errorLoadTests: any;
  public errorLoadStations: any;
  public errorLoadModels: any;

  constructor( private calzeusServ: CalzeusService,
               private router: Router,
               private modalServ: ModalService ) { }


  ngOnInit(): void {


    this.getStations();
    this.getModels();
    this.getTests();
    this.resetFilters();

  }

  resetNavigation(){
    this.totalPages = 0;
    this.indexPage = 0;
    this.start = 0;
    this.end = 0;
    this.total = 0;

  }

  resetFilters(){


    this.start_range= new Date (new Date().setMonth(new Date().getMonth()-1));
    this.stop_range= new Date();

    this.searchByDate = false;
    this.selSerial.nativeElement.value = '';
    this.selStation.nativeElement.value = 'Station';
    this.selModel.nativeElement.value = 'Model';
    this.errorLoadTests = null;

    // console.log('reset');

  }

  enableDateInput(){

     this.searchByDate = !this.searchByDate;
    //  console.log('Hola mundo');

  }

  loadTable( tests: any){

    this.resetNavigation();

    this.allPages = tests;
    this.total = tests.length;
    this.pageChange(0, 0);
    this.totalPages = Math.ceil(this.total / this.toShow);
  }

  showFilters(){

    this.filters = !this.filters;
    // console.log(this.filters);

  }

  validaDate( event: any ){
    // console.log(event);

  }

  getTests(){

    this.calzeusServ.getTests('2021-12-15', 'now()')
        .subscribe({

            next: (results:any[]) => {

              this.resetNavigation();
              this.loadTable( results );
              this.cargando = false;

            },
            error: ( err: any ) => {
              this.errorLoadTests = err.error.error;
              // console.log( this.errorLoadTests );
            },
            complete: () => {
              this.cargando = false;

            }
        });
  }

  search( formSearch: NgForm){
    const station= this.selStation.nativeElement.value || 'Station';
    const model=   this.selModel.nativeElement.value  || 'Model';
    const serial=  this.selSerial.nativeElement.value  || 'no-serial';
    let range_start = 'no-date';
    let range_end =  'no-date';

    if ( this.searchByDate){
      range_start= formatDate(new Date(formSearch.controls['range_start'].value), 'yyyy-MM-dd', 'en-MX');
      range_end=  formatDate(new Date( formSearch.controls['range_end'].value), 'yyyy-MM-dd', 'en-MX');
    }


    this.cargando = true;
    this.calzeusServ.searchTests( station, model, serial, range_start, range_end)
        .subscribe({
          next: ( results: any[] ) => {

            this.resetNavigation();
            this.loadTable( results );
            this.cargando = false;
          },
          error: ( err: any ) => {
            this.errorLoadTests = err.error.error;
            // console.log( this.errorLoadTests );
          },
          complete: () => {
            this.cargando = false;

          }

        });
  }

  getStations(){

    this.calzeusServ.getStations()
        .subscribe( (stations: any[]) =>{

          this.stations = stations;

        })
  }

  getModels(){

    this.calzeusServ.getModels()
        .subscribe( (models: any[]) =>{

          this.models = models;

        })
  }

  pageChange( range : number, index: number ){

    let aux_start = this.start + range;
    let aux_end   = aux_start + this.toShow;

    this.indexPage += index;

    if ( this.indexPage < 1 ){
        this.indexPage = 1
    }else if ( this.indexPage > this.totalPages )
        this.indexPage = this.totalPages

    if ( aux_start <= 0 ){
      this.start = 0;
    }else if ( aux_start < this.total){
      this.start = aux_start;
    }

    if ( aux_end >= this.total) {
      this.end = this.total;
    }else if( aux_end > 0) {
      this.end = aux_end;
    }

    this.pages = this.allPages.slice( this.start, this.end);

  }

  showGraph( test: any ){

    const { serial_number, model, station, range_start, uid} = test;
    const rStartQuery = new Date (range_start);
    const range_stop = formatDate( (rStartQuery.setDate(rStartQuery.getDate() + 5)) , 'YYYY-MM-dd', 'en-US') ;

     this.calzeusServ.dataTest = {
      serial_number,
      model,
      station,
      range_start,
      range_stop,
      id: uid
    };

    this.modalServ.abrirModal();

  }


}
