import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import index from '@angular/cli/lib/cli';
import number_box from 'devextreme/ui/number_box';
import {NewComponent} from '../../../interventions/components/new/new.component';
import {Router} from '@angular/router';

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

  listeDesCdas = [
    {
      id: '1_16',
      text: 'CDA 1',
      items: [{
        id: '20',
        text: '20',
        price: 220
      }, {
        id: '2',
        text: '2',
        price: 270
      }]
    },
    {
      id: '2_16',
      text: 'CDA 2',
      items: [{
        id: '65',
        text: '65',
        price: 220
      }, {
        id: '78',
        text: '78',
        price: 270
      }]
    }
  ];
  checkedItems = [];

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


  popupVisible = true;

  showStructureZones(id: any) {

  }

// tree elements
  selectionChanged(e) {
    let value = e.node;

    console.log(e);

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
      name: e.itemData.name
    });

  }

  addCustomItem($event) {

  }

  removeItemFromChoosingStructures(e) {
    const tmp = this.listOfStructures;
    tmp.push({
      id: e.data.id,
      name: e.data.name
    });
    this.listOfStructures = tmp;
  }


  onFormSubmit(e) {
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
        structure_id: structure_id
      };

      this.userService.saveUser(data).subscribe(
        (response: any) => {
          NewComponent.notifyMe('utilisateur créé avec succès, Redirection.........', 'success');
          this.router.navigate([`/utilisateurs/list`]);

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
