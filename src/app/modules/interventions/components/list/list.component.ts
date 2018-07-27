import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  dataSource: any;

  constructor(public service: InterventionService) {
  }

  ngOnInit() {
    this.service.getInterventions().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log(data.data);
    }, err => {

    });
  }

}
