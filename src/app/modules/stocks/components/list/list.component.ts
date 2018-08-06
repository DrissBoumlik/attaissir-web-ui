import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../../shared/classes/stock';
import { StockService } from '../../services/stock.service';
import { ActivatedRoute } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { WarehouseService } from '../../../distribution-center/services/warehouse.service';
import { isArray } from 'util';
import { Helper } from '../../../../shared/classes/helper';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  stock: any = {};
  helper: any;
  queryParams = '';

  constructor(private stockService: StockService,
    private route: ActivatedRoute,
    private warhouseService: WarehouseService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.magasin) {
          this.queryParams = '?magasin=' + params.magasin;
        } else if (params.article) {
          this.queryParams = '?article=' + params.article;
        }
        this.stock.store = new CustomStore({
          load: (loadOptions: any) => {
            if (params.magasin) {
              Helper.addFilter(loadOptions, 'warehouse_id', params.magasin);
            }
            return this.stockService.getStockSituationDx(loadOptions, this.queryParams)
              .toPromise()
              .then((stk: any) => {
                return {
                  data: stk.data.map((war: any) => {
                    const row = new Stock();
                    row.ql = war.ql;
                    row.qts = war.qts;
                    row.qte = war.qte;
                    row.qra = war.qra;
                    row.qrf = war.qrf;
                    row.qs = war.qs;
                    row.qr = war.qr;
                    row.warehouse_name = war.warehouse_name;
                    row.category_name = war.category_name;
                    row.sub_category_name = war.sub_category_name;
                    row.warehouse_zone_name = war.warehouse_zone_name;
                    row.article_name = war.article_name;
                    row.threshold = war.threshold ? war.threshold : 'pas de données';
                    return row;
                  }),
                  totalCount: stk.totalCount
                };
              })
              .catch(err => {
                throw err;
              });
          }
        });
      },
      (err: any) => {
        throw err;
      });
  }

}
