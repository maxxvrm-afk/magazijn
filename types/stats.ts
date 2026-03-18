export interface OverviewStats {
  dashboard: {
    total_stock_items: number;
    total_stock_qty: number;
    current_stock_value: number;
    missing_vehicle_info: number;
    active_carts: number;
  };
  monthly: {
    month_start: string;
    month_end: string;
    received_count: number;
    issued_count: number;
    still_in_stock_count: number;
    current_stock_count: number;
    current_stock_qty: number;
    current_stock_value: number;
  } | null;
}
