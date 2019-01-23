import { CardGeneratorService } from "../../services/card-generator.service";
import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from "util";
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from "ngx-toastr";
import { DxDataGridComponent } from "devextreme-angular";
import { environment } from "../../../../../environments/environment";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


    dataSource: string[];
    slideshowDelay = 2000;

    valueChanged(e) {
        this.slideshowDelay = e.value ? 2000 : 0;
    }

    start: Boolean = true;
    start_btn: any;
    card_generator: any;
    selectedItems: any;
    cards: any;
    applyFilter: any;
    id: any;
    rf_code: any;
    @ViewChild('ref1') _ref1: DxDataGridComponent;


    @ViewChild('rfid') rfid: ElementRef;
    @ViewChild('focusout') focusout: ElementRef;



    constructor(private cardGeneratorService: CardGeneratorService, private toastr: ToastrService, private router: Router) {
        this.card_generator = {};
        this.selectedItems = [];
    }



    ngOnInit() {

        this.card_generator.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.cardGeneratorService.getCards(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });

        this.start_btn = {
            text: "COMMENCER",
            type: "success",
            icon: "fa fa-play",
            onClick: function(e) {
                // console.log(e)


            }

        }




    }



    onStartEdit(event) {
    }


    onRemoveThird(event) {
    }


    startFunc() {
        this.rfid.nativeElement.focus();

        if (this.start) {
            this.start_btn.type = "danger";
            this.start_btn.text = "ARRETER";
            this.start_btn.icon = "fa fa-pause";
            this.start = false;

            this.sendRfid();


        } else {
            this.start_btn.type = "success";
            this.start_btn.text = "COMMENCER";
            this.start_btn.icon = "fa fa-play";
            this.start = true;
        }

    }


    event_ = false;

    sendRfid() {


        /*
    
            this.rf_code = '';
            this.rfid.nativeElement.focus();
    
    
    
    
            this.rfid.nativeElement.addEventListener('input', () => {
              setTimeout(() => {
                this.rf_code = '';
                this.rf_code = this.rfid.nativeElement.value;
                this.rfid.nativeElement.value = '';
                this.focusout.nativeElement.focus();
    
    
                 this.selectedItems.some( (it) => {
    
                  if(it.playOn == null && this.rf_code != '') {
    
                    it.playOn = true;
                    it.rfid = this.rf_code;
                    return true;
    
                  }
                  console.log(it);
                });
    
    
                if( this.rf_code != '') {
                  this.sendRfid();
                }
    
              //  this.sendRfid();
    
                this.event_ = true;
    
    
    
    
    
    
    
              }, 1000);
    
            });
    
            */
    }


    img_scr_recto_array = [];
    img_scr_recto = '';
    img_scr_verso = '';

    selectionChangedHandler() {

        this.img_scr_recto_array = [];

        this.selectedItems.forEach((it) => {

            // it.playOn= false;


            let img = environment.apiUrl + '/cards/4/generate?face=recto&id=4&rfid=334&structure='
                + it.structure_id + '&name=' + it.name + '&name_ar=' + it.name_ar + '&tel=' +
                it.tel + '&address=' + it.address + '&type=agri&full_name=' + it.full_name + '&code='
                + it.code + '&full_name_ar=' + it.full_name_ar + '&amp;cin=' + it.cin;

            this.img_scr_recto_array.push(img);

        });
        /*
            this.selectedItems[this.selectedItems.length-1].enabled = false;
            this.img_scr_recto = 'http://s1.dboumlik.code.go/cards/4/generate?face=recto&id=4&rfid=334&type=agri&full_name=' + this.selectedItems[this.selectedItems.length-1].full_name +'&code=' + this.selectedItems[this.selectedItems.length-1].code + '&full_name_ar=' + this.selectedItems[this.selectedItems.length-1].full_name_ar +'&amp;cin='+this.selectedItems[this.selectedItems.length-1].cin;
            this.img_scr_verso = 'http://s1.dboumlik.code.go/cards/4/generate?face=verso&id=4&rfid=334&type=agri&full_name=' + this.selectedItems[this.selectedItems.length-1].full_name +'&code=' + this.selectedItems[this.selectedItems.length-1].code + '&full_name_ar=' + this.selectedItems[this.selectedItems.length-1].full_name_ar +'&amp;cin='+this.selectedItems[this.selectedItems.length-1].cin;
    
            this.img_scr_recto_array.push(this.img_scr_recto);
            console.log(this.img_scr_recto);
            */
    }

    cancel() {

        this.start_btn.type = "success";
        this.start_btn.text = "COMMENCER";
        this.start_btn.icon = "fa fa-play";
        this.start = true;

        this.selectedItems = [];
        this.img_scr_recto_array = [];
    }



    export() {

        console.log('___');
        this.cardGeneratorService.export({ 'cards': this.selectedItems })
            .toPromise()
            .then(response => {
                console.log(response);
                window.open(`${environment.apiUrl}/cards/download/${response.data}`);

                return response.data;
            })
            .catch(error => {
                throw error;
            });

    }


    validate() {


        if (this.selectedItems.length < 1) {
            this.toastr.warning('Aucun tiers n\'est sélectionner.')
            return;
        }

        let new_array = [];

        this.selectedItems.forEach((it) => {

            if (it.rfid != null) {
                new_array.push(it);
            }

        });


        if (new_array.length > 0) {

            this.cardGeneratorService.validate(new_array).subscribe(response => {
                this.toastr.success('l \' enregistrement effectué avec succès');
            }, error => {

            });
        } else {
            this.toastr.warning('Faire glisser les cartes sur le lecteur');
        }



    }

    barcode = "";
    repeated = false;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {

        if (!this.start) {
            if (event.key !== 'Enter') {
                this.barcode += event.key;
            } else {



                this.barcode = this.barcode.replace(/à/g, "0");
                this.barcode = this.barcode.replace(/&/g, "1");
                this.barcode = this.barcode.replace(/é/g, "2");
                this.barcode = this.barcode.replace('"', "3");
                this.barcode = this.barcode.replace("'", "4");
                this.barcode = this.barcode.replace("(", "5");
                this.barcode = this.barcode.replace("-", "6");
                this.barcode = this.barcode.replace(/è/g, "7");
                this.barcode = this.barcode.replace("_", "8");
                this.barcode = this.barcode.replace(/ç/g, "9");


                this.selectedItems.forEach(it => {
                    if (it.rfid == this.barcode) {
                        this.repeated = true;
                    }

                });


                if (!this.repeated) {

                    this.selectedItems.some((it) => {

                        if (it.playOn == null) {

                            it.playOn = true;
                            it.rfid = this.barcode;
                            this.barcode = "";
                            return true;

                        }
                    });

                } else {
                    this.toastr.warning('Rfid est déjà utilisé');
                }



            }
        }

    }



}
