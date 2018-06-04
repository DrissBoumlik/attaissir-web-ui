import { Component, OnInit } from '@angular/core';
import { Contract } from '../../classes/contract';
import { Third } from '../../../thirds/classes/third';
import { Structure } from '../../classes/structure';
import { Location } from '@angular/common';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  groundsList?: any[];
  campaigns?: any[];
  id: number;

  constructor(
    public contract: Contract,
    public currentThird: Third,
    public structure: Structure,
    public route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.groundsList = [];
    this.campaigns = [];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        // e
      } else {
        this.toastr.warning('ID not provided.');
        this.location.back();
      }
    });
  }
}
