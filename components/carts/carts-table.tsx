import { Cart } from "@/types/cart";

export function CartsTable({ items }: { items: Cart[] }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Titel</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>{item.title ?? "-"}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
