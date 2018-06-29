import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {ConseilleAgricoleService} from '../../service/conseille-agricole.service';
import {ConseilleAgricole} from '../../../../shared/classes/conseille-agricole';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  third_parties: any;
  third_parties_count: number;
  tiers: any;
  applyFilter: any = 'auto';
  selectedItems: any[] = [];
  columns: Array<string>;
  entities: Array<object> = [];
  types: Array<object> = [];
  order_articles: any[];

  co: any[];



  conseille: ConseilleAgricole[];

  constructor(private conseilleService: ConseilleAgricoleService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    this.third_parties = {};
    this.third_parties_count = 0;

  }



  ngOnInit() {
    this.co = this.conseilleService.getThirds();
  }

  /**
   * Delete a third and update the list
   * @param {number} thirdId
   */
  onRemoveThird(e: any): any {

    console.log(e);
  }


  onEdit(e: any) {
    console.log(e);
    this.router.navigate(['/conseille-agricole/modifier/' + e.data.id]);
  }

  gotoShow(id: any) {
    console.log(id);
    this.router.navigate(['/conseille-agricole/afficher/' + id.data.id] );
  }
}
