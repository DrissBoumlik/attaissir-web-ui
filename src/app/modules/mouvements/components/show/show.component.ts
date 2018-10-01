import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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


  popupRfidVisible = false;
  rf_code = null;

  @ViewChild('rfid') rfid: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;
  @ViewChild('popup') popup: ElementRef;



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
      this.print();
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
 
        let  w=window.open();  
        w.document.write('<!DOCTYPE html>');
        w.document.write('<html>');
        w.document.write('<head>');

        w.document.write('<link rel="stylesheet" href="/assets/app/css/print.css" type="text/css" />');
        w.document.write('</head>');
        w.document.write('<body>');
        w.document.write($('#t1').html());

        w.document.write('</body>');
        w.document.write('</html>');

      setTimeout(() => {
          w.print();
      }, 3000);


      setTimeout(() => {
          w.close();
      }, 5000);


 
        return true;
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
 
       console.log(this.rf_code);

      this.mouvementsService.changeStatus(this.mouvement.id,this.rf_code)
          .toPromise()
          .then(response => {


            this.mouvement.state = 'inprogress';
            this.toastr.success(response.data)
            return response;
          })
          .catch(error => {
            this.toastr.error(error.error.message)
            throw error;
          });
      
 
      }


      this.popupRfidVisible = false;

      }, 1000);

    });

  }


  
  Scan() {
    console.log('ok');
    this.popupRfidVisible = true;
  }


  doSomething(event) {
    if (this.popupRfidVisible) {
      this.rf_code = event.value;
    }
  }


}
