import { Component, OnInit } from '@angular/core';
import { PreconisationsIntrantsService } from '../../service/preconisations-intrants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  articles: any;
  preconisation: any;
  popupDeliverVisible: any;
  popupAyantDroitVisible: any;
  cancelPopVisible: any;
  ayants_droits: any = [];
  pin_code: any;
  evnt1 = true;


  constructor(private preconisationsIntrantsService: PreconisationsIntrantsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.articles = {};
    this.preconisation = {};

    this.route.params.subscribe(
      params => {
        this.preconisationsIntrantsService.getPreconisation(params.id).subscribe((response) => {
          this.preconisation = response.data;
          this.articles = response.data.articles;

        }, error1 => {
          throw error1;
        });
      });

    this.evnt1 = false;
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

  pinTextBox(event) {
    this.pin_code = event.value;
    console.log('PIN : ' + this.pin_code);

  }


  doSomething(event) {
    if (this.popupDeliverVisible && this.evnt1) {
      console.log('RF CODE : ' + event.key);
    }
  }


  func1() {
    this.evnt1 = false;
  }

  func2() {
    this.evnt1 = true;
  }


  delete() {
    this.cancelPopVisible = false;
  }

  print() {

    const print = window.open('', 'PRINT', 'height=400,width=600');

    print.document.write('<html><head>');

    // print.document.write('</head><body >');
    //  print.document.write('<h1>' + document.title  + '</h1>');
    print.document.write('<style type="text/css"> @page { size: auto;  margin: 0mm; } *{text-align: center;  } </style>');

    print.document.write('</head>');

    print.document.write('<body>');



    print.document.write('<p><b>BON DE LIVRAISON</b></p>' +
      '<p>-------------------------</p>' +
      '<p>05/09/2018 &nbsp; &nbsp; n 0555</p>' +
      '<p>COMPAGNE &nbsp;' + this.preconisation.campaign + '&nbsp; </p>' +
      '<p>C/Z/P &nbsp;</p>' + this.preconisation.parcel + '/' + this.preconisation.cda + '/' + this.preconisation.zone +
      '<p>NOM COMPLET  &nbsp;' + this.preconisation.third_party_name + '  &nbsp; </p>' +
      '<br/>' +
      // '<p>' + this.articles.category.article_category.name + '</p>' +
      '<p>*****</p>');

    this.articles.forEach(function(element) {
      print.document.write('<p>' + element.article.name + ' ' + element.quantity + ' ' + 'QTE' + '</p>');

    });

    print.document.write(
      '<p>-------------------------</p>' +
      '<p>** MERCI **</p>' +
      '<p>*****</p>');
    print.document.write('</body></html>');
    print.document.close(); // necessary for IE >= 10
    print.focus(); // necessary for IE >= 10*/
    print.print();
    print.close();
    return true;
  }

  changeLivrerPopup() {
    this.evnt1 = true;
  }

}
