export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="kpi">{value}</div>
    </div>
  );
}
