import { Component, OnInit } from '@angular/core';
import {ArrachageService} from '../../services/arrachage.service';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {isNull} from 'util';

@Component({
  selector: 'app-echantillonnage-list',
  templateUrl: './echantillonnage-list.component.html',
  styleUrls: ['./echantillonnage-list.component.scss']
})
export class EchantillonnageListComponent implements OnInit {

  echantillons: any = {};
  helper: any;

  constructor(private arrachageService: ArrachageService,
              private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.echantillons.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getEchontillonsDx(loadOptions)
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
    }  else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

}
