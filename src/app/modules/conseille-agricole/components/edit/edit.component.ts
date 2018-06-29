import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConseilleAgricoleService } from '../../service/conseille-agricole.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  conseille: any;

  constructor(private conseilleService: ConseilleAgricoleService,
    private router: Router,
    private route: ActivatedRoute) {

  }


  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.conseille = this.conseilleService.getConseille(params.id);
        console.log(this.conseille);
        // console.log(this.conseilleService.getConseille(+params.id));
      });
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
