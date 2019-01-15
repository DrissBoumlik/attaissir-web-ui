import {Component, OnInit, ViewChild} from '@angular/core';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {ArrachageService} from '../../services/arrachage.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {load} from '@angular/core/src/render3/instructions';
import {HarvestConvocation} from '../../classes/HarvestConvocation';
import {ToastrService} from 'ngx-toastr';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  helper: any;
  popupVisible = false;
  loadingVisible = false;
  error: any = {};
  clickedConvocationButton: any = {};
  submitButtonOptions: any = {};
  filePath = [];
  custom_error_codes = [900];
  motif: any = {};
  parcels: any = {};
  today: Date;
  tomorrow: Date;
  currentRow: HarvestConvocation;
  data: HarvestConvocation[] = [];
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;

  constructor(private arrachageService: ArrachageService,
              private toaster: ToastrService) {
    this.helper = Helper;
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.submitButtonOptions = {
      text: 'Valider et envoyer',
      type: 'success',
      icon: 'check',
      useSubmitBehavior: true,
      onClick: ($ev) => {
        this.loadingVisible = true;
        if (!this.motif.motif.length || !this.motif.description || !this.custom_error_codes.includes(+this.error.code)) {
          this.toaster.info('Veuillez remplir tous les champs obligatoires', 'champs obligatoires', {
            positionClass: 'toast-top-center'
          });
          return;
        }
        this.currentRow.is_exception = {
          motif: this.motif.motif[0],
          description: this.motif.description
        };
        this.arrachageService.convocate(this.currentRow).subscribe(
          (res: any) => {
            this.toaster.success(`La parcelle  ${this.currentRow.parcel_name} a été convocée avec succès `, 'Success', {
              positionClass: 'toast-top-center'
            });
            this.clickedConvocationButton.disabled = true;
            this.loadingVisible = false;
            this.popupVisible = false;
          },
          (err: any) => {
            this.toaster.error(err.error.message, err.error.data, {
              positionClass: 'toast-top-center'
            });
            this.loadingVisible = false;
          }
        );
      }
    };
  }

  ngOnInit() {
    this.parcels.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getOrderedParcels(loadOptions)
          .toPromise()
          .then(response => {
            return response;
          })
          .catch(error => {
            throw error;
          });
      }, update: (loadOptions: any) => {
        console.log(loadOptions);
        return Promise.resolve(true);
      }
    });
  }

  valuechange(e: any, data: any, value: any): void {
    const found = this.data.find(con => {
      return con.parcel_id === data.data.p_id;
    });
    if (found) {
      found[data.column.dataField] = value;
    } else {
      const newHC = new HarvestConvocation();
      newHC.parcel_id = data.data.p_id;
      newHC.start_date = this.tomorrow;
      newHC.sup_semi = this.dataGrid.instance.getKeyByRowIndex(data.rowIndex).sup_semi;
      newHC.end_date = this.tomorrow;
      newHC.parcel_name = data.data.p_name;
      newHC.p_harvest_order = data.data.p_harvest_order;
      newHC.third_party_id = data.data.tp_id;
      newHC.cda_name = data.data.cda_name;
      newHC.is_mechanical = false;
      newHC[data.column.dataField] = value;
      console.log(newHC);
      this.data.push(newHC);
    }
  }

  convocate(ev: any, data: any, btn: any): void {

    const found = this.data.find(con => {
      return con.parcel_id === data.data.p_id;
    });

    if (!found || !found.parcel_id || !found.sup_semi || !found.daily_quota || !found.start_date || !found.end_date) {
      this.toaster.info('Veuillez remplir tous les champs obligatoires', 'champs obligatoires', {
        positionClass: 'toast-top-center'
      });
      return;
    }
    this.arrachageService.convocate(found).subscribe(
      (res: any) => {
        this.toaster.success(`La parcelle  ${data.data.p_name} a été convocée avec succès `, 'Success', {
          positionClass: 'toast-top-center'
        });
        btn.disabled = true;
      },
      (err: any) => {
        if (err.error.code === 901) {
          this.toaster.warning(err.error.message, err.error.data, {
            positionClass: 'toast-top-center'
          });
          return;
        }
        this.error = err.error;
        this.motif.message = this.error.message;
        this.currentRow = found;
        this.popupVisible = true;
        this.clickedConvocationButton = btn;
        /*this.toaster.error(err.error.message, err.error.data, {
          positionClass: 'toast-top-center'
        });*/
      }
    );
  }

  clearDataOnShow() {
    this.motif.motif = [];
  }

}
