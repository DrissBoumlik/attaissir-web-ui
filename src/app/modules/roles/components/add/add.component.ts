import {Component, OnInit} from '@angular/core';
import {RolesService} from '../../services/roles.service';
import {NewComponent} from '../../../interventions/components/new/new.component';

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

  constructor(private roleService: RolesService) {
  }

  onFormSubmit(e) {
    const permission_id = [];
    for (let i = 0; i < this.choosingPermissions.length; i++) {
      permission_id.push(this.choosingPermissions[i].id);
    }

    if (permission_id.length) {
      const data = {
        description: this.role.description,
        permission_id: permission_id
      };
      this.roleService.saveRole(data).subscribe(
        (response: any) => {
          NewComponent.notifyMe('Role créé avec succès, Redirection.........', 'success');
          // this.router.navigate([`/utilisateurs/list`]);

        },
        (err) => {
          Object.keys(err.error.errors).forEach(
            (e: any) => {
              NewComponent.notifyMe(err.error.errors[e], 'error');
            });
        }
      );
    } else {
      NewComponent.notifyMe('veuillez attribuer une permission au role :  ' + this.role.description, 'error');

    }

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
  }

  ngOnInit() {
    this.roleService.getPermissions().subscribe(
      (response: any) => {
        for (let i = 0; i < response.data.length; i++) {
          this.listOfPermissions.push({
            id: response.data[i].id,
            description: response.data[i].description,
          });

        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
