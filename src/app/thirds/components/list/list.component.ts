import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdsService } from '../../services/thirds.service';
import { ToastrService } from 'ngx-toastr';

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
    private toaster: ToastrService) {

    this.third_parties_count = 0;
  }

  ngOnInit() {
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
        this.toaster.success('User deleted successfully');
      },
      (err) => {
        this.toaster.error(err);
      }
    );
  }

  /**
   * Redirect to the editing page
   * @param {number} thirdId
   */
  onStartEdit(thirdId: number) {
    this.router.navigate(['../edit/' + thirdId], { relativeTo: this.route }).catch(
      err => {
        this.toaster.error(err);
      }
    );
  }
}
