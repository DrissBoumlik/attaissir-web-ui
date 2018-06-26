import {Component, OnInit} from '@angular/core';
import {IncidentService} from '../../services/incidents';
import {Incident} from '../../classes/Incident';
import {ToastrService} from 'ngx-toastr';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  incidents: Incident[];

  constructor(private incidentService: IncidentService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.incidentService.getAll().subscribe(
      (res: Incident[]) => {
        this.incidents = res;
      }
    );
  }

  onEditIncident(e: any) {
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
  }

  onRemoveIncident(e: any) {
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
  }

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
}
