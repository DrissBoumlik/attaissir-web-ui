import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  checkItemSelected = false;

  family: any;

  public types = [
    {
      type_id: 1,
      type_name: 'Production vegetale',
      families: [
        {
          family_id: 1,
          family_name: 'Implantation des cultures',
          sub_families: [
            {
              sub_family_id: 1,
              sub_family_name: 'Plantation'
            },
            {
              sub_family_id: 2,
              sub_family_name: 'Semis'
            },
            {
              sub_family_id: 3,
              sub_family_name: 'Semis avec pluvérisation'
            }
          ],
        },
        {
          family_id: 2,
          family_name: 'Fertilisation',
          sub_families: [
            {
              sub_family_id: 5,
              sub_family_name: 'Plantation'
            },
            {
              sub_family_id: 7,
              sub_family_name: 'Semis'
            },
            {
              sub_family_id: 4,
              sub_family_name: 'Semis avec pluvérisation'
            }
          ],
        },
        {
          family_id: 3,
          family_name: 'Irrigation',
          sub_families: [
            {
              sub_family_id: 5,
              sub_family_name: 'Plantation'
            },
            {
              sub_family_id: 7,
              sub_family_name: 'Semis'
            },
            {
              sub_family_id: 4,
              sub_family_name: 'Semis avec pluvérisation'
            }
          ],
        },
      ]
    },
    {
      type_id: 2,
      type_name: 'Administration',
      families: [
        {
          family_id: 1,
          family_name: 'Implantation des cultures',
          sub_families: [
            {
              sub_family_id: 1,
              sub_family_name: 'Plantation'
            },
            {
              sub_family_id: 2,
              sub_family_name: 'Semis'
            },
            {
              sub_family_id: 3,
              sub_family_name: 'Semis avec pluvérisation'
            }
          ],
        },
        {
          family_id: 2,
          family_name: 'Fertilisation',
          sub_families: [
            {
              sub_family_id: 5,
              sub_family_name: 'Plantation'
            },
            {
              sub_family_id: 7,
              sub_family_name: 'Semis'
            },
            {
              sub_family_id: 4,
              sub_family_name: 'Semis avec pluvérisation'
            }
          ],
        }
      ]
    },
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  selectFamily(type_id: number, family_id: number) {
    this.family = this.types.find(type => {
      return type.type_id === type_id;
    }).families.find(family => {
      return family.family_id === family_id;
    });
    if (this.family) {
      this.checkItemSelected = true;
    }
  }

  selectSubFamily(id: number) {
    this.router.navigate(['/interventions/rechercher'], {queryParams: {type: 10}});
  }

  goBack() {
    this.checkItemSelected = false;
  }
}
