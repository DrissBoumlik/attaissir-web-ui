import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from "util";
import { ActivatedRoute, Router } from '@angular/router';
import { PreconisationsIntrantsService } from '../../service/preconisations-intrants.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
  selector: 'app-preco-avance-list',
  templateUrl: './preco-avance-list.component.html',
  styleUrls: ['./preco-avance-list.component.scss']
})
export class PrecoAvanceListComponent implements OnInit {

  preconisations: any = {};
  helper: any;
  mouvements :any = {};

  popupRfidVisible = false;
  rf_code = null;

  @ViewChild('rfid') rfid: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('proclist') proclist: DxDataGridComponent;

  


  constructor(private route: ActivatedRoute, private preconisationsIntrantsService: PreconisationsIntrantsService) {
    this.helper = Helper;
  }



  ngOnInit() {

    
this.preconisations.store = new CustomStore({
      load: (loadOptions: any) => {
        loadOptions.rfid  = 0;
        return this.preconisationsIntrantsService.getListeAvancesDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });

  }

 

  SearchByRfid() {
  

    this.popup.nativeElement.addEventListener('click', () => {
      this.rfid.nativeElement.focus();
    });

    this.rfid.nativeElement.focus();

    this.rfid.nativeElement.addEventListener('input', () => {

      setTimeout(() => {
         


      this.rf_code = this.rfid.nativeElement.value;
      this.rfid.nativeElement.value = '';
      this.focusout.nativeElement.focus();
    

      if(this.rf_code != ''){

        this.rf_code= this.rf_code.replace(/à/g,"0");
        this.rf_code= this.rf_code.replace(/&/g,"1");
        this.rf_code= this.rf_code.replace(/é/g,"2");
        this.rf_code= this.rf_code.replace('"',"3");
        this.rf_code= this.rf_code.replace("'","4");
        this.rf_code= this.rf_code.replace("(","5");
        this.rf_code= this.rf_code.replace("-","6");
        this.rf_code= this.rf_code.replace(/è/g,"7");
        this.rf_code= this.rf_code.replace("_" ,"8");
        this.rf_code= this.rf_code.replace(/ç/g,"9");

this.preconisations = {};

let  code =  this.rf_code;
       this.preconisations.store = new CustomStore({
      load: (loadOptions: any) => {
        loadOptions.rfid  = code;
        return this.preconisationsIntrantsService.getListeAvancesDx(loadOptions)
          .toPromise()
          .then(response => {

            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  

      }
     

      this.popupRfidVisible = false;
 
      }, 1000);


      

    });


  }

  doSomething(event) {
    if (this.popupRfidVisible) {
      this.rf_code = event.value;
    }
  }


  Scan(){
    this.popupRfidVisible = true;
  }





}
