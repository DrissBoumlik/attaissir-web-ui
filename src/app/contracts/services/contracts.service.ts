import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contract} from '../classes/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  routeName: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  constructor(public http: HttpClient) {
    this.routeName = 'contracts';
  }

  /**
   * Get a collection of Contracts
   * @returns {Observable<Contract[]>}
   */
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Contracts
   * @param id
   * @returns {Observable<Contract[]>}
   */
  getContract(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.apiUrl}/${this.routeName}/${id}`);

  }

  /**
   * Add a contracts
   * @param Contract
   * @returns {Observable<Contract[]>}
   */
  addContract(contract: Contract): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contract), this.options);

  }

  /**
   * Edit a contracts

   * @param Contract
   * @returns {Observable<Contract>}
   */
  editContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.apiUrl}/${this.routeName}/${contract.id}`, JSON.stringify(contract), this.options);

  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param data
   * @param test
   * @returns {any}
   */
  dataFormatter(data, test) {
    return (!test) ? data[0]['data'] : data;
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
      code_siam: '145',
      code_as400: '145',
      civility: 'morale',
      social_reason: 'graviton',
      rc: '97723',
      patent_number: '175484',
      if: '8545',
      ice: '124875678',
      cin: 'ax87548',
      last_name: 'hicham',
      first_name: 'belouali',
      ar_last_name: 'هشام',
      ar_first_name: 'بالوالي',
      date_birth: new Date(),
      date_death: null,
      gender: 'M',
      commune: 'rabat-salé',
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
      bank_accounts: [
        {
          id: 1,
          rib: '81547 8765454875 12',
          bank: 'banque populaire'
        },
        {
          id: 2,
          rib: '62489 2316548876 23',
          bank: 'attijari wafa banque'
        },
        {
          id: 3,
          rib: '23641 7553219564 77',
          bank: 'crédit agricole'
        }
      ],
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

    const contrat1 = Object.assign({}, contrat);
    contrat1.id = 2;
    const contrat2 = Object.assign({}, contrat);
    contrat2.id = 3;
    const contrat3 = Object.assign({}, contrat);
    contrat3.id = 4;
    const contrat4 = Object.assign({}, contrat);
    contrat4.id = 5;
    const contrat5 = Object.assign({}, contrat);
    contrat5.id = 6;
    const contrat6 = Object.assign({}, contrat);
    contrat6.id = 7;

    return [contrat, contrat1, contrat2, contrat3, contrat4, contrat5, contrat6];
  }
}
