import { isArray, isNull } from 'util';
import { load } from '@angular/core/src/render3/instructions';
import * as CryptoJS from 'crypto-js';

export class Helper {
  /**
   * Map to format and return request params used in DxGrid
   * @param loadOptions
   * @returns {string}
   */
  public static mapParams = (loadOptions: any) => {
    console.log(loadOptions);
    let params = '?';

    params += 'skip=' + loadOptions.skip || 0;
    params += '&take=' + loadOptions.take || 12;

    if (loadOptions.sort) {
      params += '&orderby=' + loadOptions.sort[0].selector;
      if (loadOptions.sort[0].desc) {
        params += ' desc';
      }
    }

    params += `&requireTotalCount=1`;
    return params;
  }

  /**
   * Map Array and return a Dx datasource
   * @param data
   * @param {boolean} upper
   * @returns {{Name: any; ID: string}[]}
   */
  public static dataSourceformatter = (data: any, upper = true) => {
    return Object.keys(data).map((key) => {
      return {
        Name: (upper) ? data[key].toUpperCase() : data[key],
        ID: key
      };
    });
  }

  public static addFilter = (loadOptions: any, name: string, value: string) => {
    if (!loadOptions.hasOwnProperty('filter')) {
      loadOptions['filter'] = [[name, '=', value]];
    } else if (typeof loadOptions['filter'] !== 'undefined') {
      if (loadOptions['filter'].length === 3 && loadOptions['filter'][1] !== 'and' && !isArray(loadOptions['filter'][1])) {
        const tmp = loadOptions['filter'].splice(0, 3);
        loadOptions['filter'].push(tmp);

      }
      loadOptions['filter'].push('and');
      loadOptions['filter'].push([name, '=', value]);
    }
  }

  public static editFilter = (loadOptions: any, name: string, value: string) => {
    if (loadOptions.hasOwnProperty('filter')) {
      if (typeof loadOptions['filter'] !== 'undefined') {
        if (loadOptions['filter'].length === 3 && loadOptions['filter'][1] !== 'and' && !isArray(loadOptions['filter'][1])) {
          const index = loadOptions['filter'].indexOf(name);
          if (index !== -1) {
            loadOptions[index] = value;
          }
        }
      }
    }
  }

  public static realObject = (spy) => {
    Object.keys(spy).forEach(function(key) {
      if (spy[key] === '') {
        spy[key] = null;
      }
    });
    return spy;
  }

  public static getStatut = (value: string): string => {
    if (value === 'inprogress') {
      return 'ENCOURS';
    } else if (value === 'done') {
      return 'VALIDÉ';
    } else if (value === 'canceled') {
      return 'ANNULÉ';
    }
    return '';
  }

  public static articleType = (type) => {
    if (type === 'service') {
      return 'Service';
    }
    return 'Produit';
  }


