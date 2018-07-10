import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MouvementsService } from '../../service/mouvements.service';
import { ToastrService } from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  mouvement: any;
  order: any;
  popupDeliverVisible = false;
  popupDeleteVisible = false;
  helper: any;
  articles: any;
  to: any;
  from: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mouvementsService: MouvementsService,
              private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.mouvement = this.mouvementsService.getMouvement(params.id).subscribe((response) => {
          this.mouvement = response.data;
          this.order = response.data.order;
          this.from = response.data.from;
          this.to = response.data.to;
          this.articles = this.mouvement.order.articles;
          console.log(response.data.order);
        }, error1 => {
          throw error1;
        });
      });
  }

  delete() {
    this.mouvementsService.deleteMouvement(this.mouvement.id).subscribe((response) => {
      this.router.navigate(['/mouvements']),
      this.toastr.success('L \'élément a été supprimé.');
    });

  }

  deliver() {
    this.mouvementsService.deliverMouvement(this.mouvement.id).subscribe((response) => {
      this.router.navigate(['/mouvements']);
      this.toastr.success('L \'élément a été livré.');
    });
  }

  showDeliverPopup() {
    this.popupDeliverVisible = true;
  }

  showDeletePopup() {
    this.popupDeleteVisible = true;
  }

  cancelPopup() {
    this.popupDeleteVisible = false;
    this.popupDeliverVisible = false;
  }

}
