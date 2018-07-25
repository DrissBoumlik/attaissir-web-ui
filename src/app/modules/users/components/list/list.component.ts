import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: any;

  constructor(public usersSerivces: UsersService) { 
    
   
  }

  ngOnInit() {
    this.usersSerivces.getUsers().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log(data.data);
    }, err => {

    });
  }

}
