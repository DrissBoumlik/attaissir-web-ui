import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  stock_operation: any;
  stockData: any;
  products: any;
  typeOptions: any;
  emetteurOptions: any;
  interventionRequestOptions: any;
  recepteurOptions: any;
  familleOptions: any;
  subFamilleOptions: any;
  articleOptions: any;
  addProduct: any;
  buttonOptions: any;

  constructor() { }

  ngOnInit() {
    this.addProduct = {
      text: 'AJOUTER',
      type: 'success',
      useSubmitBehavior: false,
      click: () => {
        console.log(this.stock_operation);
      }
    };
    this.buttonOptions = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true
    };
  }

}
