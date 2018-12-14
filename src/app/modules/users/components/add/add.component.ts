import { UsersService } from '../../services/users.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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



  popupRfidVisible = false;
  rf_code = null;

  @ViewChild('rfid') rfid: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;
  @ViewChild('popup') popup: ElementRef;


  loadingVisible: Boolean = false;
  constructor(
    private userService: UsersService,
    private router: Router
  ) {
    this.user.rfid = null;
  }

  roleSelectOptions: any;
  checkedItems = [];
  listeDesCdas = [];
  currentStructurIdInPopUp: any;
  roleIsCentreDistribution = false;
  rowIndex: number;

  roleOptions: any;
  user: any = {};
  magasin: any = {};
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


  // tree elements
  selectionChanged(e) {

    const value = e.node;
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

  addCustomItem($event) {

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


  // onFormSubmitOrginal(e) {
  //   const zone_id = [];
  //   for (let i = 0; i < this.checkedItems.length; i++) {
  //     zone_id.push(this.checkedItems[i].id);
  //   }
  //   const structure_id = [];
  //   for (let i = 0; i < this.choosingStructures.length; i++) {
  //     structure_id.push(this.choosingStructures[i].id);
  //   }
  //
  //   if (structure_id.length) {
  //     const data = {
  //       email: this.user.email,
  //       name: this.user.name,
  //       password: this.user.password,
  //       role_id: this.user.role_id,
  //       structure_id: structure_id ,
  //       zone_id: zone_id
  //     };
  //     this.userService.saveUser(data).subscribe(
  //       (response: any) => {
  //         NewComponent.notifyMe('utilisateur créé avec succès, Redirection.........', 'success');
  //         this.router.navigate([`/utilisateurs/liste`]);
  //
  //       },
  //       (err) => {
  //         Object.keys(err.error.errors).forEach(
  //           (e: any) => {
  //             NewComponent.notifyMe(err.error.errors[e], 'error');
  //           });
  //       }
  //     );
  //   } else {
  //     NewComponent.notifyMe('veuillez attribuer une structure a ' + this.user.name, 'error');
  //
  //   }
  //
  //
  // }


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
        password: this.user.password,
        role_id: this.user.role_id,
        rfid: this.user.rfid,
        structure_id: structure_id,
        zone_id: this.getCheckedZones(),
        warehouse_id: warehouse_id
      };
      this.loadingVisible = true;
      this.userService.saveUser(data).subscribe(
        (response: any) => {
          NewComponent.notifyMe('utilisateur créé avec succès, Redirection.........', 'success');
          this.router.navigate([`/utilisateurs/liste`]);
          this.loadingVisible = false;
        },
        (err) => {
          Object.keys(err.error.errors).forEach(
            (e: any) => {
              NewComponent.notifyMe(err.error.errors[e], 'error');
            });
          this.loadingVisible = false;
        }
      );
    } else {
      for (let i = 0; i < formErrors.length; i++) {
        NewComponent.notifyMe(formErrors[i], 'error');
      }

    }
  }

  ngOnInit() {
    /**
     * get roles
     */

    this.user.password = null;
    this.user.email = null;




    this.userService.getRoles().subscribe(
      (response: any) => {

        this.user.password = null;
        this.user.email = null;

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
     * get structures
     */
    this.userService.getStructures().subscribe(
      (response: any) => {
        this.listOfStructures = response.data;
        for (let i = 0; i < this.listOfStructures.length; i++) {
          this.listOfStructures[i].isSelected = false;

        }
      },
      (err) => {
        console.log(err);
      }
    );
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


          this.user.rfid = this.rf_code;
          // this.preconisations = {};
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
    this.popupRfidVisible = true;
  }


  doSomething(event) {
    if (this.popupRfidVisible) {
      this.rf_code = event.value;
    }
  }





}
