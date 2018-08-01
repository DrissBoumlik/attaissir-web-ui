import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { DemandesService } from '../../../demandes/service/demandes.service';

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.scss']
})
export class ReplenishmentComponent implements OnInit {

  replenishment: any;
  constructor(public commandeService: DemandesService) {
    this.replenishment = {};
  }

  ngOnInit() {

    this.replenishment.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.commandeService.getAllDx(loadOptions)
          .toPromise()
          .then((stk: any) => {
            console.log(stk);
            return {
              data: stk.data,
              totalCount: stk.totalCount
            };
          })
          .catch(err => {
            throw err;
          });
      }
    });
  }

}
