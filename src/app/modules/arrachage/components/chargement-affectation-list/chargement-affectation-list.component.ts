import { Component, OnInit } from '@angular/core';
import {ArrachageService} from '../../services/arrachage.service';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-chargement-affectation-list',
  templateUrl: './chargement-affectation-list.component.html',
  styleUrls: ['./chargement-affectation-list.component.scss']
})
export class ChargementAffectationListComponent implements OnInit {

  affectations: any = {};
  helper: any;
  selectedRow: any = {};

  constructor(private arrachageService: ArrachageService,
              private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.affectations.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getChargementListDx(loadOptions)
          .toPromise()
          .then(response => {
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  printBn(idChargement) {
      this.arrachageService.getChargementById(idChargement)
        .subscribe(
          (res) => {
            this.selectedRow = res.data;
            setTimeout(() => {
              this.printBon();
            }, 1000);
          },
          (err) => {}
        );
  }

  printBon = () => {
    const w = window.open('', 'PRINT', 'height=400,width=600');

    w.document.write('<!DOCTYPE html>');

    w.document.write('<html>');
    w.document.write('<head>');

    w.document.write('<link rel="stylesheet" href="/assets/app/css/print.css" type="text/css" />');

    w.document.write('</head>');
    w.document.write('<body>');
    w.document.write($('#t2').html());
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
}
