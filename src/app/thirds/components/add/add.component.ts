import { Component, OnInit } from '@angular/core';
import { Third } from '../../../classes/third';
import { ToastrService } from 'ngx-toastr';
import { ThirdsService } from '../../services/thirds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    public tier: Third,
    private router: Router,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  /**
   * Submiting form data
   * @param e Event
   */
  onFormSubmit = function(e) {
    console.log(this.tier);
    this.thirdsService.addThird(this.tier).subscribe(data => {
      data = this.thirdsService.dataFormatter(data, false);
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
      this.router.navigate(['/tiers/afficher/' + data.id]);
    }, err => {
      throw err;
      // this.toastr.error(err.error.message);
    });
    e.preventDefault();
  };

}
