import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  articles: any;
  popupDeliverVisible: any;
  popupAyantDroitVisible: any;
  cancelPopVisible: any;
  ayants_droits: any = [];
  pin_code: any;

  constructor() { }

  ngOnInit() {
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

  evnt1 = true;

  func1() {
    this.evnt1 = false;
  }

  func2() {
    this.evnt1 = true;
    console.log('RF CODE');
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
        '<p>COMPAGNE &nbsp; &nbsp; 2017/2018</p>' +
        '<p>C/Z/P &nbsp; &nbsp; Q53829</p>' +
        '<p>NOM COMPLET  &nbsp; &nbsp; OUADI ABDELLAAH</p>' +
        '<br/>' +
        '<p>ENGRAIS</p>' +
        '<p>*****</p>' +
        '<p>- DAP 18-45 (50 KG) 45 QTE </p>' +
        '<p>- SULFARE (50 KG) 45 QTE </p>' +
        '<p>- KEMARAN (50 KG) 45 QTE </p>' +
        '<p>- DAP 18-45 (50 KG) 45 QTE </p>' +
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
