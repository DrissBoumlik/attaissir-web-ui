import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewComponent } from '../../../interventions/components/new/new.component';
import { Subscription } from 'rxjs';
import { valid } from 'semver';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  user: any = {};
  magasin: any = {};
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

  roleSelectOptions: any;
  tempSelectValue = 4;
  roleIsCentreDistribution = false;
  private paramsSubscription: Subscription;
  private httpSubscription: Subscription;


  popupRfidVisible = false;
  rf_code = null;

  @ViewChild('rfid') rfid: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;
  @ViewChild('popup') popup: ElementRef;

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
        this.roleSelectOptions = {
          items: this.listOfRoles,
          displayExpr: 'description',
          valueExpr: 'id',
          onSelectionChanged: (event) => {
            if (event.selectedItem.description === 'Centre distribution') {
              this.roleIsCentreDistribution = true;
              this.listOfStructures = this.listOfStructures.concat(this.choosingStructures);
              this.choosingStructures = [];
            } else {
              this.roleIsCentreDistribution = false;
            }
          }
        };
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
            this.user.rfid = response.data.rfid;
            this.user.name = response.data.name;
            this.userRole = response.data.role[0];
            this.user.role_id = response.data.role[0];
            if (response.data.role[0] === 'cd') {
              this.roleIsCentreDistribution = true;
              this.magasin = {
                warehouses_id: response.data.warehouse_id
              };

              this.tempSelectValue = response.data.warehouse_id;
            }

            /**
             * get structures
             */


            this.userService.getStructures().subscribe(
              (res: any) => {

                this.listOfStructures = res.data;
                for (let i = 0; i < this.listOfStructures.length; i++) {
                  this.listOfStructures[i].isSelected = true;

                }

                // set choosing structures
                this.setChoosingStructures(response.data.structures);

                // set checked zones
                this.setcheckedZones(response.data.zones);

              },
              (error) => {
                console.log(error);
              }
            );




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

        this.choosingStructures[i].cdas.forEach((it) => {
          it.Tree_id = Math.floor((Math.random() * 10008800) + 1);
        });

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
        console.log(tempCda);
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
    this.magasin = {};

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
    this.magasin = {};

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
    const itemToRmove = e.data;
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
      cdas: itemToRmove.cdas,
      warehouses: itemToRmove.warehouses
    });
    this.listOfStructures = tmp;
  }


  addToChoosingStructures(e) {
    this.magasin = {};
    if (this.roleIsCentreDistribution) {
      this.listOfStructures = this.listOfStructures.concat(this.choosingStructures);
      this.listOfStructures = this.listOfStructures.filter(
        s => {
          return s.id !== e.itemData.id;
        }
      );
      this.choosingStructures = [];
      this.choosingStructures.push({
        id: e.itemData.id,
        name: e.itemData.name,
        cdas: e.itemData.cdas,
        warehouses: e.itemData.warehouses
      });
    } else {
      this.listOfStructures = this.listOfStructures.filter(
        s => {
          return s.id !== e.itemData.id;
        }
      );

      this.choosingStructures.push({
        id: e.itemData.id,
        name: e.itemData.name,
        cdas: e.itemData.cdas,
        warehouses: e.itemData.warehouses
      });
    }


  }

  onFormSubmit(e) {
    e.preventDefault();
    const structure_id = [];
    for (let i = 0; i < this.choosingStructures.length; i++) {
      structure_id.push(this.choosingStructures[i].id);
    }

    const formErrors = [];

    if (!structure_id.length) {
      formErrors.push('veuillez attribuer une structure a ' + this.user.name);
    }

    if (this.roleIsCentreDistribution) {
      if (!this.magasin.warehouses_id) {
        formErrors.push('veuillez attribuer un magasin a ' + this.user.name);
      }
    }


    if (!formErrors.length) {
      const warehouse_id = (this.roleIsCentreDistribution ? this.magasin.warehouses_id : '');
      const data = {
        email: this.user.email,
        name: this.user.name,
        rfid: this.user.rfid,
        password: this.user._password,
        role_id: this.user.role_id,
        structure_id: structure_id,
        zone_id: this.getCheckedZones(),
        warehouse_id: warehouse_id
      };
      console.log(data);
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
      for (let i = 0; i < formErrors.length; i++) {
        NewComponent.notifyMe(formErrors[i], 'error');
      }

    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
  }






  SearchByRfid() {

    this.rf_code = '';

    this.popup.nativeElement.addEventListener('click', () => {
      this.rfid.nativeElement.focus();
    });

    this.rfid.nativeElement.focus();

    this.rfid.nativeElement.addEventListener('input', () => {

      setTimeout(() => {

        this.rf_code = this.rfid.nativeElement.value;
        this.rfid.nativeElement.value = '';
        this.focusout.nativeElement.focus();


        if (this.rf_code != '') {

          this.rf_code = this.rf_code.replace(/à/g, "0");
          this.rf_code = this.rf_code.replace(/&/g, "1");
          this.rf_code = this.rf_code.replace(/é/g, "2");
          this.rf_code = this.rf_code.replace('"', "3");
          this.rf_code = this.rf_code.replace("'", "4");
          this.rf_code = this.rf_code.replace("(", "5");
          this.rf_code = this.rf_code.replace("-", "6");
          this.rf_code = this.rf_code.replace(/è/g, "7");
          this.rf_code = this.rf_code.replace("_", "8");
          this.rf_code = this.rf_code.replace(/ç/g, "9");

          console.log(this.rf_code);

          this.user.rfid = this.rf_code;
          //this.preconisations = {};
          /*
          let  code =  this.rf_code;
                 this.preconisations.store = new CustomStore({
                load: (loadOptions: any) => {
                  loadOptions.rfid  = code;
                  return this.preconisationsIntrantsService.getListeAvancesDx(loadOptions)
                    .toPromise()
                    .then(response => {
          
                      return response;
                    })
                    .catch(error => {
                      throw error;
                    });
                }
              });
          */

        }


        this.popupRfidVisible = false;

      }, 1000);

    });

  }



  Scan() {
    console.log('ok');
    this.popupRfidVisible = true;
  }


  doSomething(event) {
    if (this.popupRfidVisible) {
      this.rf_code = event.value;
    }
  }


}
