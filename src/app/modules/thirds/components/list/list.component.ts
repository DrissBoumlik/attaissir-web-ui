import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdsService } from '../../services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import { Location } from '@angular/common';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  third_parties: any;
  third_parties_count: number;
  tiers: any;
  applyFilter: any = 'auto';
  selectedItems: any[] = [];
  columns: Array<string>;
  entities: Array<object> = [];
  types: Array<object> = [];
  helper: any;
  title: string;
  thirdType: string;
  goTo: string;

  constructor(public tierService: ThirdsService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.third_parties = {};
    this.third_parties_count = 0;
    this.helper = Helper;
  }

  getGender = (data) => {
    if (!data.sexe) {
      return '';
    }
    return (data.sexe === 'Masculin') ? 'fa-male' : 'fa-female';
  };


  ngOnInit() {



    this.title = this.helper.getThirdTypeName(this.location.path());
    this.goTo = this.helper.getThirdLink(this.location.path());
    this.thirdType = this.helper.getThirdType(this.location.path());
    this.third_parties.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.tierService.getThirdsDx(this.thirdType, loadOptions)
          .toPromise()
          .then(response => {
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  /**
   * Rename props name in a object
   * @param {Object} ob
   * @param {string} name
   * @param {string} newName
   * @returns {object}
   */
  renameObj(ob: Object, name: string, newName: string): object {
    const tmp: string = ob[name];
    delete ob[name];
    ob[newName] = tmp;
    return ob;
  }

  selectionChanged(data: any) {
    this.selectedItems = data.selectedRowsData;
  }

  deleteRecords() {
    this.selectedItems.forEach((item) => {
      this.tiers.remove(item);
    });
  }

  /**
   * Delete a third and update the list
   * @param {number} thirdId
   */
  onRemoveThird(thirdId: number): any {
    this.tierService.deleteThird(thirdId).subscribe(
      (res) => {
        this.toastr.success(`Nouveau ${this.title} ajouté avec succès.`);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  /**
   * Redirect to the editing page
   * @param {number} thirdId
   */
  onStartEdit(thirdId: number) {
    this.router.navigate([`/${this.goTo}/modifier/${thirdId}`]).catch(
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
