import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ThirdsService } from '../../services/thirds.service';
import { Third } from '../../../../shared/classes/third';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';


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

  constructor(public route: ActivatedRoute,
    private location: Location,
    public tier: Third,
    private router: Router,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.goTo = this.helper.getThirdLink(this.location.path());
    this.thirdType = this.helper.getThirdType(this.location.path());
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        console.log(this.id);
        this.thirdsService.getThird(this.id, this.thirdType, true)
          .subscribe(data => {
            console.log(data);
            this.tier = this.helper.dataFormatter(data, false);
            if (this.tier.company_name || this.tier.patent_number || this.tier.ice
              || this.tier.rc || this.tier.tva_code || this.tier.if) {
              this.tier.morale = true;
            }
            this.tier.zip_code = String(this.tier.zip_code);
            this.tier.rib = `${this.tier.bank_account_number}${this.tier.bank_code}${this.tier.bank_rib_key}`;
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
  onFormSubmit = function(e) {
    this.thirdsService.editThird(this.tier).subscribe(data => {
      this.toastr.success(
        `${this.tier.full_name.toUpperCase()} informations modifiées avec succès`
      );
      this.router.navigate([`/${this.goTo}/afficher/${this.tier.id}`]);
    }, err => {
      throw err;
      // this.toastr.error(err.error.message);
    });

    e.preventDefault();
  };
}
