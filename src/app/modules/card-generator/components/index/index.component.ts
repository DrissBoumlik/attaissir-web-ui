 import {CardGeneratorService} from "../../services/card-generator.service";
import 'rxjs/add/operator/toPromise';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from "util";
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
 import {ToastrService} from "ngx-toastr";
 import {DxDataGridComponent} from "devextreme-angular";
 import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

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

  constructor(private cardGeneratorService : CardGeneratorService ,private toastr : ToastrService,private router : Router ) {
    this.card_generator = {};
  }



  ngOnInit() {

    this.card_generator.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.cardGeneratorService.getCards(loadOptions)
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

    this.start_btn = {
      text: "COMMENCER",
      type: "success",
      icon: "fa fa-play",
    onClick: function (e) {
       console.log(e)


      }

    }




  }



  onStartEdit(event) {
  }


  onRemoveThird(event) {
  }


  startFunc(){
    if(this.start) {
      this.start_btn.type ="danger";
      this.start_btn.text ="ARRETER";
      this.start_btn.icon ="fa fa-pause";
      this.start = false;

       this.sendRfid();


    }else {
      this.start_btn.type ="success";
      this.start_btn.text ="COMMENCER";
      this.start_btn.icon ="fa fa-play";
      this.start = true;
    }

  }


  event_ = false;

  sendRfid() {



    this.rf_code = '';
    this.rfid.nativeElement.focus();

    this.rfid.nativeElement.addEventListener('input', () => {
      setTimeout(() => {
        this.rf_code = '';
        this.rf_code = this.rfid.nativeElement.value;
        this.rfid.nativeElement.value = '';
        this.focusout.nativeElement.focus();
        this.event_ = true;



          let  rf_code = this.rf_code ;
          let  _cardGeneratorService = this.cardGeneratorService ;
         // let  sRfid = this.sendRfid();
      /*    this._ref1.instance.getVisibleRows().some(function(row: any, i,rf_code,_cardGeneratorService) {


              if(!true) {
                console.log(row.data)

                row.data.enabled= true;
               // sRfid();

                console.log(rf_code);
                  row.data.rfid= rf_code;
                _cardGeneratorService.getCards()
                  .subscribe(response => {


                    this.sendRfid();
                  }, error => {

                  });

                 return true;

              }



          });


       */





      }, 1000);

    });
   }



   img_scr_recto ='';
   img_scr_verso ='';

  selectionChangedHandler(){

    this.selectedItems[this.selectedItems.length-1].enabled = false;
    this.img_scr_recto = 'http://s1.dboumlik.code.go/cards/4/generate?face=recto&id=4&rfid=334&type=agri&full_name=' + this.selectedItems[this.selectedItems.length-1].full_name +'&code=' + this.selectedItems[this.selectedItems.length-1].code + '&full_name_ar=' + this.selectedItems[this.selectedItems.length-1].full_name_ar +'&amp;cin='+this.selectedItems[this.selectedItems.length-1].cin;
    this.img_scr_verso = 'http://s1.dboumlik.code.go/cards/4/generate?face=verso&id=4&rfid=334&type=agri&full_name=' + this.selectedItems[this.selectedItems.length-1].full_name +'&code=' + this.selectedItems[this.selectedItems.length-1].code + '&full_name_ar=' + this.selectedItems[this.selectedItems.length-1].full_name_ar +'&amp;cin='+this.selectedItems[this.selectedItems.length-1].cin;

    console.log(this.img_scr_recto);
  }



  export(){

    console.log('___');
    this.cardGeneratorService.export( {'cards' : this.selectedItems})
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


}
