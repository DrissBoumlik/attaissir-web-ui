import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  order_articles: any[];
  buttonOptionsAdd: any;
  constructor() { }

  ngOnInit() {

    this.buttonOptionsAdd = {
      text:  '+',
      type: 'success',
      useSubmitBehavior: true
    };
  }

}
