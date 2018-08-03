import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import custom_store from '../../../../../../node_modules/devextreme/data/custom_store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: any = {};

  constructor(public usersSerivces: UsersService,private router: Router) {
  }

  ngOnInit() {
    // this.usersSerivces.getUsers().subscribe((data: any) => {
    //   this.dataSource = data.data;
    //   console.log(data.data);
    // }, err => {

    // });

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
