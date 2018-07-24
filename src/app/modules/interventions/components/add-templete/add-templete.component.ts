import { Component, OnInit, ViewChild } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import CustomStore from 'devextreme/data/custom_store';
import { main } from '@angular/compiler-cli/src/main';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import { DxiRowComponent } from 'devextreme-angular/ui/nested/row-dxi';
import { Helper } from '../../../../shared/classes/helper';

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

  @ViewChild('ref1') ref1: DxTreeListComponent;

  _parcels: any = {};


  constructor(private interventionService: InterventionService) {
    this.helper = Helper;
    this.template = {};
  }

  ngOnInit() {

    this._parcels.store = new CustomStore({
      load: (loadOptions: any) => {

        return this.interventionService.getParcelsDx(loadOptions)
          .toPromise()
          .then(response => {


            // const json = [ response.data[0] , response.data[5]];
            // const json = [ response.data[0] , response.data[1] , response.data[5] ];
            // console.log(json);

            return response;
          })
          .catch(error => {
            throw error;
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
              console.log(response);
              const json = response.data;
              return json;
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
        },
        byKey: (key) => {
          console.log(key);
          return key;
        }
      })
    };

    this.buttonsave = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: () => {


        const selected_parc = [];

        this.ref1.instance.getVisibleRows().forEach((row: any) => {
          if (row.data.is_selected && row.data.parent_id === 0) {
            console.log(selected_parc);
            selected_parc.push(row.data);
          }
        });
        const item = [{ template_id: this.template.template, selected_parc: selected_parc }];
        this.interventionService.addIng(item).subscribe((response) => {
          console.log(response);
        });

      }
    };
  }


  selectedEvent(event) {

    this.ref1.instance.getVisibleRows().forEach((row: any) => {
      row.data.is_selected = event;
      console.log(row.data);
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
