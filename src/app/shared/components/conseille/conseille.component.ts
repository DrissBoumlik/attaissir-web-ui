import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Third } from '../../classes/third';

@Component({
    selector: 'app-conseille-form',
    templateUrl: './conseille.component.html',
    styleUrls: ['./conseille.component.scss']
})
export class ConseilleComponent implements OnInit {


    @Output() submit: EventEmitter<any> = new EventEmitter();


    @Input() isEdit: boolean;
    @Input() id?: number;
    @Input() conseille: Third;
    @Input() isWizard?: boolean;
    @Input() validationGroup?: string;
    @Input() readOnly?: boolean;

    buttonOptions: any;

    ngOnInit() {

        this.buttonOptions = {
            text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
            type: 'success',
            useSubmitBehavior: true
        };
    }

}
