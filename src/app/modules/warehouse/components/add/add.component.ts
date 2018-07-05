import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Third} from '../../../../shared/classes/third';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() magasin: Third;
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


  onFormSubmit = function(e) {
    /*
     this.thirdsService.addThird(this.tier).subscribe(data => {
       data = this.thirdsService.dataFormatter(data, false);
       this.toastr.success(
         `Nouveau agrégé ajouté avec succès.`);
       this.router.navigate(['/tiers/afficher/' + data.id]);
     }, err => {
       throw err;
       // this.toastr.error(err.error.message);
     });
     e.preventDefault();*/
  };

}
