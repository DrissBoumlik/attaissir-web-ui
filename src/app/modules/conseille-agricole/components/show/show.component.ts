import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ConseilleAgricoleService } from '../../service/conseille-agricole.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  third = null;
  contract = null;
  conseille: any = null;

  constructor(private conseilleService: ConseilleAgricoleService,
    private router: Router,
    private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.conseille = this.conseilleService.getConseille(params.id);
        console.log(this.conseille);
        console.log(this.conseille.first_name);
        // console.log(this.conseilleService.getConseille(+params.id));
      });
  }

}
