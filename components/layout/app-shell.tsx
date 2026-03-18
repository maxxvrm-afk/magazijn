import Link from "next/link";
import { ReactNode } from "react";

const links = [
  ["/dashboard", "Dashboard"],
  ["/binnenkomst", "Binnenkomst"],
  ["/uitgifte", "Uitgifte"],
  ["/voorraad", "Voorraad"],
  ["/karren", "Karren"],
];

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="container">
      <div className="header">
        <div>
          <h1 style={{ margin: 0 }}>{title}</h1>
          <p className="muted">Pc voor labels en PDF. Telefoon voor binnenkomst. Bluetooth scanner werkt als toetsenbord.</p>
        </div>
        <nav className="nav">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </main>
  );
}
