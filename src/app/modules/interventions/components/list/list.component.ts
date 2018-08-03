import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  dataSource: any;

  constructor(public service: InterventionService,public router: Router) {
  }

  ngOnInit() {
    this.service.getInterventions().subscribe((data: any) => {
      this.dataSource = data.data;
    }, err => {

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
