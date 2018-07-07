import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MouvementsService} from '../../service/mouvements.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  mouvement: any;
  produits: any ;
  popupDeliverVisible = false;
  popupDeleteVisible = false;




  constructor( private router: Router, private route: ActivatedRoute , private mouvementsService: MouvementsService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.mouvement = this.mouvementsService.getMouvement(params.id).subscribe((response) => {
          this.mouvement = response.data;
          this.produits = response.data.order;
          console.log(response.data.order.articles);
        });
      });

  }

  delete() {
    this.mouvementsService.deleteMouvement(this.mouvement.id).subscribe((response) => {
      this.router.navigate(['/mouvements'])
      this.toastr.success('L \'élément a été supprimé.');
    });

  }

  deliver() {
    this.mouvementsService.deliverMouvement(this.mouvement.id).subscribe((response) => {
      this.router.navigate(['/mouvements'])
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
