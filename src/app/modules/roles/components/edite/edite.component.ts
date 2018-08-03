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
  count:number;
  checkAll:   any;
  permissionsCount: number;
  permissionsSelected: number;
  isChecked: boolean;
  isAll: any;
  checkItem: boolean;

  constructor(private route: ActivatedRoute,public roleService: RolesService,private router: Router) {
    // this.route.params.subscribe( params => this.roleID = params.id );
    this.checkAll = false;
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
    if(this.count == this.permissionsData.length){
      this.checkAll = true;
    }else{
      this.checkAll = false;
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
  onSelectAll(i,j){
    var bool = false;
    var index = -1;
    var k = 0;

    for (k = 0; k < this.permissionsData.length; k++) {
      if (this.permissionsData[k] == this.permissions[i].permissions[j].id) {
        bool = true;
        index = k;
      }
    }
    if (!bool) {
      this.permissionsData.push(this.permissions[i].permissions[j].id);
    } else {
    }
  }
  selectedItems = [];
  selecteLigne(i,id){
    let hasItem = false;
    let index = -1;
    for(let j=0;j<this.selectedItems.length;j++){
      if(this.selectedItems[j] == id){
        hasItem = true;
        index = j;
      }
    }
    if(hasItem){
      this.selectedItems.splice(index,1);
    }else{
      this.selectedItems.push(id);
    }
    console.log("*********");
    console.log(this.selectedItems.length);
    console.log(this.permissionsCount);
    console.log("*********");
    if(this.selectedItems.length == this.permissionsCount){
      this.checkAll = true;
    }else{
      this.checkAll = false;
    }
    
    for(let j=0;j<this.permissions[i].permissions.length;j++){
      this.onChangeValue(i,j);
    }
    console.log(this.permissionsData);
  }
  selecteAll(){
    this.checkAll = !this.checkAll;
    if(this.permissionsData.length == 0){
      console.log('== 0');
      this.isChecked=true;
      // this.checkItem=true;
      this.selectedItems=[];
      let x=0;
      for(let l=0;l<this.permissions.length;l++){
        if(this.permissions[l].permissions.length>0){
          this.selectedItems[x] = this.permissions[l].id;
          x++;
        }
      }
      console.log("*********");
      console.log(this.selectedItems.length);
      console.log(this.permissionsCount);
      console.log("*********");
      for(let i=0;i<this.permissions.length;i++){
        for(let j=0;j<this.permissions[i].permissions.length;j++){
          this.onSelectAll(i,j);
        }
      }
      
    }else{
      if(this.permissionsData.length<this.count){
        console.log('<');
        this.permissionsData=[];
        this.isChecked=true;
        // this.checkItem=true;
        this.selectedItems=[];
        let x=0;
        for(let l=0;l<this.permissions.length;l++){
          if(this.permissions[l].permissions.length>0){
            this.selectedItems[x] = this.permissions[l].id;
            x++;
          }
        }
        console.log("*********");
        console.log(this.selectedItems.length);
        console.log(this.permissionsCount);
        console.log(this.isChecked);
        console.log("*********");
        for(let i=0;i<this.permissions.length;i++){
          for(let j=0;j<this.permissions[i].permissions.length;j++){
            this.onSelectAll(i,j);
          }
        }
      }else{
       
        if(this.permissionsData.length == this.count){
          this.permissionsData=[];
          this.isChecked=false;
          // this.checkItem=false;
          this.selectedItems=[];
          console.log('==');
          console.log("*********");
          console.log(this.selectedItems.length);
          console.log(this.permissionsCount);
          console.log(this.isChecked);
          console.log("*********");
          
          
        }
      }
    }
    
    
    console.log(this.permissionsData);
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
      this.count = 0;
      this.permissionsCount = 0;
      for(let i=0;i<this.permissions.length;i++){
        if(this.permissions[i].permissions.length>0){
          this.permissionsCount++;
        }
        for(let j=0;j<this.permissions[i].permissions.length;j++){
          this.count++;
        }
      }
    }, err => {
  
    });

    this.roleService.getUserPermissions(roleID).subscribe((data: any) => {
      this.permissionsData = data.data.permissions;
      if(this.count == this.permissionsData.length){
        this.checkAll = true;
      }
    })

   

  }

  

}
