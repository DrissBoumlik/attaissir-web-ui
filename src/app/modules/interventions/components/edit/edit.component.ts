import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionService } from '../../services/intervention.service';
import { NewComponent } from '../new/new.component';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  // ui Elements
  saveAsModelOptions: any;
  buttonsave: any;

  // informations generales
  generaleInformations = {
    cin: '',
    fullName: '',
    phone: '',
    parcelle: '',
    areaContracted: '',
    areaReal: '',
    areaLeft: '',
    areaToWork: '',
    predictedDate: '',
    proposition: '',
    centreDisribution: '',
  };
  // semences
  semences = [];
  // produits
  products = [];
  // Choix des préstations de service
  prestations = [];
  // Enregistrer comme modèle
  savedModel = {
    saved: false,
    text: '',
    visible: false
  };

  interventions = {
    generaleInformations: this.generaleInformations,
    semences: this.semences,
    products: this.products,
    savedModel: this.savedModel,
    prestations: this.prestations
  };

  intervention = {};

  constructor(
    private interventionService: InterventionService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  submitAction: Boolean = true;
  onFormSubmit = function(e) {
    this.submitAction = false;

    const formData = {
      template_name: (this.savedModel.saved ? this.savedModel.text : ''),
      is_visibleall: this.savedModel.visible
    };
    const routId = +this.route.snapshot.params['id'];
    this.interventionService.updateIntervention(routId, formData).subscribe(
      (value: any) => {
        this.submitAction = true;

        NewComponent.notifyMe('Votre de mande a été traitée avec succès, Redirection.........', 'success');
        this.router.navigate([`/interventions/liste`]);
      },
      (error: any) => {
        this.submitAction = true;
        NewComponent.notifyMe('Une erreur s\'est produite, veuillez réessayer dans quelques secondes.', 'error');
      }
    );


    e.preventDefault();
  };

  ngOnInit() {


    this.saveAsModelOptions = {
      onText: 'Oui',
      offText: 'Non',
      useSubmitBehavior: false,
      onValueChanged: () => {
        this.interventions.savedModel.saved = !this.interventions.savedModel.saved;
      }
    };

    const routParamsId = +this.route.snapshot.params['id'];
    this.interventionService.getInterventionById(routParamsId).subscribe(
      (response: any) => {
        if (response.data) {
          // Informations Générales
          this.interventions.generaleInformations.cin = response.data.third_party_infos.third_party_cin;
          this.interventions.generaleInformations.fullName = response.data.third_party_infos.third_party_name;
          this.interventions.generaleInformations.phone = response.data.third_party_infos.Telephone;
          this.interventions.generaleInformations.parcelle = response.data.third_party_infos.parcel;
          this.interventions.generaleInformations.areaContracted = response.data.third_party_infos.annuel_surface;
          this.interventions.generaleInformations.areaReal = response.data.third_party_infos.gps_surface;
          this.interventions.generaleInformations.areaLeft = response.data.third_party_infos.remaining_surface;
          this.interventions.generaleInformations.areaToWork = response.data.third_party_infos.surface_work;
          this.interventions.generaleInformations.centreDisribution = response.data.third_party_infos.warehouse;
          this.interventions.generaleInformations.predictedDate = response.data.third_party_infos.date;

          // Choix de la semence
          this.interventions.semences = response.data.articles.semences;

          // Choix des produits
          this.interventions.products = response.data.articles.product;

          // Choix des services
          this.interventions.prestations = response.data.articles.service;

          if (response.data.model_name) {
            // Enregistrer comme modèle
            console.log(response.data.model_name);
            this.interventions.savedModel.saved = true;
            this.interventions.savedModel.text = response.data.model_name;
            this.interventions.savedModel.visible = response.data.visible_to_all;
          }
        } else {
          this.router.navigate([`/404`]);
        }

      },
      err => {
        this.router.navigate([`/404`]);
      }
    );


  }
}
