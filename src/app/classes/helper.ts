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
}
