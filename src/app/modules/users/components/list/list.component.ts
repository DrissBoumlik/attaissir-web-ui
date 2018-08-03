import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: any;

  constructor(public usersSerivces: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.usersSerivces.getUsers().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log(data.data);
    }, err => {

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
