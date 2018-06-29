import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Third} from '../../classes/third';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  structures: any[];
  regions: any[];
  zones: any[];
  tiers: any[];
  magasin: any[];
  orderDetails: any;

  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() conseille: Third;
  @Input() isWizard?: boolean;
  @Input() validationGroup?: string;
  @Input() readOnly?: boolean;

  buttonOptions: any;
  constructor() { }

  ngOnInit() {

    this.buttonOptions = {
      text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
      type: 'success',
      useSubmitBehavior: true
    };
  }

}
