import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Stock {
  warehouse: any;
  cda: string;
  article: string;
  category: string;
  sub_category: string;
  ql = 0;
  qts = 0;
  qte = 0;
  qra = 0;
  qrf = 0;
  qs = 0;
  qr = 0;
  dt: any;
  toOrder: 0;
  threshold = 10;

  warehouse_name?: string;
  category_name?: string;
  sub_category_name?: string;
  warehouse_zone_name?: string;
  warehouse_zone_type?: string;
  article_name?: string;
}
