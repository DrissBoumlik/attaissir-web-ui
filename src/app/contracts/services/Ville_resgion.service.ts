
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VilletEtRegionService {

  private villes = [
    'Zaïo',
    'Zagora',
    'Youssoufia',
    'Tiznit',
    'Tirhanimîne',
    'Tinghir',
    'Tiflet',
    'Tétouan',
    'Taza',
    'Taroudant',
    'Taourirt',
    'Taounate',
    'Tan-Tan',
    'Tangier',
    'Tahla',
    'Souq Larb’a al Gharb',
    'Sidi Yahia El Gharb',
    'Sidi Slimane',
    'Sidi Qacem',
    'Sidi Ifni',
    'Sidi Bennour',
    'Settat',
    'Sefrou',
    'Sale',
    'Safi',
    'Rabat',
    'Oulad Teïma',
    'Oujda',
    'Oued Zem',
    'Ouezzane',
    'Ouarzazat',
    'Nador',
    'Mohammedia',
    'Midelt',
    'Meknès',
    'Mechraa Bel Ksiri',
    'Martil',
    'Marrakesh',
    'Larache',
    'Ksar El Kebir',
    'Khouribga',
    'Khenifra',
    'Kenitra',
    'Kasba Tadla',
    'Jerada',
    'Imzoûrene',
    'Guercif',
    'Guelmim',
    'Fkih Ben Salah',
    'Fès al Bali',
    'Fes',
    'Essaouira',
    'El Jadida',
    'El Hajeb',
    'El Aïoun',
    'Chefchaouene',
    'Casablanca',
    'Bouznika',
    'Berkane',
    'Beni Mellal',
    'Berrechid',
    'Azrou',
    'Azemmour',
    'Asilah',
    'Khemisset',
    'Al Hoceïma',
    'Ahfir',
    'Agadir',
    'Skhirate',
    'Boujniba',
    'Dakhla',
  ];
  private regions = [
    'Chaouia-Ouardigha',
    'DO	Doukkala-Abda',
    'FE	Fès-Boulemane',
    'GC	Grand Casablanca',
    'GH	Gharb-Chrada-BeniHsn',
    'GS	Guelmim-Es-Semara',
    'LB	Laâyoune-Boujdour',
    'MA	Marrakech-Tensif',
    'ME	Meknès-Tafilalet',
    'OE	Oued Edahab-Lagouira',
    'OR	Oriental',
    'RA	Rabat-Salé-zemmour',
    'SO	Sous-Massa-Draa',
    'TA	Tadla-Azilal',
    'TH	Taza-Al Hoceima',
    'TT	Tanger-Tetouan'
  ];

  constructor() {
  }

  public  getRegions(): any  {
    return this.regions;
  }

  public getVilles(): any {
    return this.villes;
  }
}
