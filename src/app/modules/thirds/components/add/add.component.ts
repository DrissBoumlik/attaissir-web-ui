import { Component, OnInit } from '@angular/core';
import { Third } from '../../../../shared/classes/third';
import { ToastrService } from 'ngx-toastr';
import { ThirdsService } from '../../services/thirds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  thirdType: string;
  goTo: string;
  helper: any;
  title: string;
  morale: boolean;
  isAggregated: boolean;

  constructor(
    private location: Location,
    public route: ActivatedRoute,
    public tier: Third,
    private router: Router,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.thirdType = this.helper.getThirdType(this.location.path());
    this.goTo = this.helper.getThirdLink(this.location.path());
    this.title = this.helper.getThirdTypeName(this.location.path());
    this.isAggregated = (this.thirdType === 'aggregated');
    this.morale = false;
    if (this.thirdType === 'young_promoter') {
      this.tier.type = 'legal';
      this.tier.morale = true;
      this.morale = true;
    }
  }

  /**
   * Submiting form data
   * @param e Event
   */
  onFormSubmit = function(e) {
    console.log(this.tier);
    this.tier.third_party_structure_types = this.thirdType;
    this.thirdsService.addThird(this.tier).subscribe(data => {
      console.log(data);
      data = this.helper.dataFormatter(data, false);
      this.toastr.success(
        `Nouveau ${this.title} ajouté avec succès.`);
      this.router.navigate([`/${this.goTo}/modifier/${data.id}`]);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
    e.preventDefault();
  };

}
