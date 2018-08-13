import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlesService } from '../../services/articles.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  helper: any;
  articles: any;

  constructor(public router: Router,
    public toastr: ToastrService,
    public articleServices: ArticlesService) {
    this.helper = Helper;
    this.articles = {};
  }

  ngOnInit() {
    this.articles.store = new CustomStore({
      load: (loadOptions: any) => {
        loadOptions['requireTotalCount'] = true;
        return this.articleServices.getArticlesDx(loadOptions)
          .toPromise()
          .then(response => {
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

}
