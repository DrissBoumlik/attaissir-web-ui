import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Article {
  id?: number;
  unit: number;
  code: number;
  price: number;
  dose: string; // measure
  technical_caracteristics?: string;
  type: string; // ['product', 'service']
  article_group: string;
  article_category_id?: number;
}
