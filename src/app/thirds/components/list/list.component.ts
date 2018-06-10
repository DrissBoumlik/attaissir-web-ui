import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdsService } from '../../services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';

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

  constructor(public tierService: ThirdsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.third_parties = {};
    this.third_parties_count = 0;
  }

  getGender = (data) => {
    return (data.gender === 'm') ? 'fa-male' : 'fa-female';
  }

  ngOnInit() {
    this.third_parties.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.tierService.getThirdsDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });
    /*
    this.tierService.getThirds().subscribe(third_parties => {
      this.third_parties = this.tiers = this.tierService.dataFormatter(third_parties, false);
      this.third_parties = this.third_parties.map(val => {
        delete val.civility;
        delete val.code_siam;
        delete val.types;

        val = this.renameObj(val, 'rc', 'Business register');
        val = this.renameObj(val, 'if', 'Tax identification');
        return val;
      });
      this.third_parties_count = this.third_parties.length;
    });*/
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

  gotoShow(idContract: number) {
    this.router.navigate([`/tiers/afficher/${idContract}`]).catch(
      err => {
        this.toastr.error(err.error.message);
      }
    );
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
        this.toastr.success('Nouveau agrégé ajouté avec succès.');
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
    this.router.navigate([`/tiers/modifier/${thirdId}`]).catch(
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
