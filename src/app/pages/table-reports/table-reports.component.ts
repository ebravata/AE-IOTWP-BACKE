import { formatDate } from '@angular/common';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTest } from 'src/app/interfaces/data-test.interface';


import { CalzeusService } from 'src/app/services/calzeus.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-table-reports',
  templateUrl: './table-reports.component.html',
  styles: [
  ]
})
export class TableReportsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('selStation') selStation!:  ElementRef;
  @ViewChild('selModel') selModel!:  ElementRef;
  @ViewChild('txtSerial') selSerial!:  ElementRef;
  // @ViewChild('selDateStart') dateInputStart!:  ElementRef;
  // @ViewChild('selDateEnd') dateInputEnd!:  ElementRef;

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

  constructor( private calzeusServ: CalzeusService,
               private router: Router,
               private modalServ: ModalService ) { }


  ngAfterViewChecked(): void {
    // throw new Error('Method not implemented.');
  }
  
  
  ngAfterViewInit(): void {
    this.filters = false;
    this.resetFilters();

  }
  
  

  ngOnInit(): void {

    this.getStations();
    this.getModels();
    this.getTests();

  }

  resetNavigation(){
    this.totalPages = 0;
    this.indexPage = 0;
    this.start = 0;
    this.end = 0;
    this.total = 0;

  }

  resetFilters(){

    
    this.start_range= new Date (new Date().setMonth(new Date().getMonth()-1)); //yyyy-MM-dd HH:mm:ss-SS
    this.stop_range= new Date();
    
    this.searchByDate = false;
    // this.filters = false;
    this.selSerial.nativeElement.value = '';
    this.selStation.nativeElement.value = 'Station';
    this.selModel.nativeElement.value = 'Model';

    console.log('reset');
    
    
  }

  enableDateInput(){

     this.searchByDate = !this.searchByDate;
     console.log('Hola mundo');
     
    //  = false;

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
    console.log(this.filters);
    
  }

  validaDate( event: any ){

    // const start= new Date(  formSearch.controls['range_start'].value);
    // const end=  new Date( formSearch.controls['range_end'].value);
    
    // if ( new Date ( end )  > new Date ( start ) )
    //   console.log('fecha valida');
    // else
    //   console.log("fecha invalida");
    console.log(event);
    
    
  }

  getTests(){

    this.calzeusServ.getTests()
        .subscribe( (results:any[]) => {
          
          this.resetNavigation();
          this.loadTable( results );
          this.cargando = false;

        }); 
  }

  search( formSearch: NgForm){
    const station= this.selStation.nativeElement.value || 'Station';
    const model=   this.selModel.nativeElement.value || 'Model';
    const serial=  this.selSerial.nativeElement.value  || 'no-serial';
    let range_start = 'no-date';
    let range_end =  'no-date';
    
    if ( this.searchByDate){
      // console.log(new Date(formSearch.controls['range_start'].value));
      range_start= formatDate(new Date(formSearch.controls['range_start'].value), 'yyyy-MM-dd', 'en-MX');
      range_end=  formatDate(new Date( formSearch.controls['range_end'].value), 'yyyy-MM-dd', 'en-MX');
    }
    
    // console.log(`start: ${ start }, end: ${end }`);

    console.log(station);
    console.log(model);
    console.log(serial);
    console.log(range_start);
    console.log(range_end);
    
    this.cargando = true;
    this.calzeusServ.searchTests( station, model, serial, range_start, range_end)
        .subscribe(
          ( results: any[] ) => {
            
            this.resetNavigation();
            this.loadTable( results );
            this.cargando = false;

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

    const { serial_number, model, station, range_start, range_stop} = test;

     this.calzeusServ.dataTest = {
      serial_number,
      model,
      station, 
      range_start,
      range_stop
    };
    
    this.modalServ.abrirModal();
   
  }

  
}
