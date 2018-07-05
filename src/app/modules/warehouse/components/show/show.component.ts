import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  third = null;
  contract = null;
  magasin: any = null;

  constructor(
              private router: Router,
              private route: ActivatedRoute) {

  }


  ngOnInit() {


  }

}
