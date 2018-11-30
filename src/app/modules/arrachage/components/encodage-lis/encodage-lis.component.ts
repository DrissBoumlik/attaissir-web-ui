import { Component, OnInit } from '@angular/core';
import {ArrachageService} from '../../services/arrachage.service';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {isNull} from "util";

@Component({
  selector: 'app-encodage-lis',
  templateUrl: './encodage-lis.component.html',
  styleUrls: ['./encodage-lis.component.scss']
})
export class EncodageLisComponent implements OnInit {

  list: any = {};
  helper: any;

  constructor(private arrachageService: ArrachageService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.list.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getEncodagesDx(loadOptions)
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
    return 'm-badge m-badge--success m-badge--wide';

  }

}
