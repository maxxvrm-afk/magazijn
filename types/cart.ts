export interface Cart {
  id: string;
  code: string;
  title?: string | null;
  plate?: string | null;
  customer_name?: string | null;
  notes?: string | null;
  status: "actief" | "afgerond" | "gearchiveerd";
  created_at: string;
  updated_at: string;
}
