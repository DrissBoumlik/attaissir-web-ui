import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import custom_store from '../../../../../../node_modules/devextreme/data/custom_store';
import DevExpress from '../../../../../../node_modules/devextreme/bundles/dx.all';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  dataSource: any = {};

  helper: any;

  constructor(public service: InterventionService,
              public router: Router) {
  }

  ngOnInit() {
    this.service.getInterventions().subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = data.data;
    }, err => {}
    );
    // this.service.getInterventions().subscribe((data: any) => {
    //   this.dataSource = data.data;
    // }, err => {

    // });

    // this.dataSource.store = new custom_store({
    //   load: (loadOptions: any) => {
    //     return this.service.getInterventionsDx(loadOptions)
    //       .toPromise()
    //       .then(response => {
    //         const json = response;
    //         return json;
    //       })
    //       .catch(error => {
    //         throw error;
    //       });
    //   }
    // });

    this.dataSource.store = new custom_store({
      load: (loadOptions: any) => {
        return this.service.getInterventionsDx(loadOptions)
          .toPromise()
          .then(response => {
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });

  }

  onStartEdit = (e) => {
    this.router.navigate([`/interventions/modifier/${e}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }


}
