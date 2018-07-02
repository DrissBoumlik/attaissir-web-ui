import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Article {
  id?: number;
  name: string;
  unit: number;
  code: number;
  price: number;
  article_category: any;
  dose: string; // measure
  technical_caracteristics?: string;
  type: string; // ['product', 'service']
  article_group: string;
  article_category_id?: number;
}
