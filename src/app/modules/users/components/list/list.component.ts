import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import custom_store from '../../../../../../node_modules/devextreme/data/custom_store';
import { Helper } from '../../../../shared/classes/helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: any = {};
  helper: any;

  constructor(public usersSerivces: UsersService, private router: Router, private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {


    this.dataSource.store = new custom_store({
      load: (loadOptions: any) => {
        return this.usersSerivces.getUsersDx(loadOptions)
          .toPromise()
          .then(response => {
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      },
      remove: (event: any) => {
        return this.usersSerivces.deleteUser(event.id)
          .toPromise()
          .then(response => {
            this.toastr.success('L \'utilisateur a été supprimé avec succès');
          })
          .catch(error => {
            this.toastr.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      }
    });

  }

  onStartEdit = (e) => {
    this.router.navigate([`/utilisateurs/modifier/${e}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }



}
