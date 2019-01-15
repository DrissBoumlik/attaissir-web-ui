import { Component, OnInit } from '@angular/core';
import { ArrachageService } from '../../services/arrachage.service';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {isNull} from "util";

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

  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'En cours'.toLowerCase()) {
      return 'm-badge m-badge--primary m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

  getStatut = (value: string): string => {
    if (value === 'inprogress') {
      return 'ENCOURS';
    } else if (value === 'done') {
      return 'VALIDÉ';
    } else if (value === 'canceled') {
      return 'ANNULÉ';
    }
    return '';
  }
}



