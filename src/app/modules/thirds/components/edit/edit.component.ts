import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ThirdsService } from '../../services/thirds.service';
import { Third } from '../../../../shared/classes/third';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';
import { Warehouse } from '../../../../shared/classes/warehouse';
import { WarehouseService } from '../../../warehouse/service/warehose.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: number;
  helper: any;
  thirdType: string;
  goTo: string;
  thirdTypeName: string;
  displayWarehouse: boolean;
  warehouses: any;
  isEditWarehouse: boolean;
  isAggregated: boolean;

  constructor(public route: ActivatedRoute,
    private location: Location,
    public tier: Third,
    public warehouse: Warehouse,
    private warehouseService: WarehouseService,
    private router: Router,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) {
    this.helper = Helper;
    this.displayWarehouse = false;
    this.isEditWarehouse = false;
  }

  ngOnInit() {
    this.thirdTypeName = this.helper.getThirdTypeName(this.location.path());
    this.goTo = this.helper.getThirdLink(this.location.path());
    this.thirdType = this.helper.getThirdType(this.location.path());
    this.isAggregated = (this.thirdType === 'aggregated');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        console.log(this.id);
        this.thirdsService.getThird(this.id, this.thirdType, true)
          .subscribe(data => {
            this.tier = this.helper.dataFormatter(data, false);
            if (this.tier.company_name || this.tier.patent_number || this.tier.ice
              || this.tier.rc || this.tier.tva_code || this.tier.if) {
              this.tier.morale = true;
            }
            this.tier.zip_code = String(this.tier.zip_code);

            this.tier.patent_number = this.helper.makeNullable(this.tier.patent_number);
            this.tier.if = this.helper.makeNullable(this.tier.if);

            this.tier.rib = `${this.tier.bank_code}${this.tier.bank_account_number}${this.tier.bank_rib_key}`;
            this.warehouses = this.tier.warehouses;
          }, error1 => {
            this.toastr.warning('Utilisateur non trouvé.');
            this.location.back();
          });
      } else {
        this.toastr.warning('ID non fourni.');
        this.location.back();
      }
    });
  }

  /**
   * Submiting form data
   * @param e Event
   */
  onFormSubmit = (e) => {
    this.thirdsService.editThird(this.tier).subscribe(data => {
      this.toastr.success(
        `${this.tier.full_name.toUpperCase()} informations modifiées avec succès`
      );
      this.displayWarehouse = true;
      // this.router.navigate([`/${this.goTo}/afficher/${this.tier.id}`]);
    }, err => {
      throw err;
      // this.toastr.error(err.error.message);
    });

    e.preventDefault();
  }

  onFormSubmitWarehouse = (e) => {
    this.warehouse.third_party_id = this.tier.id;
    if (!this.warehouse.id) {
      this.warehouseService.addWarehouse(this.warehouse).subscribe(data => {
        this.toastr.success(
          `Nouveau magasin ajouté avec succès.`);
        this.warehouses.push(this.warehouse);
        this.warehouse = new Warehouse();
        // this.router.navigate(['/magasin']);
      }, err => {
        throw err;
        // this.toastr.error(err.error.message);
      });
    } else {
      this.warehouseService.editWarehouse(this.warehouse).subscribe(data => {
        this.toastr.success(
          `Magasin modifier avec succès.`);
        this.warehouses = this.warehouses.map((warehouse) => {
          if (warehouse.id === this.warehouse.id) {
            return this.warehouse;
          }
          return warehouse;
        });
        this.warehouse = new Warehouse();
        // this.router.navigate(['/magasin']);
      }, err => {
        throw err;
        // this.toastr.error(err.error.message);
      });
    }
    e.preventDefault();
  }

  onRemoveWarehouse(id: number): any {
    this.warehouseService.deleteWarehouse(id).subscribe(
      (res) => {
        this.toastr.success(`Magasin est supprimé avec succès.`);
      },
      (err) => {
        throw err;
      }
    );
  }

  selectWarehouse = (e) => {
    console.log(e.data);
    this.warehouse = e.data;
    this.isEditWarehouse = true;
  }
}
