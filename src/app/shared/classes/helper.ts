import { isNull } from 'util';

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
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'Encours'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'actif'.toLowerCase() || value.toLowerCase() === 'Active'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'suspended'.toLowerCase() || value.toLowerCase() === 'Suspendu'.toLowerCase()) {
      return 'm-badge m-badge--danger m-badge--wide';
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
   */
  public static gotoShow = (routeName: string, id: number, router: any, toastr) => {
    router.navigate([`/${routeName}/afficher/${id}`]).catch(
      err => {
        toastr.error(err.error.message);
      }
    );
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
}
