type Arr = {
  product: number; 
  quantity: number;
  calculate_total: number;

}

export interface BookingItem{
  id: number;
  total: string;
  created_at: string;
  order_items: Arr[];
}