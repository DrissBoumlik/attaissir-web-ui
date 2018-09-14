import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PreconisationsIntrantsService} from '../../service/preconisations-intrants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RightHolderService} from '../../../contracts/services/right-holder.service';
import {Helper} from "../../../../shared/classes/helper";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, AfterViewInit {

  articles: any;
  preconisation: any;
  popupDeliverVisible: any;
  popupAyantDroitVisible: any;
  cancelPopVisible: any;
  retourPopVisible: any;
  ayants_droits: any = [];
  pin_code: any;
  rf_code: any;
  evnt1 = true;
  _evnt = false;
  selectedItems = [];
  retourArray = [];
  retour_valider_enabled = true;
  id;
  helper: any;

  // -------------------------------------------------------------------------
  @ViewChild('rfid') rfid: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;

  // -------------------------------------------------------------------------

  constructor(private elementRef: ElementRef, private preconisationsIntrantsService: PreconisationsIntrantsService,
              private rightHolderService: RightHolderService,
              private router: Router,
              private toastr: ToastrService, private route: ActivatedRoute) {

    this.helper = Helper;

  }


  ngOnInit() {

    this.articles = [];
    this.preconisation = {};

    this.route.params.subscribe(
      params => {
        console.log(params);
        this.preconisationsIntrantsService.getPreconisation(params.id).subscribe((response) => {
          this.preconisation = response.data;
          this.articles = response.data.articles;
          this.id = params.id;
          this.ayants_droits = response.data.right_holders;

        }, error1 => {
          throw error1;
        });
      });

    this.evnt1 = false;


  }


  Deliver() {

    this.preconisationsIntrantsService.deliver(this.preconisation.id, this.pin_code, this.rf_code)
      .toPromise()
      .then(response => {
        // this.router.navigate([`/preconisations-intrants/liste`]);
        this.popupDeliverVisible = false;
        this.preconisation.state = 'done';
        this.toastr.success(` La préconisation d'intrans est livrée avec succès.`);
        setTimeout(() => {
          this.print();
        }, 1000);

      })
      .catch(error => {
        this.toastr.error('le code pin est incorrect');
        this.popupDeliverVisible = false;

        // throw error;
      });


  }


  ngAfterViewInit() {


  }


  showDeliverPopup() {

    this.evnt1 = false;
    this.popupDeliverVisible = true;
  }

  deliver() {

  }

  showAyantsDroitPopup() {
    this.popupAyantDroitVisible = true;
  }

  cancelAyantDroitPopup() {
    this.popupAyantDroitVisible = false;
  }

  cancelPopup() {

    this.popupAyantDroitVisible = false;
    this.popupDeliverVisible = false;
    this.cancelPopVisible = false;
  }


  showDeletePopup() {
    this.cancelPopVisible = true;
  }

  showRetourPopup() {

    this.retourArray = [];

    this.selectedItems.forEach((it) => {

      this.retourArray.push({
        id: it.article.id, name: it.article.name, quantity: it.quantity, quantity_retour: 0,
        category: it.article.category.article_category.name, sub_category: it.article.category.name
      });

    });

    this.retourPopVisible = true;
  }

  pinTextBox(event) {
    this.pin_code = event.value;
  }


  doSomething(event) {
    if (this.popupDeliverVisible && this.evnt1) {
      this.rf_code = event.value;
      console.log(this.rf_code);
    }
  }


  delete() {

    this.preconisationsIntrantsService.cancelPreconisation(this.preconisation.id).subscribe((response) => {

      this.toastr.success(` La préconisation d'intrans est supprimé avec succès.`);
      this.router.navigate(['preconisations-intrants/liste']);

    }, error1 => {
      throw error1;
    });
    this.cancelPopVisible = false;
  }


  valuechange(e: any, data: any, value: any): void {


    this.retour_valider_enabled = true;

    this.retourArray.forEach((it) => {

      if (it.id === data.data.id) {
        if (it.quantity < value) {
          this.retour_valider_enabled = false;

          this.toastr.error('La quantité retour est supérieure à la quantité globale');
        } else {
          it.quantity_retour = value;
        }
      }

    });

  }

  RetourValiderPopup() {
    this.retourPopVisible = false;
  }


  removeRetourItem(id) {

    this.retourArray.forEach((it) => {
      if (it.id === id) {
        this.retourArray.splice(it, 1);

      }
    });

  }

  cancelRetourPopup() {

    this.retourPopVisible = false;
  }


  print() {

    /*  const print = window.open('', 'PRINT', 'height=400,width=600');

       print.document.write('<html><head>');

       print.document.write('<link  media="all" rel="stylesheet"href="https://fonts.googleapis.com/css?family=Tangerine">');
       print.document.write("<style type='text/css'> @media print { body { font-family: 'Tangerine', serif; font-size: 48px;} }</style>");



       // print.document.write('</head><body >');
       //  print.document.write('<h1>' + document.title  + '</h1>');
       print.document.write('<style type="text/css"> @page { size: auto;  margin: 0mm; }' +
         ' *{text-align: center;  } *{font-size: 15px} </style>');

       print.document.write('<style type="text/css"> body { width: auto; }</style>');
       print.document.write('<style type="text/css"> .div1 {  position:absolute; width:auto; ' +
         'height:300px; z-index:15; left:50%; margin:0px 0 0 0px;}</style>');

       print.document.write('<style type="text/css">@media print { .div1{  position:absolute; width:300px; height:300px; z-index:15; top:50%;left:50%; margin:-150px 0 0 -150px;}}</style>');



       print.document.write('</head>');

       print.document.write('<body>');
       print.document.write('<div class="div1">');


       print.document.write('<p><b style="font-weight: bolder;">BON DE LIVRAISON</b></p>' +
         '<p>-------------------------</p>' +

         '<p> <span> N° ' + this.preconisation.id + ' </span></p>' +

         '<p> <span style="float: right;font-family: Tangerine;"> Date : ' + this.preconisation.date + '</span> </p> <br/>' +

         '<p> <span style="float: right">' +
         this.preconisation.campaign + ' </span></p>  <br/>' +

         '<p> <span style="float: left;font-weight: bolder;">CDA </span>  <span style="float: right">' +
         this.preconisation.cda + ' </span></p>  <br/>' +

         '<p> <span style="float: left;font-weight: bolder;">ZONE </span>  <span style="float: right">' +
         this.preconisation.zone + ' </span></p>  <br/>' +


         '<p> <span style="float: left;font-weight: bolder;">PARCELLE </span>  <span style="float: right">' +
         this.preconisation.parcel + ' </span></p>  <br/>' +

         '<p> <span style="float: left;font-weight: bolder;">NOM COMPLET  </span>   <span style="float: right">' +
         this.preconisation.third_party_name + ' </span></p>  <br/>');

         print.document.write('<p>-------------------------</p>');

       this.articles.forEach(function(element) {
        // print.document.write('<p style="font-weight: bolder;">' + element.category + '</p><br/>');
         print.document.write('<p> <span style="float: left;">' + element.article_name +
           '</span><span style="float: right;"> ' + element.quantity + ' ' + element.unit + '</span></p>');

       });


       print.document.write( ' <br/> <p>**  **</p> <p>*  *</p> ');


       print.document.write(
         '<p>-------------------------</p>' +
         '<p>** MERCI **</p>' +
         '<p>*****</p>');

       print.document.write('</div>');

       print.document.write('</body></html>');
       print.document.close(); // necessary for IE >= 10
       print.focus(); // necessary for IE >= 10*/
    //  print.print();
    // print.close();
    // return true;


    /*
       const print = window.open('', 'PRINT', 'height=400,width=600');

        print.document.write('<!DOCTYPE html>');

        print.document.write('<html>');
        print.document.write('<head>');

        print.document.write(' <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  <title> - Système dinformation de gestion d amont agricole</title>  <meta name="description" content="Système de gestion des intrants"> <meta name="viewport" content="width=device-width, initial-scale=1">');

         print.document.write('<link rel="stylesheet" href="http://localhost/test2/intrants_print.css" type="text/css" />');



        print.document.write(' </head> <body>  <!-- Recu agriculteur --> <div id="receipt-wrapper"> <div class="receipt-block">   <div class="receipt-head">  <div>BON DE LIVRAISON</div>  <div>FACTURE</div>   </div> <div class="receipt-date-n">  <div>12/11/2018</div>  <div>N° 23</div>    </div>   <div class="receipt-info">   <div class="receipt-item">    <div class="receipt-item-lbl">Campagne</div>   <div class="receipt-item-price">237</div>   </div>   <div class="receipt-item">    <div class="receipt-item-lbl">C/Z/P</div> <div class="receipt-item-price">34/45/45</div>   </div>   <div class="receipt-item">   <div class="receipt-item-lbl">C.I.N</div>    <div class="receipt-item-price">D46474</div>  </div>  <div class="receipt-item receipt-name">    <div class="receipt-item-lbl">Nom</div>    <div class="receipt-item-price">Test test2</div>   </div>   </div>   <div class="receipt-items">  <div class="receipt-item-header">   <div>ttttst </div>   <div>*****</div>   </div>  <div class="receipt-item">  <div class="receipt-item-lbl">- hhhhhhh</div>   </div> <div class="receipt-item sub">  <div class="receipt-item-lbl">ggggggeeee</div>  <div class="receipt-item-price"> 66633 DH</div>  </div> </div>  <div class="total">   <div>montant total </div>  <div>344DH</div>  </div>  <div class="signature">    <div>** VISA **</div>   </div> <div class="receipt-info footer">  <div class="receipt-item divider">*****</div>    <div class="receipt-item note"><p>Les prix sont hors de <b>frais de finance</b> et <b>frais de gestion</b></p></div>  <div class="receipt-item">   <p>servi par </p>   <p>Pour nous contacter </p>   <p>+212 437 39378 </p>   <p>adress</p>   </div>  </div>   </div>  </div>');

        print.document.write(' </body></html>');

        print.print();
        print.close();
        return true;

            */


    let w = window.open('', 'PRINT', 'height=400,width=600');


    w.document.write('<!DOCTYPE html>');

    w.document.write('<html>');
    w.document.write('<head>');


    w.document.write('<link rel="stylesheet" href="/assets/app/css/print.css" type="text/css" />');


    w.document.write('</head>');
    w.document.write('<body>');
    w.document.write($('#t1').html());
    w.document.write('</body>');
    w.document.write('</html>');
//w.print();


    setTimeout(() => {
      w.print();
    }, 3000);



      setTimeout(() => {
          w.close();
      }, 5000);

    return true;

//w.close();

    // window.print();


  }

  changeLivrerPopup() {
    this.evnt1 = true;
    this._evnt = true;

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
        }

        if (this.popupDeliverVisible) {
          this.preconisationsIntrantsService.deliver(this.preconisation.id, this.pin_code, this.rf_code)
            .subscribe(response => {
              this.preconisation.state = 'done';
              this.toastr.success(` La préconisation d'intrans est livrée avec succès.`);
              setTimeout(() => {
                this.print();
              }, 1000);

            }, error => {
              this.toastr.error('RFID est incorrect');
            });
          this.popupDeliverVisible = false;

        }
      }, 1000);


    });


  }

}
