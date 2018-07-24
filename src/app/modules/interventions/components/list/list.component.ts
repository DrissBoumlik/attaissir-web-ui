import { Component, OnInit } from '@angular/core';
import { ListService, Company } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService]
})
export class ListComponent implements OnInit {

  dataSource: Company[];

  constructor(service: ListService) {
    this.dataSource = service.getCompanies();
  }

  ngOnInit() {
  }

}
