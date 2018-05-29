import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Contract} from '../classes/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(public http: HttpClient) { }

  /**
   * Get a collection of Contracts
   * @returns {Observable<Contract[]>}
   */
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.apiUrl}/${this.fake}`);
  }

  /**
   * Get a Contracts
   * @param id
   * @returns {Observable<Contract[]>}
   */
  getContract(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.apiUrl}/${this.fake}/${id}`);
  }

  /**
   * Add a contracts
   * @param contract
   * @returns {Observable<Contract[]>}
   */
  addContract(contract: Contract): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${environment.apiUrl}/${this.fake}`, JSON.stringify(Contract), this.options);
  }

  /**
   * Edit a contracts
   * @param contract
   * @returns {Observable<Contract>}
   */
  editContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.apiUrl}/${this.fake}/${Contract.id}`, JSON.stringify(Contract), this.options);
  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.fake}/${id}`, this.options);
  }

  /**
   *
   * @returns {any}
   */
  getAllContracts(): any {
    //
    // return this.http.get(`${environment.apiUrl}/contracts`);
    const contrat = new Contract();
    contrat.id = 1;
    contrat.tiers = {
      id: 1,
      types: {
        id: '1',
        label: 'fournisseur de prestatation',
        description: null
      },
      etat: false,
      code: 145,
      civility: 'morale',
      social_reason: 'graviton',
      rc: '97723',
      patent_number: '175484',
      if: '8545',
      ice: '124875678',
      cin: 'ax87548',
      last_name: 'hicham',
      first_name: 'belouali',
      date_birth: new Date(),
      date_death: null,
      gender: 'M',
      adress: 'tzkdda',
      street: 'street1',
      city: 'rabat',
      postal_code: 11001,
      tel1: '0635661817',
      tel2: null,
      address_email: 'h.belouali@graviton.ma',
      situation: 'celibataire',
      children_number: 0,
      assurance: 'false',
      retreat: 'false',
      tva_code: null,
      dette: null,
      education_level: 'enseignement_superieur',
      payment_mode: 'virement',
      bank_name: 'GBP',
      rib: 123456987654,
      isCorporation: false,
      actionsPermission: null,
      created_date: null,
      updated_date: null,
    };
    contrat.arrondissement = 'arrondissement';
    contrat.campagne = '2018/2019';
    contrat.CDA = 698;
    contrat.commune = 'rabat-salé';
    contrat.culture_anterieure = 'culture_anterieure';
    contrat.date_de_debut = new Date();
    contrat.date_de_signature = new Date();
    contrat.douar = 'douar';
    contrat.duree_de_contrat = 24;
    contrat.mode_irrigation = 'mode_irrigation1';
    contrat.parcelle = '13';
    contrat.province = 'province1';
    contrat.ref = 'ref1';
    contrat.secteur = 'secteur1';
    contrat.structure = {
      id: 11,
      libelle: 'sidi bennour',
      code: '1p11',
      city: 'sidi bennour',
      address: 'sucrerie doukkala',
      postal_code: 24350,
      tel1: null,
      tel2: null,
      fax: null,
      email: null,
      logo: null,
      type: {
        id: '3',
        libelle: 'division'
      }
    };
    contrat.superficie_contractee = 500;
    contrat.superficie_total = 600;
    contrat.type_de_bien = 'semis';
    contrat.type_de_sole = 'type_de_sole1';
    contrat.zone = 'zone1';
    return [contrat];
  }
}
