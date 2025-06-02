export type ReportType = 'sales' | 'customers' | 'products' | 'services';

export type ReportFilter = {
  dateFrom?: string;
  dateTo?: string;
  customerId?: number;
  productId?: number;
  serviceId?: number;
  status?: string;
  category?: string;
}

export type ReportData = {
  type: ReportType;
  filters: ReportFilter;
  data: any[];
  summary: Record<string, any>;
  generatedAt: string;
}
