import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../shared/classes/article';
import { Helper } from '../../../../shared/classes/helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
    article: Article;
    helper: any;

    constructor(public router: Router,
        private route: ActivatedRoute,
        private articleservice: ArticlesService) {
        this.helper = Helper;
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.articleservice.getArticle(+params.id).subscribe(
                    (res: any) => {
                        this.article = this.helper.dataFormatter(res, false);
                        console.log(this.article);
                    },
                    (error) => {
                        this.router.navigate(['/404']).catch(
                            err => {
                            }
                        );
                    }
                );
            }
        );
    }

}
