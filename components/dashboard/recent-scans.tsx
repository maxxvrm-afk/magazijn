"use client";

import { useMovements } from "@/hooks/useMovements";

function formatDate(value: string) {
  return new Date(value).toLocaleString("nl-NL");
}

export function RecentScans() {
  const { items, loading, error } = useMovements();

  return (
    <div className="card">
      <h3>Laatste scans</h3>
      {loading ? <p className="muted">Laden...</p> : null}
      {error ? <p className="muted">{error}</p> : null}
      {!loading && !error && items.length === 0 ? <p className="muted">Nog geen scans gevonden.</p> : null}
      {!loading && !error && items.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Tijd</th>
              <th>Actie</th>
              <th>Barcode</th>
              <th>Gebruiker</th>
              <th>Apparaat</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{formatDate(item.created_at)}</td>
                <td>{item.action}</td>
                <td>{item.scanned_value || "-"}</td>
                <td>{item.user_name || "-"}</td>
                <td>{item.device_name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
