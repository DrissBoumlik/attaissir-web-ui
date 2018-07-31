import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { RolesService } from '../../services/roles.service';
import { NewComponent } from '../../../interventions/components/new/new.component';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.scss']
})
export class EditeComponent implements OnInit {

  roleDetail: any;
  permissions: any;
  permissionsData = [];
  

  buttonOptions: any = {
    text: 'Enregistrer',
    type: 'success',
    useSubmitBehavior: true
  };

  constructor(private route: ActivatedRoute,public roleService: RolesService,private router: Router) {
    // this.route.params.subscribe( params => this.roleID = params.id );
  }
  onFormSubmit(e) {
    
    console.log(this.permissionsData);
    
    const data = {
      permissions: this.permissionsData
    };
    console.log(data); 
    const roleID = +this.route.snapshot.params['id'];
    this.roleService.updateRole(data,roleID).subscribe(
      (response: any) => {
        NewComponent.notifyMe('Role modifié avec succès, Redirection.........', 'success');
        // NewComponent.notifyMe(JSON.stringify(response), 'success');
        console.log(JSON.stringify("response +"));
        console.log(JSON.stringify(response));
        this.router.navigate([`/roles/liste`]);


      },err => {
        console.log(JSON.stringify(err.error.errors));
        Object.keys(err.error.errors).forEach(
          (e: any) => {
          NewComponent.notifyMe(err.error.errors[e], 'error');
        });
     
      }
    );

}

  onChangeValue(i,j){

    console.log(JSON.stringify(this.permissions[i].permissions[j].id));
    
    var bool = false;
    var index = -1;
    var k = 0;

    for(k=0;k<this.permissionsData.length;k++){
      if(this.permissionsData[k] == this.permissions[i].permissions[j].id){
        bool = true;
        index = k;
      }
    }
    if(!bool){
      this.permissionsData.push(this.permissions[i].permissions[j].id);
    }else{
      this.permissionsData.splice(index,1);
    }
    console.log(this.permissionsData);
  }

  isExiste(id: any,i,j){
    let bool = false;
    for(let k=0;k<this.permissionsData.length;k++){
      if(this.permissionsData[k] == this.permissions[i].permissions[j].id){
        bool = true;
      }
    }

    return bool;
  }

  ngOnInit() {
    const roleID = +this.route.snapshot.params['id'];
    this.roleService.getRole(roleID).subscribe((data: any) => {
      this.roleDetail = data.data;
      console.log(data.data);
      console.log(roleID);
    }, err => {
  
    });

    this.roleService.getPermissions().subscribe((data: any) => {
      this.permissions = data.data;
      console.log(data.data);
    }, err => {
  
    });

    this.roleService.getUserPermissions(roleID).subscribe((data: any) => {
      this.permissionsData = data.data.permissions;
      console.log(JSON.stringify(this.permissionsData));
    })

  }

  

}
