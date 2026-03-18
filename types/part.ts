export type PartStatus = "op_voorraad" | "uit_magazijn" | "gereserveerd" | "retour" | "verloren";

export interface Part {
  id: string;
  barcode: string;
  part_number?: string | null;
  oem_number?: string | null;
  part_name: string;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  plate?: string | null;
  shelf?: string | null;
  cart_id?: string | null;
  quantity: number;
  status: PartStatus;
  recognition_source?: string | null;
  recognition_confidence?: number | null;
  unit_cost?: number | null;
  notes?: string | null;
  received_at: string;
  issued_at?: string | null;
  created_at: string;
  updated_at: string;
}
