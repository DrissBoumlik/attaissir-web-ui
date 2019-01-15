export class HarvestConvocation {
  parcel_id:  number;
  parcel_name:  string;
  sup_semi: number;
  daily_quota: number;
  start_date: Date;
  end_date: Date;
  is_mechanical: boolean;
  third_party_id: number;
  p_harvest_order: number;
  cda_name: string;
  is_exception: {
    motif: File;
    description: string;
  };
}
