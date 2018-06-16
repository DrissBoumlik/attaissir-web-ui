import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ThirdsService } from '../../services/thirds.service';
import { Third } from '../../../classes/third';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: number;

  constructor(public route: ActivatedRoute,
    private location: Location,
    public tier: Third,
    private router: Router,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        console.log(this.id);
        this.thirdsService.getThird(this.id, true)
          .subscribe(data => {
            console.log(data);
            this.tier = this.thirdsService.dataFormatter(data, false);
            if (this.tier.company_name || this.tier.patent_number || this.tier.ice
              || this.tier.rc || this.tier.tva_code || this.tier.if) {
              this.tier.morale = true;
            }
            console.log(this.tier);
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
        `${this.tier.first_name.toUpperCase()} ${this.tier.last_name.toUpperCase()} informations modifiées avec succès`
      );
      this.router.navigate([`/tiers/afficher/${this.tier.id}`]);
    }, err => {
      throw err;
      // this.toastr.error(err.error.message);
    });


    e.preventDefault();
  };
}
