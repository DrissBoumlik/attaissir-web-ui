import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CardsService} from '../../services/cards.service';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: any;
  card: any;
  applyFilter: any;
  selectedItems: any[];

  constructor(private toastr: ToastrService,
              private cardsService: CardsService) { }

  ngOnInit() {
  }

  onStartEdit = (e) => {
    e.cancel = true;
    this.cardsService.deleteCard(e.data.id).subscribe(
      () => {
        this.toastr.success('Le compte bancaire a été supprimé avec succès.');
        e.cancel = false;

      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
  onRemoveThird = (e) => {
    console.log(e);
    this.cardsService.editCard(this.card).subscribe(
      () => {
        this.toastr.success('Le compte bancaire a été modifié avec succès.');
      },
      (err) => {
        e.cancel = false;
        this.toastr.error(err.error.message);
      }
    );
  };
  gotoShow = (e) => {};

}
