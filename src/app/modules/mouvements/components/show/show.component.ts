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

    this.from.name = '';
    this.from.full_name = '';
    this.to.name = '';
    this.to.full_name = '';
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
      'z-index:15; left:50%; margin:0px 0 0 -150px;}</style>');


    print.document.write('</head>');

    print.document.write('<body>');
    print.document.write('<div class="div1">');

    print.document.write('<p><b style="font-weight: bolder;">Bon DE  ' + this.helper.orderType(this.mouvement.type) + '</b></p>' +
      '<p> <span> N° ' + this.mouvement.id + ' </span></p>' +

      '<p> <span style="float: right"> DATE : ' + this.mouvement.date + '</span> </p> <br/>' +

      '<p> <span style="float: left"> CAMPAGNE' +
      '</span> &nbsp; &nbsp;  <span style="float: right">' + this.mouvement.campaign + ' </span></p>');

    if(this.mouvement.type != 'transfer' &&  this.mouvement.type != 'receive') {


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


    print.document.write( '<br/><p> <span style="float: left"> Emetteur' +
      '</span> &nbsp; &nbsp;  <span style="float: right">  ' +  this.mouvement.from.name +  '</span></p>' +

      '<p> <span style="float: left"> Récepteur' +
      '</span> &nbsp; &nbsp;  <span style="float: right">  ' +  this.mouvement.to.name  +  '</span></p>');


    print.document.write( ' <br/> <p>**  **</p> <p>**  **</p> ');

    print.document.write(
      '<p>-------------------------</p>' +
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


/*

css:string = '';


  print2() {




    const print = window.open('', 'PRINT', 'height=400,width=600');

    print.document.write('<html><head>');

    print.document.write('<style type="text/css"> @page{margin:0}body{margin:0}.sheet{margin:0;overflow:hidden;position:relative;box-sizing:border-box;page-break-after:always}body.A3 .sheet{width:297mm;height:419mm}body.A3.landscape .sheet{width:420mm;height:296mm}body.A4 .sheet{width:210mm;height:296mm}body.A4.landscape .sheet{width:297mm;height:209mm}body.A5 .sheet{width:148mm;height:209mm}body.A5.landscape .sheet{width:210mm;height:147mm}.sheet.padding-10mm{padding:10mm}.sheet.padding-15mm{padding:15mm}.sheet.padding-20mm{padding:20mm}.sheet.padding-25mm{padding:25mm}@media screen{body{background:#e0e0e0}.sheet{background:white;box-shadow:0 .5mm 2mm rgba(0,0,0,.3);margin:5mm}}@media print{body.A3.landscape{width:420mm}body.A3,body.A4.landscape{width:297mm}body.A4,body.A5.landscape{width:210mm}body.A5{width:148mm}}</style>');



    print.document.write('<style type="text/css"> .app-with-sidebar');

    this.css = '@page{size:auto;margin:0}body{background:white}.app-with-sidebar .app-sidebar-wrapper .custom-main{padding:0}.module-commande-agriculteur#page-afficher header,.module-commande-agriculteur#page-afficher .custom-sidebare,.module-commande-agriculteur#page-afficher .ui.message,.module-commande-agriculteur#page-afficher #btn-imprimer,.module-commande-agriculteur#page-afficher .stats-filters-outter-wrapper>.right,.module-commande-agriculteur#page-afficher .stats-filters-outter-wrapper>.left h2,.module-commande-agriculteur#page-afficher .stats-filters-outter-wrapper>.left span,.module-commande-agriculteur#page-afficher .tiers-info-title,.form-submit{display:none!important}.module-commande-agriculteur .custom-main{margin-left:0!important;width:100%!important}.module-commande-agriculteur .tiers-info{border:0}.module-commande-agriculteur .tiers-info .column>table>tbody>tr:last-child td:first-child{float:left;width:10%}.module-commande-agriculteur table.table th,.module-commande-agriculteur table.table td{font-size:11px!important}#section-stats-filters .stats-filters-outter-wrapper,#section-stats-filters .left h3{margin:0;color:black}#section-stats-filters .stats-filters-outter-wrapper>.left{width:100%;text-align:center;border-bottom:1px solid #ddd;padding-bottom:15px}.tiers-info .ui.two.column>.row>.column:last-child{display:none}.tiers-info .ui.two.column>.row>.column:first-child,.tiers-info .ui.two.column>.row>.column:first-child>table{width:100%}.tiers-info .ui.two.column>.row>.column tr{float:left;width:100%}.tiers-info .ui.two.column>.row>.column tr:nth-child(2){display:none}.tiers-info td{font-size:12px}.tiers-info tr td:last-child{color:#000;font-weight:700;letter-spacing:0;font-size:12px}.tiers-info{margin-bottom:0;padding:0}.tiers-info .celled.line.table th:nth-child(3),.tiers-info .celled.line.table td:nth-child(3){display:none}.tiers-info tr td:first-child{padding-right:0}.module-commande-agriculteur .tiers-info .column>table>tbody>tr:last-child td:first-child{float:initial!important;width:0}table.ui.fixed.table{margin:0}table.ui.fixed.table>thead>tr>th:nth-child(2){display:none}table.ui.fixed.table>tbody>tr>td:nth-child(2){display:none;position:absolute;left:8%;font-weight:800;border:0;margin-top:-2px}table.ui.fixed.table>tbody>tr>td:nth-child(2):after{content:' - '}#receipt-wrapper{width:198.425px;margin:0 auto;padding:28.3465px;font-size:11.3px;font-weight:700;font-family:"courier new";text-transform:uppercase}#receipt-wrapper .receipt-head{text-align:center;font-weight:bold;font-size:17px;margin-bottom:10px;border-bottom:1px dashed #000;padding-bottom:10px}#receipt-wrapper .receipt-head p{margin:0;font-size:12px;margin-top:5px}#receipt-wrapper .receipt-date-n{margin-bottom:10px;display:flex;flex-direction:row;justify-content:space-between}#receipt-wrapper .receipt-info{padding-top:10px;margin-bottom:10px;border-top:1px dashed #000}#receipt-wrapper .receipt-items{border-top:1px dashed #000;margin-bottom:0;padding:10px 0}#receipt-wrapper .receipt-item{display:flex;flex-direction:row;justify-content:space-between}#receipt-wrapper .receipt-item .receipt-item-lbl,#receipt-wrapper .receipt-item .receipt-item-price{text-transform:uppercase}#receipt-wrapper .total{display:flex;font-weight:700;flex-direction:row;justify-content:flex-end;border-top:1px dashed #000;padding:10px 0}#receipt-wrapper .total>div:first-child{margin-right:15px}#receipt-wrapper .receipt-info.footer{padding-top:0;border-top:0}#receipt-wrapper .receipt-info.footer>.divider{text-align:center;flex-direction:column}#receipt-wrapper .receipt-info.footer>.receipt-item{text-align:center;flex-direction:column}#receipt-wrapper .receipt-info.footer>.receipt-item>p{margin:0}#receipt-wrapper .receipt-info.footer>.receipt-item.note{padding-bottom:10px;margin-bottom:10px;border-bottom:1px dashed #000}#receipt-wrapper .receipt-item-header{flex:1;flex-direction:column;text-align:left;padding:5px 0}#receipt-wrapper .signature{height:80px;padding:10px;text-align:center}#receipt-wrapper .receipt-item.sub>div:first-child{padding-left:40%}#bon-convocation #receipt-wrapper{width:auto!important;font-size:12px}#bon-convocation #receipt-wrapper .receipt-head{margin-top:-5px;border-bottom:1px solid #000}#bon-convocation .head-content{display:inline-block}#bon-convocation .head-content.col-1{width:18%;position:relative;top:-10px}#bon-convocation .head-content.col-4{width:60%}#bon-convocation .head-content.col-1 img{width:80px;line-height:88px}#bon-convocation .head-content.col-4 p>strong{font-weight:800}#bon-convocation .receipt-content-head{margin-bottom:10px}#bon-convocation .receipt-content-head>h3{width:30%;float:left}#bon-convocation .receipt-content-head>div{text-align:center;width:100%}#bon-convocation .receipt-content-body{display:block;float:left;width:100%}#bon-convocation .with-pulpe .receipt-content-body{padding-bottom:20px;border-bottom:1px dashed #404040}#bon-convocation .receipt-content-item{text-align:right;direction:rtl;display:block;width:100%;float:left}#bon-convocation .with-pulpe .receipt-content-item>p{margin-top:7px;margin-bottom:7px}#bon-convocation .receipt-content-item>p>strong{font-size:14px;font-weight:bolder}#bon-convocation .receipt-content-item.item-1>p{float:right;width:100%}#bon-convocation .receipt-content-item.item-2>p{float:right;width:50%}#bon-convocation .receipt-content-item.item-3>p{float:right;width:33%}#bon-convocation #bar-code>img{width:100%;position:relative;top:5px;height:40px}#bon-convocation #bar-code>span{font-size:14px}#bon-convocation #logo{text-align:right}#bon-convocation .sheet.padding-10mm{padding:10mm;padding-top:5mm;padding-bottom:5mm}#bon-convocation .receipt-footer #logo>img{width:60px}#bon-convocation .receipt-footer .receipt-content-item{display:block}#bon-convocation .receipt-footer .receipt-content-item.item-5>p{display:inline-block;width:20%}#bon-convocation .receipt-footer .receipt-content-item.item-1>p{margin-top:3px;margin-bottom:3px}#bon-convocation .sheet,#bon-convocation .sheet:last-child{page-break-after:auto}'.toString();

    print.document.write(this.css);


    print.document.write('<style type="text/css"> @page { size: A5 landscape } </style>');

    print.document.write('</head>');

    print.document.write('<body  class="A5 landscape" id="bon-convocation">');

    print.document.write('<div id="receipt-wrapper"> <section class="sheet padding-10mm with-pulpe">  <div class="receipt-block">  <div class="receipt-head">  <div class="head-content col-1" id="bar-code">  </div> <div class="head-content col-4"> <p>مجموعة معامل السكر للغرب واللكوس</p> <p>شركة سونابيل ش.م</p> <p><strong style="letter-spacing: 12px;">- SUNABEL -</strong></p> <p>GROUPE DES SUCRERIES DE BETTERAVE GHARB ET LOUKKOS</p> </div> <div class="head-content col-1" id="logo"> <img src="/assets/img/logo_cosumar.png" alt="cosumar groupe" /> </div> </div> <div class="receipt-content"> <div class="receipt-content-head"> <div> <h2>أمر بقلع الشمندر السكري</h2> <span>موسم : </span> </div> </div> <div class="receipt-content-body"> <div class="receipt-content-item item-2"> <p> <span>المركز</span> : <strong>jj</strong> </p> <p> <span>رقم الحساب</span> : <strong>ooo</strong> </p> </div> <div class="receipt-content-item item-2"> <p> <span>إلى السيد</span> : <strong>ooo</strong> </p> <p> <span>رقم البطاقة</span> : <strong>ooo</strong> </p> </div> <div class="receipt-content-item item-1"> <p> <span>مأذون له يوميا إبتداءا من</span> : <strong>ooo</strong></p> </div> <div class="receipt-content-item item-2"> <p> <span>بقلع ما قدره</span> : <strong>ooo</strong> <span>طنا من الشمندر السكري</span> </p> <p> <span>الى معمل :</span> <strong>SUNABEL</strong> </p> </div> <div class="receipt-content-item item-1"> <p> <span>بالقطعة الكائنة بدوار</span> :</p> </div> <div class="receipt-content-item item-1"> <p><span>البالغ مساحتها</span> :<strong> هكتار</strong> </p> </div> <div class="receipt-content-item item-3"> <p style="width: 50%;"> <span>تاريخ التسليم</span> :<span>ooo</span> </p> <p style="width: 25%;"> <span>إمضاء المنتج</span> </p> <p style="width: 25%;"> <span>إمضاء المرشد الزراعي</span> </p> </div> </div> </div> </div> </section>  </div>');



    print.document.write('</body></html>');
    print.document.close(); // necessary for IE >= 10
    print.focus();
   print.print();
    print.close();
    return true;
  }

*/


}
