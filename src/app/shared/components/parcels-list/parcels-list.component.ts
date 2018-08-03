import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Helper } from '../../classes/helper';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parcels-list',
  templateUrl: './parcels-list.component.html',
  styleUrls: ['./parcels-list.component.scss']
})
export class ParcelsListComponent implements OnInit {
  @Input() data: any;
  @Output() onEditingStart: EventEmitter<any> = new EventEmitter();
  @Output() onRowRemoving: EventEmitter<any> = new EventEmitter();

  helper: any;

  constructor(private router: Router,
    private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
  }

}

