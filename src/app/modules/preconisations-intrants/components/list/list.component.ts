import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Helper} from '../../../../shared/classes/helper';
import {ActivatedRoute} from '@angular/router';
import {PreconisationsIntrantsService} from '../../service/preconisations-intrants.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  preconisations_intrants: any = {};
  helper: any;
  mouvements: any = {};

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


    this.preconisations_intrants.store = new CustomStore({
      load: (loadOptions: any) => {
        if (!loadOptions.filter && this.rf_code) {
          loadOptions.filter.push(['rfid', '=', this.rf_code]);
        }
        if (loadOptions.filter && this.rf_code) {
          loadOptions.filter.push('and', ['rfid', '=', this.rf_code]);
        }
        return this.preconisationsIntrantsService.getListeDemandesDx(loadOptions)
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


        if (this.rf_code != '') {

          this.rf_code = this.rf_code.replace(/à/g, "0");
          this.rf_code = this.rf_code.replace(/&/g, "1");
          this.rf_code = this.rf_code.replace(/é/g, "2");
          this.rf_code = this.rf_code.replace('"', "3");
          this.rf_code = this.rf_code.replace("'", "4");
          this.rf_code = this.rf_code.replace("(", "5");
          this.rf_code = this.rf_code.replace("-", "6");
          this.rf_code = this.rf_code.replace(/è/g, "7");
          this.rf_code = this.rf_code.replace("_", "8");
          this.rf_code = this.rf_code.replace(/ç/g, "9");

          this.preconisations_intrants = {};
          console.log('tt');
          let code = this.rf_code;
          this.preconisations_intrants.store = new CustomStore({
            load: (loadOptions: any) => {
              loadOptions.rfid = code;
              loadOptions.filter = ['rfid', '=', code];
              return this.preconisationsIntrantsService.getListeDemandesDx(loadOptions)
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

          /*  this.preconisationsIntrantsService.getByRfid(this.rf_code)
           .toPromise()
           .then(response => {
             console.log(response);


            let res = response;

   //this.proclist.ààà"é'ç&&

           // let dtSource =

             this.preconisations_intrants.store = new CustomStore({
               load: (loadOptions: any) => {
                 return res;
               }
             });
                    //   this.proclist.instance.refresh();
             //this.proclist.instance.getDataSource().store().remove(361);

           setTimeout(() => {
                    this.proclist.instance.getDataSource().store().load();
             this.proclist.instance.refresh();
           }, 2000);


           })
           .catch(error => {
             throw error;
           });
           */

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


  Scan() {
    this.popupRfidVisible = true;
  }


}
