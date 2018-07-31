import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import index from '@angular/cli/lib/cli';
import number_box from 'devextreme/ui/number_box';
import { NewComponent } from '../../../interventions/components/new/new.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router
  ) {
  }

  checkedItems = [];
  listeDesCdas = [];
  currentStructurIdInPopUp: any;

  roleOptions: any;
  user: any = {};
  choosingStructures = [];
  listOfStructures = [];
  listOfRoles = [];

  buttonOptions: any = {
    text: 'Enregistrer',
    type: 'success',
    useSubmitBehavior: true
  };


  popupVisible = false;

  savePopUpCdas() {
    for (let i = 0; i < this.choosingStructures.length; i++) {
      if (this.choosingStructures[i].id === this.currentStructurIdInPopUp) {
        this.choosingStructures[i].cdas = this.listeDesCdas.slice();
        break;
      }
    }
    // this.choosingStructures[this.currentStructurIdInPopUp].cdas = this.listeDesCdas;
    this.popupVisible = false;
  }

  showStructureZones(data: any) {
    this.currentStructurIdInPopUp = data.data.id;
    this.listeDesCdas = [];
    for (let i = 0; i < this.choosingStructures.length; i++) {
      if (this.choosingStructures[i].id === data.data.id) {
        this.listeDesCdas = this.choosingStructures[i].cdas.slice();
        break;
      }
    }
    this.popupVisible = true;
  }

  // tree elements
  selectionChanged(e) {
    let value = e.node;
    if (this.isProduct(value)) {
      this.processProduct({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
        category: value.parent.text
      });
    } else {
      value.items.forEach((product, index) => {
        this.processProduct({
          id: product.key,
          text: product.text,
          itemData: product.itemData,
          selected: product.selected,
          category: value.text
        });
      });
    }
  }

  isProduct(data) {
    return !data.items.length;
  }

  processProduct(product) {
    let itemIndex = -1;

    this.checkedItems.forEach((item, index) => {
      if (item.id === product.id) {
        itemIndex = index;
        return false;
      }
    });
    if (product.selected && itemIndex === -1) {
      this.checkedItems.push(product);
    } else if (!product.selected) {
      this.checkedItems.splice(itemIndex, 1);
    }
  }

  // end tree elements


  addToChoosingStructures(e) {
    this.listOfStructures = this.listOfStructures.filter(
      s => {
        return s.id !== e.itemData.id;
      }
    );

    this.choosingStructures.push({
      id: e.itemData.id,
      name: e.itemData.name,
      cdas: e.itemData.cdas
    });

  }

  addCustomItem($event) {

  }

  removeItemFromChoosingStructures(e) {
    const tempData = [];
    const foundEle = [];
    for (let i = 0; i < e.data.cdas.length; i++) {
      const items = e.data.cdas[i].items;
      for (let j = 0; j < items.length; j++) {
        for (let k = 0; k < this.checkedItems.length; k++) {
          if (this.checkedItems[k].id === items[j].id) {
            this.checkedItems.splice(k, 1);
            // foundEle.push(items[j].id);
          }
        }
      }
    }

    const tmp = this.listOfStructures;
    tmp.push({
      id: e.data.id,
      name: e.data.name,
      cdas: e.data.cdas
    });
    this.listOfStructures = tmp;
  }


  onFormSubmit(e) {
    const zone_id = [];
    for (let i = 0; i < this.checkedItems.length; i++) {
      zone_id.push(this.checkedItems[i].id);
    }
    const structure_id = [];
    for (let i = 0; i < this.choosingStructures.length; i++) {
      structure_id.push(this.choosingStructures[i].id);
    }

    if (structure_id.length) {
      const data = {
        email: this.user.email,
        name: this.user.name,
        password: this.user.password,
        role_id: this.user.role_id,
        structure_id: structure_id,
        zone_id: zone_id
      };
      this.userService.saveUser(data).subscribe(
        (response: any) => {
          NewComponent.notifyMe('utilisateur créé avec succès, Redirection.........', 'success');
          this.router.navigate([`/utilisateurs/liste`]);

        },
        (err) => {
          Object.keys(err.error.errors).forEach(
            (e: any) => {
              NewComponent.notifyMe(err.error.errors[e], 'error');
            });
        }
      );
    } else {
      NewComponent.notifyMe('veuillez attribuer une structure a ' + this.user.name, 'error');

    }


  }

  ngOnInit() {
    /**
     * get roles
     */
    this.userService.getRoles().subscribe(
      (response: any) => {
        this.listOfRoles = response.data;
      },
      (err) => {
        console.log(err);
      }
    );

    /**
     * get structures
     */
    this.userService.getStructures().subscribe(
      (response: any) => {
        this.listOfStructures = response.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
