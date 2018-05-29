import { Component, OnInit } from '@angular/core';
import { Third } from '../../classes/third';
import { ToastrService } from 'ngx-toastr';
import { ThirdsService } from '../../services/thirds.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    public tier: Third,
    public thirdsService: ThirdsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  /**
   * Submiting form data
   * @param e Event
   */
  onFormSubmit = function(e) {
    console.log('good');
    this.thirdsService.addThird(this.tier).subscribe(data => {
      this.tier = new Third();
      this.toastr.success(
        `New third party added successfully.`);
    }, err => {
      this.toastr.error(err);
    });
    e.preventDefault();
  };

}
