import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rolesDataSource: any;

  constructor(public roleService: RolesService,_router: Router) { }
  
  ngOnInit() {

    this.roleService.getRoles().subscribe((data: any) => {
      this.rolesDataSource = data.data;
      console.log(data.data);
    }, err => {
  
    });

  }

}
