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
  role: any;
  structures: any;

  nbr_cdas: any = 0;
  nbr_zones: any = 0;
  nbr_structs: any = 0;


  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userInfo = {};
  }

  ngOnInit() {


    this.userService.getUserInfo().subscribe(response => {
      this.userInfo = response.data;
      this.structures = response.data.structures;
      this.nbr_structs =  response.data.structures.length;
      this.role = response.data.structures.role;

      response.data.structures.forEach((it) => {
        this.nbr_cdas += it.cdas.length;
      });

      response.data.structures.forEach((it) => {
         it.cdas.forEach((_it) => {
           this.nbr_zones += _it.zones.length;
         });
      });

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
