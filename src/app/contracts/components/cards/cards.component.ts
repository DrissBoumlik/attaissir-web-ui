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
    this.cardsService.getCards().subscribe( cards => {
      this.cards = this.cardsService.dataFormatter(cards, false);
      this.cards = this.cards.map( card => {
        return {
          id: card.id,
          status: (card.active === 'actif') ? 'Oui' : 'Non',
          full_name: `kkk kkkkk`,
          cin: 'az1254',
          serail: 'aaaaaazzeee',
          printed: 'oui',
          printed_at: '12/12/2018'
        };
      });
      },
      (err) => {
        this.toastr.error(err.error.message);
      });
  }

  onStartEdit = (e) => {
    this.cardsService.editCard(e.data).subscribe(
      () => {
        this.toastr.success('Le compte bancaire a été modifié avec succès.');
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
  onRemoveThird = (e) => {
    console.log(e);
    this.cardsService.deleteCard(e).subscribe(
      () => {
        this.toastr.success('Le compte bancaire a été supprimé avec succès.');
      },
      (err) => {
        e.cancel = false;
        this.toastr.error(err.error.message);
      }
    );
  }
  gotoShow = (e) => {};

}
