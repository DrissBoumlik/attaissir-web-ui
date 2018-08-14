import { Component, OnInit, ViewChild } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import CustomStore from 'devextreme/data/custom_store';
import { main } from '@angular/compiler-cli/src/main';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import { DxiRowComponent } from 'devextreme-angular/ui/nested/row-dxi';
import { Helper } from '../../../../shared/classes/helper';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-templete',
  templateUrl: './add-templete.component.html',
  styleUrls: ['./add-templete.component.scss']
})
export class AddTempleteComponent implements OnInit {


  statuses: string[];
  buttonsave: any;
  helper: any;
  templates: any;
  templateOptions: any = {};
  template: any;
  dateOptions: any = {};
  loadingVisible = false;

  @ViewChild('ref1') ref1: DxTreeListComponent;

  _parcels: any = {};
  request_type_id: any;



  constructor(private interventionService: InterventionService, private toastr: ToastrService, private router: Router) {
    this.helper = Helper;
    this.template = {};
  }

  ngOnInit() {

    this._parcels.store = new CustomStore({
      load: (loadOptions: any) => {

        return this.interventionService.getParcelsDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            return response;

          })
          .catch(error => {
            return null;
            //  throw error;
          });
      }
    });


    this.templateOptions = {
      label: 'Template',
      displayExpr: 'template_name',
      valueExpr: 'id',
      searchEnabled: true,
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.interventionService.getTemplates()
            .toPromise()
            .then(response => {
              this.request_type_id = response.data.request_type_id;
              const json = response.data.templates;
              return json;
            })
            .catch(error => {
              throw error;
            });
        },
        byKey: (key) => {
          return key;
        }

      })
    };

    this.buttonsave = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: () => {
        this.loadingVisible = true;
        const selected_parc = [];

        this.ref1.instance.getVisibleRows().forEach((row: any) => {

          if (row.data.is_selected && row.data.parent_id === 0) {
            selected_parc.push(row.data);
          }
        });

        if (selected_parc.length > 0) {
          const item = {
            id: this.template.template,
            date: this.template.date, description: this.template.description,
            request_type_id: this.request_type_id, items: selected_parc
          };

          this.interventionService.addIng(item).subscribe((response) => {
            this.loadingVisible = false;
            this.toastr.success('Les modifications ont été effectuées avec succès.');
            this.router.navigate(['/preconisations-intrants/liste']);
          })
        } else {
          this.toastr.warning('la selection des parcelles est obligatoire');
        }

      }
    };


    this.dateOptions = {
      invalidDateMessage: 'La date doit avoir le format suivant: jj/MM/aaaa',
      calendarOptions: {
        dateSerializationFormat: 'dd/MM/yyyy',
        displayFormat: 'yyyy-MM-dd',
        forceIsoDateParsing: true
      },
      onValidated: (e) => {
        if (!e.value) {
          e.isValid = true;
        }
      },
      width: '100%'
    };
  }



  selectedEvent(event) {

    this.ref1.instance.getVisibleRows().forEach((row: any) => {
      row.data.is_selected = event;
    });
  }


  selectedEventItem(event, id) {

    this.ref1.instance.getVisibleRows().forEach((row: any) => {

      if (row.data.id === id) {
        row.data.is_selected = event;
      }
    });
  }


}
