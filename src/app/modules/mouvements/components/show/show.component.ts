import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MouvementsService} from '../../service/mouvements.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  mouvement: any;
  produits: any ;


  constructor( private router: Router, private route: ActivatedRoute , private mouvementsService: MouvementsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.mouvement = this.mouvementsService.getMouvement(params.id);
      });

  }


}
