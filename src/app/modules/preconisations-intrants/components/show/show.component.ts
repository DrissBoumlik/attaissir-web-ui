import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {PreconisationsIntrantsService} from '../../service/preconisations-intrants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RightHolderService} from '../../../contracts/services/right-holder.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  articles: any;
  preconisation: any ;
  popupDeliverVisible: any;
  popupAyantDroitVisible: any;
  cancelPopVisible: any;
  retourPopVisible: any;
  ayants_droits: any = [];
  pin_code: any;
  rf_code: any;
  evnt1 = true;
  _evnt = false;
  toOrder = [];
  selectedItems = [];
  retourArray = [];
  retour_valider_enabled = true;
  id;


  ayants_droit: any;



  constructor(private elementRef: ElementRef , private preconisationsIntrantsService: PreconisationsIntrantsService,
              private rightHolderService: RightHolderService,
              private router: Router,
              private toastr: ToastrService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.articles = [];
    this.preconisation = {};

    this.route.params.subscribe(
      params => {
       this.preconisationsIntrantsService.getPreconisation(params.id).subscribe((response) => {
         this.preconisation = response.data;
         this.articles = response.data.articles;
         this.id = params.id;

       }, error1 => {
          throw error1;
        });
      });

  this.evnt1 = false;

  this.rightHolderService.getAllDx(12).subscribe((response) => {
    console.log(response);
  });



  this.preconisationsIntrantsService.getListeAyants_droits(1).subscribe((response) => {
     this.ayants_droits = response.data;

   }, error1 => {
    throw error1;
  });




  }




  Deliver() {

     this.preconisationsIntrantsService.deliver(this.preconisation.id, this.pin_code , this.rf_code)
      .toPromise()
      .then(response => {
        this.toastr.success('ok');
        this.router.navigate([`/preconisations-intrants/liste`]);

      })
      .catch(error => {

        // throw error;
      });


  }


  ngAfterViewInit () {

      document.addEventListener('keydown', (vv) => {
        if ( this._evnt) {
          this.rf_code = vv.key;
           this._evnt = false;

          this.preconisationsIntrantsService.deliver(this.preconisation.id, this.pin_code , this.rf_code)
            .toPromise()
            .then(response => {
              this.popupDeliverVisible = false;

            })
            .catch(error => {
              this.popupDeliverVisible = false;

              throw error;
            });

        }
      });

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

      this.retourArray.push({id : it.article.id  , name : it.article.name , quantity : it.quantity , quantity_retour : 0  ,
        category : it.article.category.article_category.name  , sub_category : it.article.category.name});

    });

   // console.log(this.selectedItems);
    this.retourPopVisible = true;
  }

  pinTextBox(event) {
    this.pin_code = event.value;
  }


  doSomething(event) {
    if (this.popupDeliverVisible && this.evnt1) {
      this.rf_code = event.value;
    }
  }



  delete() {

    this.preconisationsIntrantsService.cancelPreconisation(this.preconisation.id).subscribe((response) => {

      this.toastr.success(` la préconisation d'intrans est supprimé avec succès.`);

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

          this.toastr.error('la quantité retour est supérieure à la quantité globale');
        } else {
          it.quantity_retour = value;
        }
      }

    });

  }

  RetourValiderPopup() {
    this.retourPopVisible = false;
    console.log(this.retourArray);

  }


  removeRetourItem(id) {

    this.retourArray.forEach((it) => {
      if (it.id === id) {
        this.retourArray.splice(it,1 );

      }
    });

  }

  cancelRetourPopup() {

    this.retourPopVisible = false;
  }

  print() {

      const print = window.open('', 'PRINT', 'height=400,width=600');

    print.document.write('<html><head>');

    // print.document.write('</head><body >');
    //  print.document.write('<h1>' + document.title  + '</h1>');
    print.document.write('<style type="text/css"> @page { size: auto;  margin: 0mm; } *{text-align: center;  }  </style>');
    print.document.write('<style type="text/css"> p {  margin: -1px; }  body { width: 250px; }</style>');
    print.document.write('<style type="text/css"> .div1 {  position:absolute; width:300px; height:300px; z-index:15; left:50%; margin:0px 0 0 -150px;}</style>');


    print.document.write('</head>');

    print.document.write('<body>');
    print.document.write('<div class="div1">');



    print.document.write('<p><b style="font-weight: bolder;">BON DE LIVRAISON</b></p>' + '<p style="font-weight: bolder;">FACTURE</p> ' +
        '<br/><p>-------------------------</p><br/>' +
        '<p> <span style="float: left">' + this.preconisation.date +
      '</span> &nbsp; &nbsp;  <span style="float: right"> n ' + this.preconisation.id + ' </span></p>' +
      '<br/><p>-------------------------</p><br/>' +
      '<p> <span style="float: left;font-weight: bolder;">COMPAGNE </span>  <span style="float: right">' + this.preconisation.campaign + ' </span></p>' +
      '<p> <span style="float: left;font-weight: bolder;">C/Z/P  </span>   <span style="float: right">' +  this.preconisation.parcel + '/' + this.preconisation.cda + '/' + this.preconisation.zone + ' </span></p>' +
      '<p> <span style="float: left;font-weight: bolder;">NOM COMPLET  </span>   <span style="float: right">' + this.preconisation.third_party_name + ' </span></p>' +
        '<p>*****</p>');

    this.articles.forEach(function(element) {
      print.document.write( '<p style="font-weight: bolder;">' + element.category + '</p>' );
      print.document.write( '<p> ***** </p>' );
      print.document.write( '<p> <span style="float: left;">' + element.article_name + '</span><span style="float: right;"> ' + element.quantity  + ' ' + 'QTE' + '</span></p>' );

    });

      print.document.write(
        '<br/> <p>-------------------------</p>' +
        '<p>** MERCI **</p>' +
        '<p>*****</p>');

    print.document.write('</div>');

    print.document.write('</body></html>');
    print.document.close(); // necessary for IE >= 10
    print.focus(); // necessary for IE >= 10*/
    print.print();
    print.close();
    return true;
  }

  changeLivrerPopup() {
  this.evnt1 = true;
  this._evnt = true;
  }

}
