import { Component, OnInit } from '@angular/core';
import {ThirdsService} from '../../../thirds/services/thirds.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  parcel: any;
  thirds: any;
  thirdOptions: any;
  contractOptions: any;
  buttonOptions: any;
  parcels_right: any;
  parcels_left: any;


  constructor( private thirdsService: ThirdsService) {
    this.parcels_right = [];
    this.parcels_left = [];
  }

  ngOnInit() {

    this.buttonOptions = {
      text: 'Valider',
      type: 'success',
      useSubmitBehavior: true
    };


    this.parcels_right.push({id : 1 , name : 'name1' , value : true , checked : false },
      {id : 1 , name : 'name2' , value : true , checked : false },
      {id : 1 , name : 'name3' , value : true , checked : false },
      {id : 1 , name : 'name4' , value : true , checked : false }
      );




  }


  test(event, option) {
    if ( !event.value) {
      const i = this.parcels_right.indexOf(option);
      this.parcels_right.splice(i, 1);
      this.parcels_left.push(option);
    }
  }

  test2(event, option) {
    if ( !event.value) {
      const i = this.parcels_left.indexOf(option);
      this.parcels_left.splice(i, 1);
      this.parcels_right.push(option);
    }
  }

  addAll() {

    // this.parcels_right.splice(it, 1);

    this.parcels_right.forEach((it) => {
      this.parcels_left.push(it);

    });
    this.parcels_right = [];

  }

}
