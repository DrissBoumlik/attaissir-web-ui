import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {ActivityService} from '../services/activity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  helper: any;
  activities: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              public activityService: ActivityService) {
    this.helper = Helper;
    this.activities = {};
  }


  ngOnInit() {
   /*  this.activities.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.activityService.getActivitiesDx(loadOptions)
          .toPromise()
          .then(response => {
            const json = response.data;
            console.log(json);
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    }); */




    this.activities.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.activityService.getActivitiesDx(loadOptions)
          .toPromise()
          .then(response => {

            return response.data;
          })
          .catch(error => {
            throw error;
          });
      },
      remove: (event: any) => {
        return this.activityService.delete(event.id)
          .toPromise()
          .then(response => {
            this.toastr.success('Le contrat a été supprimé avec succès');
          })
          .catch(error => {
            this.toastr.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      }
    });








    this.activityService.getActivitiesDx(null)
      .toPromise()
      .then(response => {
        const json = response.data;
        console.log(json);
        this.activities = json;
      });

  }

}
