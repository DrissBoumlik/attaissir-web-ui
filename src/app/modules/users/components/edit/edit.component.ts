import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NewComponent} from '../../../interventions/components/new/new.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  user: any = {};
  userRole: number;
  listOfRoles = [];
  listOfStructures = [];
  choosingStructures = [];
  checkedItems = [];
  popupVisible = false;
  listeDesCdas = [];
  currentStructurIdInPopUp: any;
  userId: any;

  rowIndex: number;

  private paramsSubscription: Subscription;
  private httpSubscription: Subscription;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
        for (let i = 0; i < this.listOfStructures.length; i++) {
          this.listOfStructures[i].isSelected = true;

        }
      },
      (err) => {
        console.log(err);
      }
    );

    /**
     * get user info
     */
    this.paramsSubscription = this.route.params.subscribe(
      params => {
        this.httpSubscription = this.userService.getUser(params.id).subscribe(
          (response: any) => {
            this.userId = response.data.id;
            this.user.email = response.data.email;
            this.user.name = response.data.name;
            this.userRole = response.data.role[0];

            // set choosing structures
            this.setChoosingStructures(response.data.structures);

            // set checked zones
            this.setcheckedZones(response.data.zones);

          },
          (err) => {
            this.router.navigate(['/404']);
          }
        );
      },
      (error) => {
        this.router.navigate(['/404']).catch(
          err => {
          }
        );
      });
  }


  // tree elements
  selectionChanged(e) {
    const value = e.node;
    if (this.isProduct(value)) {
      this.processProduct({
        id: value.key,
        text: value.text,
        itemData: value.itemData,
        selected: value.selected,
      });
    } else {
      value.items.forEach((product, index) => {
        this.processProduct({
          id: product.key,
          text: product.text,
          itemData: product.itemData,
          selected: product.selected,
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

  showStructureZones(data: any) {
    this.rowIndex = data.rowIndex;
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

  setcheckedZones(zones: any[]) {
    const tempZones = zones;
    for (let i = 0; i < tempZones.length; i++) {
      for (let j = 0; j < this.choosingStructures.length; j++) {
        const tempStructure = this.choosingStructures[j];
        for (let k = 0; k < tempStructure.cdas.length; k++) {
          const tempCda = tempStructure.cdas[k];
          for (let l = 0; l < tempCda.items.length; l++) {
            const item = tempCda.items[l];
            if (tempZones[i] === item.id) {
              this.choosingStructures[j].cdas[k].items[l].isSelected = true;
            }
          }
        }
      }
    }
  }

  getCheckedZones() {
    const tempZones = [];
    for (let j = 0; j < this.choosingStructures.length; j++) {
      const tempStructure = this.choosingStructures[j];
      for (let k = 0; k < tempStructure.cdas.length; k++) {
        const tempCda = tempStructure.cdas[k];
        for (let l = 0; l < tempCda.items.length; l++) {
          const item = tempCda.items[l];
          if (item.isSelected) {
            tempZones.push(item.id);
          }
        }
      }
    }
    return tempZones;
  }

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

  setChoosingStructures(structures: any[]) {
    for (let i = 0; i < structures.length; i++) {
      let userStructure = {};
      userStructure = this.listOfStructures.find((element) => {
        return element.id === '' + structures[i];
      });
      if (userStructure) {
        this.choosingStructures.push(userStructure);
      }
    }

    for (let i = 0; i < structures.length; i++) {
      this.listOfStructures = this.listOfStructures.filter(
        s => {
          return s.id !== '' + structures[i];
        }
      );
    }
  }

  removeItemFromChoosingStructures(e) {
    const tempData = [];
    const foundEle = [];
    // if (e.data.cdas) {
    //   for (let i = 0; i < e.data.cdas.length; i++) {
    //     const items = e.data.cdas[i].items;
    //     for (let j = 0; j < items.length; j++) {
    //       for (let k = 0; k < this.checkedItems.length; k++) {
    //         if (this.checkedItems[k].id === items[j].id) {
    //           this.checkedItems.splice(k, 1);
    //           // foundEle.push(items[j].id);
    //         }
    //       }
    //     }
    //   }
    // }
    const tmp = this.listOfStructures;
    let itemToRmove = e.data;
    itemToRmove.isSelected = false;
    for (let i = 0; i < itemToRmove.cdas.length; i++) {
      itemToRmove.cdas[i].isSelected = false;
      for (let j = 0; j < itemToRmove.cdas[i].items.length; j++) {
        itemToRmove.cdas[i].items[j].isSelected = false;
      }

    }


    tmp.push({
      id: itemToRmove.id,
      name: itemToRmove.name,
      cdas: itemToRmove.cdas
    });
    this.listOfStructures = tmp;
  }

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

  onFormSubmit(e) {
    e.preventDefault();
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
        zone_id: this.getCheckedZones()
      };
      this.userService.editUser(data, this.userId).subscribe(
        (response: any) => {
          NewComponent.notifyMe('utilisateur modifie avec succès, Redirection.........', 'success');
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

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
  }


}
