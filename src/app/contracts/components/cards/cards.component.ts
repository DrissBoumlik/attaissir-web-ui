import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardsService } from '../../services/cards.service';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: any;
  card: any;
  applyFilter: any;
  action: string;
  selectedItems: any[];

  constructor(private toastr: ToastrService,
    private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.getCards().subscribe(cards => {
      this.cards = this.cardsService.dataFormatter(cards, false);
      this.cards = this.cards.map(card => {
        card.full_name = `${card.first_name} ${card.last_name}`;
        return card;
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

  activateCards = (e) => {
    const cards = e.selectedItems.map(card => {
      return { id: card.id };
    });
    console.log(e.selectedItems);

  }

  selectAction = (e) => {
    this.action = e.value;
  }

  doAction = (e) => {
    console.log(this.action);
    console.log(this.selectedItems);
    const cards = this.selectedItems.map(card => {
      return Number(card.id);
    });
    this.cardsService.massCards(cards, this.action).subscribe(d => {
      console.log(d);
    }, err => {
      this.toastr.error(err.error.message);
    });
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
  gotoShow = (e) => { };

}
