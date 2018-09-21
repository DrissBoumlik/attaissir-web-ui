import {Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from 'util';
import {PreconisationsIntrantsService} from '../../service/preconisations-intrants.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  preconisations: any = {};
  helper: any;


  constructor(private precoService: PreconisationsIntrantsService) {
    this.helper = Helper;
  }


  ngOnInit() {
    this.preconisations.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.precoService.getListPreconisationsDetailsDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });

   /* this.precoService.getListPreconisationsDetailKPIs().subscribe(
      (res) => {
        console.log(res);
      }
    );*/
  }


  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'validé') {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'en cours') {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'annulé') {
      return 'm-badge m-badge--danger m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


}
