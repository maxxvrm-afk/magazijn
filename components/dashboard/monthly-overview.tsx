import { OverviewStats } from "@/types/stats";

export function MonthlyOverview({ data }: { data: OverviewStats | null }) {
  const monthly = data?.monthly;

  return (
    <div className="card">
      <h3>Maandoverzicht</h3>
      {!monthly ? (
        <p className="muted">Nog geen data.</p>
      ) : (
        <div className="grid grid-4">
          <div><div className="label">Binnen deze maand</div><div className="kpi">{monthly.received_count}</div></div>
          <div><div className="label">Uit deze maand</div><div className="kpi">{monthly.issued_count}</div></div>
          <div><div className="label">Nog op voorraad van maand</div><div className="kpi">{monthly.still_in_stock_count}</div></div>
          <div><div className="label">Voorraadwaarde</div><div className="kpi">€ {Number(monthly.current_stock_value ?? 0).toFixed(2)}</div></div>
        </div>
      )}
    </div>
  );
}
