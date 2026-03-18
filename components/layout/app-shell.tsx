import Link from "next/link";

const links = [
  ["/dashboard", "Dashboard"],
  ["/voorraad", "Voorraad"],
  ["/binnenkomst", "Binnenkomst"],
  ["/uitgifte", "Uitgifte"],
  ["/karren", "Karren"],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Magazijn App</h1>
        <nav className="nav">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}