  /**
   * Get color by status
   * @param {string} value
   * @returns {string}
   */
  public static getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'inactif'.toLowerCase() || value.toLowerCase() === 'Inactive'.toLowerCase()) {
      return 'm-badge m-badge--warning m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'En cours'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'actif'.toLowerCase() || value.toLowerCase() === 'Active'.toLowerCase()
      || value.toLowerCase() === 'Validé'.toLowerCase()
    ) {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'suspended'.toLowerCase() || value.toLowerCase() === 'Suspendu'.toLowerCase()
      || value.toLowerCase() === 'Annulé'.toLowerCase()
    ) {
      return 'm-badge m-badge--danger m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


  /*  public static getStatusColor = (value: string): string => {
      if (value === 'inprogress') {
        return 'ENCOURS';
      } else if (value === 'done') {
        return 'VALIDÉ';
      } else if (value === 'canceled') {
        return 'ANNULÉ';
      }
      return 'ENCOURS';
    }*/

  public static getOrderStatusColor(value: string): string {
    console.log(value);
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'recive'.toLowerCase() || value.toLowerCase() === 'Recive'.toLowerCase()) {
      return 'm-badge m-badge--primary m-badge--wide';
    } else if (value.toLowerCase() === 'delivery'.toLowerCase() || value.toLowerCase() === 'Delivery'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'transfer'.toLowerCase() || value.toLowerCase() === 'Transfer'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


  /**
   * get Third party type
   * @param link
   * @returns {string}
   */
  public static getThirdType = (link) => {
    console.log(link);
    if (/jeunepromoteurs/g.test(link)) {
      return 'young_promoter';
    } else if (/tiers/g.test(link)) {
      return 'aggregated';
    } else if (/mecanisation/g.test(link)) {
      return 'mechanization_provider';
    } else if (/boutures/g.test(link)) {
      return 'cuttings_supplier';
    } else if (/produits/g.test(link)) {
      return 'products_supplier';
    }
    return 'aggregated';
  }

  /** 
   * get Third party type link
   * @param link
   * @returns {string}
   */
  public static getThirdLink = (link) => {
    if (/jeunepromoteurs/g.test(link)) {
      return 'jeunepromoteurs';
    } else if (/tiers/g.test(link)) {
      return 'tiers';
    } else if (/mecanisations/g.test(link)) {
      return 'mecanisations';
    } else if (/boutures/g.test(link)) {
      return 'boutures';
    } else if (/produits/g.test(link)) {
      return 'produits';
    }
    return 'tiers';
  }

  /**
   * get Third party type name
   * @param link
   * @returns {string}
   */
  public static getThirdTypeName = (link) => {

    if (/jeunepromoteurs/g.test(link)) {
      return 'Jeune promoteur';
    } else if (/tiers/g.test(link)) {
      return 'Agrégé';
    } else if (/mecanisations/g.test(link)) {
      return 'Prestataire de mécanisation';
    } else if (/boutures/g.test(link)) {
      return 'Fournisseur de boutures';
    } else if (/produits/g.test(link)) {
      return 'Fournisseur de produits';
    }
    return 'Agrégé';
  }

  /**
   * Goto A Route
   * @param {string} routeName
   * @param {number} id
   * @param router
   * @param toastr
   * @param action
   */
  public static gotoShow = (routeName: string, id: number, router: any, toastr, action = 'afficher') => {
    router.navigate([`/${routeName}/${action}/${id}`]).catch(
      err => {
        toastr.error(err.error.message);
      }
    );
  }
  /**
   * Change value to null if undefined or empty string
   * @param val
   */
  public static makeNullable = (val: any) => {
    if (val === '' || val === {} || val === []) {
      return null;
    }
    return val;
  }

  /**
   * Format data depending of API
   * @param dat
   * @param {boolean} test
   * @returns {any}
   */
  public static dataFormatter = (dat: any, test: boolean) => {
    return (!test) ? dat['data'] : dat;
  }



  public static orderType = (value: string): string => {
    if (value === 'transfer') {
      return 'transfert';
    } else if (value === 'delivery') {
      return 'LIVRAISON';
    } else if (value === 'return') {
      return 'Retour Fournisseur';
    } else if (value === 'receive') {
      return 'Réception des intrants';
    }
    return value;
  }

  public static makeParcel = (data) => {
    if (data.hasOwnProperty('name')) {
      return {
        id: data.id,
        name: data.name,
        soil_id: data.soil.id,
        parcel_id: data.parcel_id,
        perimeter: ((data.soil !== null) && (data.soil.perimeter !== null))
          ? data.soil.perimeter : '',
        region: ((data.soil !== null) && (data.soil.region !== null))
          ? data.soil.region : '',
        district: ((data.soil !== null) && (data.soil.district !== null))
          ? data.soil.district : '',
        rural_commune: ((data.soil !== null) && (data.soil.rural_commune !== null))
          ? data.soil.rural_commune : '',
        cda: ((data.soil !== null) && (data.soil.cda !== null))
          ? data.soil.cda : '',
        zone: ((data.soil !== null) && (data.soil.zone !== null))
          ? data.soil.zone : '',
        sector: ((data.soil !== null) && (data.soil.sector !== null))
          ? data.soil.sector : '',
        block: ((data.soil !== null) && (data.soil.block !== null))
          ? data.soil.block : '',
        registration_number: ((data.soil !== null) && (data.soil.registration_number !== null))
          ? data.soil.registration_number : '',
        annuel_surface: data.annuel_surface,
        tenure: data.tenure,
        code_ormva: data.code_ormva,
        parcels: data.parcels.map(p => Helper.makeParcel(p))
      };
    }
    return {
      id: data.id,
      name: data.name,
      soil_id: data.soil.id,
      parcel_id: data.parcel_id,
      perimeter: ((data.soil !== null) && (data.soil.perimeter !== null))
        ? data.soil.perimeter : '',
      region: ((data.soil !== null) && (data.soil.region !== null))
        ? data.soil.region : '',
      district: ((data.soil !== null) && (data.soil.district !== null))
        ? data.soil.district : '',
      rural_commune: ((data.soil !== null) && (data.soil.rural_commune !== null))
        ? data.soil.rural_commune : '',
      cda: ((data.soil !== null) && (data.soil.cda !== null))
        ? data.soil.cda : '',
      zone: ((data.soil !== null) && (data.soil.zone !== null))
        ? data.soil.zone : '',
      sector: ((data.soil !== null) && (data.soil.sector !== null))
        ? data.soil.sector : '',
      block: ((data.soil !== null) && (data.soil.block !== null))
        ? data.soil.block : '',
      registration_number: ((data.soil !== null) && (data.soil.registration_number !== null))
        ? data.soil.registration_number : '',
      annuel_surface: data.annuel_surface,
      tenure: data.tenure,
      code_ormva: data.code_ormva,
      parcels: []
    };
  }


  /**
   * Format data depending of API
   * @param {string} value
   * @returns {string}
   */

  public static tenureType = (value: string): string => {
    if (value === 'property') {
      return 'propriété';
    } else if (value === 'lease') {
      return 'bail';
    } else if (value === 'procuration') {
      return 'procuration';
    }
    return value;
  }

  /*************** Custom Grid Grouping Value ***************/

  public static groupedMouvementValue = (e) => {
    return Helper.orderType(e.type).toUpperCase();
  }

  /***************Premission methode ***************/

  public static permissionMethod = (value: any): boolean => {
    let v = false;
    const permissions_ = localStorage.getItem('permissions');
    if (permissions_) {
      try {
        const bytes = CryptoJS.AES.decrypt(permissions_, 'Gra61884546585_55');
        const permissions_decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(permissions_decrypt);
        if (value[0] === 'none') {
          // this.el.nativeElement.style.display = 'initial';
          v = true;
        }
        const per_array: Boolean[] = new Array(value.length);
        for (let i = 0; i < value.length; i++) {
          per_array[i] = false;
        }
        permissions_decrypt.forEach((it) => {
          for (let i = 0; i < value.length; i++) {
            if (it === value[i]) {
              per_array[i] = true;
            }
          }
        });
        let visibility = true;
        for (let i = 0; i < value.length; i++) {
          if (per_array[i] === false) {
            visibility = false;
          }
        }
        if (visibility) {
          v = true;
          return v;
        }
        return v;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  }
}
