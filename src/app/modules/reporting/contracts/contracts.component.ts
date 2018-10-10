import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import {ReportingService} from '../services/reporting-service.service';
import {Helper} from '../../../shared/classes/helper';
import {DxDataGridComponent} from 'devextreme-angular';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  contracts: any = {};
  helper: any;
  cins = [];
  cnt = 0;
  cinSet: Set<string>;
  @ViewChild('ReportingContracts') ReportingContracts: DxDataGridComponent;

  constructor(private reportingService: ReportingService,
              private toaster: ToastrService) {
    this.helper = Helper;
    this.cinSet = new Set([]);
  }

  ngOnInit() {
    this.contracts.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.reportingService.getContractsDx(loadOptions)
          .toPromise()
          .then(response => {
            this.cins = [];
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      }/*,
      map: (contract) => {
       /!* response.data.map(contrat => {
          this.reportingService
            .getVarsByZone(contrat.z_id)
            .subscribe(
              (data: any) => {
                contrat.cons = data.data[0].cons;
              }
            );
        });*!/
      }*/
    });
  }

  getConsByZone(zone_id) {
    this.reportingService
      .getVarsByZone(zone_id)
      .subscribe(
        (data: any) => {
          return data.data[0].cons;
        }
      );
  }

  calculateDistinctCin = (options: any) => {
    if (options.name === 'SelectedRowsSummary') {
      if (options.summaryProcess === 'start') {
        options.totalValue = options.totalValue ? options.totalValue : 0;
      } else if (options.summaryProcess === 'calculate') {
        if (!this.cins.includes(options.value.tp_cin)) {
          this.cins.push(options.value.tp_cin);
          options.totalValue = this.cins.length;
        }
      } else if (options.summaryProcess === 'finalize') {
        options.totalValue = this.cins.length;
      }
    }
  }

  /*loadCons = () => {
    this.ReportingContracts.instance.getVisibleRows().forEach((row: any) => {
      if (!row.data.check && !row.data.cons) {
        row.data.check = true;
        this.reportingService
          .getVarsByZone(row.data.z_id)
          .subscribe(
            (data: any) => {
              row.data.cons = data.data[0].cons;
            });
      }
    });

    /!*this.ReportingContracts.instance.getVisibleRows().forEach((row: any) => {
      console.log(this.cnt++);
    });*!/
  }*/


  /*  customizeExportData =  (columns, rows) => {
      rows.forEach((row) => {
        if (row.data && !row.data.cons && !row.data.check) {
          row.data.check = true;
          this.reportingService
            .getVarsByZone(row.data.z_id)
            .subscribe(
              (data: any) => {
                row.data.cons = data.data[0].cons;
                row.values.push(data.data[0].cons);
              });
        }
      });
    }*/
}
