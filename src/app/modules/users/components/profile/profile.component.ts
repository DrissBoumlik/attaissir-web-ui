import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  userInfo: any;
  buttonsave: any;
  positions: string[];
  states: string[];


  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {


    this.userService.getUserInfo().subscribe(response => {
      this.userInfo = response.data;
      console.log(this.userInfo);
    });

    this.buttonsave = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: () => {

      }
    };

  }


}
