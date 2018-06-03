import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ThirdsService } from '../../services/thirds.service';
import { Third } from '../../classes/third';
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
    public thirdsService: ThirdsService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.thirdsService.getThird(this.id)
          .subscribe(data => {
            this.tier = this.thirdsService.dataFormatter(data, false);
            if (this.tier.social_reason || this.tier.patent_number || this.tier.ice
              || this.tier.rc || this.tier.tva_code || this.tier.if) {
              this.tier.isCorporation = true;
            }
          }, error1 => {
            this.toastr.warning('User not found.');
            this.location.back();
          });
      } else {
        this.toastr.warning('ID not provided.');
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
        `${this.tier.first_name.toUpperCase()} ${this.tier.last_name.toUpperCase()} information's edited successfully`
      );
    }, err => {
      this.toastr.error(err.error.message);
    });


    e.preventDefault();
  };
}
