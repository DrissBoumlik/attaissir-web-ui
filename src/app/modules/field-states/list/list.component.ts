import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import { IncidentService } from '../../incidents/services/incident.service';
import { Helper } from '../../../shared/classes/helper';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  fieldStates: any = {};
  helper: any;

  constructor(private incidentService: IncidentService,
    private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    /*this.incidentService.getAll().subscribe(
      (res: Incident[]) => {
        this.incidents = res;
      }
    );*/
    this.fieldStates.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.incidentService.getFieldStatesDx(loadOptions)
          .toPromise()
          .then(response => {
          //  console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      }
    });
  }

  arrayOne(n: number): any[] {
    return Array(Math.round(n));
  }

}
