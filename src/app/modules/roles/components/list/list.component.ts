import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import custom_store from '../../../../../../node_modules/devextreme/data/custom_store';
import { Helper } from '../../../../shared/classes/helper';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rolesDataSource: any = {};
  helper: any;

  constructor(public roleService: RolesService, _router: Router, private router: Router) { 
    this.helper=Helper;
  }

  ngOnInit() {

    // this.roleService.getRoles().subscribe((data: any) => {
    //   this.rolesDataSource = data.data;
    //   console.log(data.data);
    // }, err => {

    // });

    this.rolesDataSource.store = new custom_store({
      load: (loadOptions: any) => {
        return this.roleService.getRolesDx(loadOptions)
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
    this.router.navigate([`/roles/modifier/${e}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

}

