import { Component, OnInit } from '@angular/core';
import { Incident } from '../../../../shared/classes/Incident';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from '../../services/incident.service';
import CustomStore from 'devextreme/data/custom_store';
import {Helper} from '../../../../shared/classes/helper';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  incidents: any = {};
  helper: any;

  constructor(private incidentService: IncidentService,
    private toaster: ToastrService) {
   this.helper =  Helper;
  }

  ngOnInit() {
    /*this.incidentService.getAll().subscribe(
      (res: Incident[]) => {
        this.incidents = res;
      }
    );*/
    this.incidents.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.incidentService.getIncidentsDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            response.data = response.data.length ? response.data : [
              {
                id: 1,
                cda: 223,
                zone: 7,
                parcel_name: 'SPB2',
                description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
                type: 'type',
                priority: 1,
                severity: 3.2,
                contagion_risk: 5,
                affected_surface: 3.2,
                lost_surface: 3.2
              }
            ];
            const json = response;
            return json;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      },
      remove: (event: any) => {
        return this.incidentService.deleteIncident(event.id)
          .toPromise()
          .then(response => {
            console.log(response);
            this.toaster.success('L\'incident a été supprimé avec succès');
          })
          .catch(error => {
            this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      },
      insert: (event: any) => {
        const incident = new Incident();
        incident.name = event.name;
        incident.description = event.description;
        return this.incidentService.addIncident(incident)
          .toPromise()
          .then(res => {
            this.toaster.success('L\'incident a été ajouté avec succès');
          })
          .catch(err => {
            this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      }
    });
  }

  arrayOne(n: number): any[] {
    return Array(Math.round(n));
  }

  /*onEditIncident(e: any) {
    const d = new $.Deferred();
    const name = e.newData.name ? e.newData.name : e.oldData.name;
    const description = e.newData.description ? e.newData.description : e.oldData.description;
    const incident = new Incident();
    incident.name = name;
    incident.description = description;
    e.cancel = true;
    this.incidentService.editIncident(e.oldData.id, incident).subscribe(
      (res: Incident) => {
        d.resolve();
        this.toaster.success('Opération réussie.');
      },
      (err: any) => {
        d.reject('Opération échouée.');
      }
    );
    e.cancel = d.promise();
  }*/

  /*onRemoveIncident(e: any) {
    const d = new $.Deferred();
    e.cancel = true;
    this.incidentService.deleteIncident(e.data.id).subscribe(
      (res: any) => {
        d.resolve();
        this.toaster.success('Opération réussie.');
      },
      (err: any) => {
        d.reject('Opération échouée.');
      }
    );
    e.cancel = d.promise();
  }*/

  /*
    onAddIncident(e: any) {
      const d = new $.Deferred();
      e.cancel = true;
      const incident = new Incident();
      incident.name = e.data.name;
      incident.description = e.data.description;
      this.incidentService.addIncident(incident).subscribe(
        (res: Incident) => {
          d.resolve();
          this.toaster.success('Opération réussie.');
        },
        (err: any) => {
          d.reject('Opération échouée.');
        }
      );
      e.cancel = d.promise();
    }
  */


}
