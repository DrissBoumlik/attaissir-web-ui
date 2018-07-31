import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { NewComponent } from '../../../interventions/components/new/new.component';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  listOfPermissions = [];
  choosingPermissions = [];
  role: any = {};
  // ui
  buttonOptions: any = {
    text: 'Enregistrer',
    type: 'success',
    useSubmitBehavior: true
  };
  permissions: any;
  router: Router;
  data1 = [];
  constructor(public roleService: RolesService, _router: Router) {
    // this.permissions = this.roleService.getPermissions();
    this.router = _router;
  }

  onFormSubmit(e) {

<<<<<<< HEAD
      console.log(JSON.stringify(this.data1));

      const data = {
        description: this.role.description,
        permission_id: this.data1
      };
      console.log(data); 
      this.roleService.saveRole(data).subscribe(
        (response: any) => {
          NewComponent.notifyMe('Role créé avec succès, Redirection.........', 'success');
          // NewComponent.notifyMe(JSON.stringify(response), 'success');
          console.log(JSON.stringify(response));
          this.router.navigate([`/roles/liste`]);


        },err => {
          console.log(JSON.stringify(err.error.errors));
          Object.keys(err.error.errors).forEach(
            (e: any) => {
=======
    console.log(JSON.stringify(this.data1));

    const data = {
      description: this.role.description,
      permission_id: this.data1
    };
    console.log(data);
    this.roleService.saveRole(data).subscribe(
      (response: any) => {
        NewComponent.notifyMe('Role créé avec succès, Redirection.........', 'success');
        // NewComponent.notifyMe(JSON.stringify(response), 'success');
        console.log(JSON.stringify(response));
        this.router.navigate([`/utilisateurs/list`]);


      }, err => {
        console.log(JSON.stringify(err.error.errors));
        Object.keys(err.error.errors).forEach(
          (e: any) => {
>>>>>>> adc58d46d988724fe71a715f28c131e5fb65b466
            NewComponent.notifyMe(err.error.errors[e], 'error');
          });

      }
    );

  }

  removeItemFromChoosingPermissions(e) {
    const tmp = this.listOfPermissions;
    tmp.push({
      id: e.data.id,
      description: e.data.description
    });
    this.listOfPermissions = tmp;
  }

  addToChoosingPermission(e) {
    this.listOfPermissions = this.listOfPermissions.filter(
      s => {
        return s.id !== e.itemData.id;
      }
    );
    this.choosingPermissions.push({
      id: e.itemData.id,
      description: e.itemData.description
    });
<<<<<<< HEAD
  } 
  
  onChangeValue(i,j){
=======
  }

  onChangeValue(i, j) {
>>>>>>> adc58d46d988724fe71a715f28c131e5fb65b466

    console.log(JSON.stringify(this.permissions[i].permissions[j].id));

    var bool = false;
    var index = -1;
    var k = 0;

    for (k = 0; k < this.data1.length; k++) {
      if (this.data1[k] == this.permissions[i].permissions[j].id) {
        bool = true;
        index = k;
      }
    }
    if (!bool) {
      this.data1.push(this.permissions[i].permissions[j].id);
    } else {
      this.data1.splice(index, 1);
    }
    console.log(this.data1);
  }

  ngOnInit() {
    //   this.roleService.getPermissions().subscribe(
    //     (response: any) => {
    //       for (let i = 0; i < response.data.length; i++) {
    //         this.listOfPermissions.push({
    //           id: response.data[i].id,
    //           description: response.data[i].description,
    //         });

    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );

    this.roleService.getPermissions().subscribe((data: any) => {
      this.permissions = data.data;
      console.log(data.data);
    }, err => {

    });
    console.log("*********************");
    console.log(JSON.stringify(this.data1));
    console.log("*********************");
  }
}
