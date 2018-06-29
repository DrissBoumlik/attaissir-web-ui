import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConseilleAgricoleService } from '../../../conseille-agricole/service/conseille-agricole.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  third = null;
  contract = null;
  magasin: any = null;

  constructor(private conseilleService: ConseilleAgricoleService,
    private router: Router,
    private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.magasin = this.conseilleService.getConseille(params.id);
        console.log(this.magasin);
        console.log(this.magasin.first_name);
        // console.log(this.conseilleService.getConseille(+params.id));
      });
  }

}
