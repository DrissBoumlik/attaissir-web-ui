import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from '../../../../shared/classes/stock';
import CustomStore from 'devextreme/data/custom_store';
import {StockService} from '../../services/stock.service';
import {ActivatedRoute} from '@angular/router';
import {WarehouseService} from '../../../distribution-center/services/warehouse.service';
import {DxDataGridComponent} from 'devextreme-angular';


@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.scss']
})
export class ReplenishmentComponent implements OnInit {

  stock: any = {};
  selectedItems: any;
  toOrder: any;
  queryParams = '';

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private warhouseService: WarehouseService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.magasin || params.article) {
          this.queryParams = params.toString().includes('magasin') ? '?magasin=' + params.magasin : '?article=' + params.article;
        }
        this.stock.store = new CustomStore({
          load: (loadOptions: any) => {
            return this.stockService.getStockSituationDx(loadOptions, this.queryParams)
              .toPromise()
              .then((stk: any) => {
                return {
                  data: stk.data.map((war: any) => {
                    console.log(war);
                    const row = new Stock();
                    row.warehouse = war.warehouse_name;
                    row.category = war.category_name;
                    row.sub_category = war.sub_category_name;
                    row.cda = war.warehouse_zone_name;
                    row.article = war.article_name;
                    row.threshold = war.threshold;
                    row.qr = war.qr;
                    row.dt = {warehouse_id: war.warehouse_id, article_id: war.article_id};
                    row.toOrder = 0;
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


  replenishStock() {
    console.log(this.dataGrid.instance.getSelectedRowsData());

  }

  valuechange(e: any, data: any, value: any): void {
    console.log(data);
    console.log('+++++++++++' + value);

    this.dataGrid.instance.cellValue(data.rowIndex, data.column.dataField, value);

    this.dataGrid.instance.saveEditData();

    console.log(this.dataGrid.instance.getSelectedRowsData());
  }

}
