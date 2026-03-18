import { Part } from "@/types/part";

export function PartsTable({ items }: { items: Part[] }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Onderdeel</th>
            <th>Auto</th>
            <th>Vak</th>
            <th>Status</th>
            <th>Aantal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.barcode}</td>
              <td>{item.part_name}</td>
              <td>{item.brand ?? "-"} {item.model ?? "-"} {item.year ? `(${item.year})` : ""}</td>
              <td>{item.shelf ?? "-"}</td>
              <td><span className="badge">{item.status}</span></td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
