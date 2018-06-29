import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  employee: any;
  positions: string[];
  states: string[];
  buttonOptions: any;

  constructor() {

  }

  ngOnInit() {

    this.buttonOptions = {
      text: 'Ajouter',
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
