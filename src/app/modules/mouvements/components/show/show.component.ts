import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MouvementsService } from '../../service/mouvements.service';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  mouvement: any;
  order: any;
  popupDeliverVisible = false;
  popupDeleteVisible = false;
  helper: any;
  articles: any;
  to: any;
  from: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private mouvementsService: MouvementsService,
    private toastr: ToastrService) {
    this.helper = Helper;
  }



  ngOnInit() {


    this.mouvement = {
      state: 'inprogress'
    };
     this.order = null;
    this.to = {};
    this.from = {}
    this.articles = null;

    this.from.name ='';
    this.from.full_name  ='';
     this.to.name  ='';
    this.to.full_name  ='';
    this.route.params.subscribe(
      params => {
        this.mouvementsService.getMouvement(params.id).subscribe((response) => {


          console.log(response);

          this.mouvement = this.helper.dataFormatter(response, false);
          this.order = this.mouvement.order;
          this.from = this.mouvement.from;
          this.to = this.mouvement.to;
          this.articles = this.mouvement.articles;
        }, error1 => {
          throw error1;
        });
      });
  }

  delete() {
    this.mouvementsService.editMouvement({
      id: this.mouvement.id,
      state: 'canceled'
    }).subscribe((response) => {
      this.toastr.success('Mouvement annulé.');
      this.mouvement.state = 'canceled';
      this.popupDeleteVisible = false;
    }, err => {
      throw err;
    });

  }

  deliver() {
    this.mouvementsService.editMouvement({
      id: this.mouvement.id,
      state: 'done'
    }).subscribe((response) => {
      this.toastr.success('Mouvement validé.');
      this.mouvement.state = 'done';
      this.popupDeliverVisible = false;
    }, err => {
      throw err;
    });
  }

  showDeliverPopup() {
    this.popupDeliverVisible = true;
  }

  showDeletePopup() {
    this.popupDeleteVisible = true;
  }

  cancelPopup() {
    this.popupDeleteVisible = false;
    this.popupDeliverVisible = false;
  }





  print() {



    const print = window.open('', 'PRINT', 'height=400,width=600');

    print.document.write('<html><head>');

    // print.document.write('</head><body >');
    //  print.document.write('<h1>' + document.title  + '</h1>');
    print.document.write('<style type="text/css"> @page { size: auto;  margin: 0mm; }' +
      ' *{text-align: center;  } *{font-size: 10px} </style>');
    print.document.write('<style type="text/css"> body { width: 250px; }</style>');
    print.document.write('<style type="text/css"> .div1 {  position:absolute; width:250px; ' +
      'height:300px; z-index:15; left:50%; margin:0px 0 0 -150px;}</style>');


    print.document.write('</head>');

    print.document.write('<body>');
    print.document.write('<div class="div1">');

    print.document.write('<p><b style="font-weight: bolder;">Bon DE  ' + this.helper.orderType(this.mouvement.type) + '</b></p>' +
      '<p> <span> N° ' + this.mouvement.id + ' </span></p>' +

      '<p> <span style="float: right"> DATE : ' + this.mouvement.date + '</span> </p> <br/>' +

      '<p> <span style="float: left"> COMPAGNE' +
      '</span> &nbsp; &nbsp;  <span style="float: right">' + this.mouvement.campaign + ' </span></p>');

    if(this.mouvement.type != 'transfer') {

      print.document.write( '<p> <span style="float: left"> CDA' +
        '</span> &nbsp; &nbsp;  <span style="float: right">  ' +  this.mouvement.cda +  '   </span></p>' +

        '<p> <span style="float: left"> ZONE' +
        '</span> &nbsp; &nbsp;  <span style="float: right">  ' +  this.mouvement.zone +  '  </span></p>' +


        '<p> <span style="float: left"> PARCELLE' +
        '</span> &nbsp; &nbsp;  <span style="float: right"> ' +  this.mouvement.parcel +  ' </span></p>');

    }



    this.articles.forEach(function(element) {
      print.document.write('<p style="font-weight: bolder;">' + element.article.category.name + '</p>');
      print.document.write('<p>   </p>');
      print.document.write('<p> <span style="float: left;">' + element.article.name +
        '</span><span style="float: right;"> ' + element.quantity + ' ' + 'QTE' + '</span></p>');

    });

    print.document.write( '<p><span style="float: bottom">'+ this.mouvement.from.full_name + '</span></p>');

    print.document.write( '<p><span style="float: bottom">***** </span></p>');

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


}
