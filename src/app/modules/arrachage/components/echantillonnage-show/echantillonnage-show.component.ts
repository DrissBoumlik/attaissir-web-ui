import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArrachageService } from '../../services/arrachage.service';
import { Helper } from '../../../../shared/classes/helper';
import { NewComponent } from '../../../interventions/components/new/new.component';

@Component({
  selector: 'app-echantillonnage-show',
  templateUrl: './echantillonnage-show.component.html',
  styleUrls: ['./echantillonnage-show.component.scss']
})
export class EchantillonnageShowComponent implements OnInit {

  echantillonage: any = {};
  analyse_data: any = {};
  helper: any;
  buttonSave: any;
  int_ref: any;
  custom_fields = [];
  DX_custom_fields = [];
  echantillonage_custom_fields: any = {};
  /*-----------------LoadingVisible--------------------------*/
  loadingvisible = false;
  /*-----------------CONSTANTS--------------------------*/
  DB_NUMBER_BOX = 'number';
  DB_CHECK_BOX = 'checkbox';
  DB_SELECT_BOX = 'select';
  /*-----------------CONSTANTS--------------------------*/
  DX_TEXT_BOX = 'dxTextBox';
  DX_NUMBER_BOX = 'dxNumberBox';
  DX_CHECK_BOX = 'dxCheckBox';
  DX_SELECT_BOX = 'dxSelectBox';

  constructor(private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private arrachageService: ArrachageService) {
    this.helper = Helper;
  }


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.arrachageService.getInterventionById(params.id).subscribe((res: any) => {
          this.echantillonage = res.data;
          this.int_ref = params.id;
          res.data.costum_fields = JSON.parse(res.data.costum_fields);
          this.echantillonage_custom_fields = res.data.costum_fields[0];
          this.custom_fields = res.data.costum_fields[0].fields ? res.data.costum_fields[0].fields : [];
          console.log(res.data.costum_fields);
          this.custom_fields.forEach((cf: any) => {
            const dxCustomField = {
              dataField: cf.name,
              label: cf.label,
              required: false,
              value: cf.value,
              editorType: this.DX_TEXT_BOX,
              colspan: 1,
            };
            switch (cf.type) {
              case (this.DB_NUMBER_BOX): {
                dxCustomField.editorType = this.DX_NUMBER_BOX;
                dxCustomField.colspan = 1;
                break;
              }
              case (this.DB_CHECK_BOX): {
                dxCustomField.editorType = this.DX_CHECK_BOX;
                dxCustomField.colspan = 1;
                break;
              }
            }
            this.DX_custom_fields.push(dxCustomField);
          });
        }, error1 => {
          throw error1;
        });
      });

    this.buttonSave = {
      text: 'Enregistrer',
      type: 'success',
      useSubmitBehavior: true,
      icon: 'fa fa-save',
      onClick: ($event) => {
        this.loadingvisible = true;
        this.arrachageService.saveAnalyse(this.analyse_data, this.int_ref).subscribe(
          (res) => {
            this.loadingvisible = false;
            this.toastr.success('enregistré avec succès');
          }, (err) => {
            this.loadingvisible = false;
            throw err;
          }
        );
      }
    };
  }

}
