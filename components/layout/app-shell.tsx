import Link from "next/link";
import { ReactNode } from "react";

const links = [
  ["/dashboard", "Dashboard"],
  ["/voorraad", "Voorraad"],
  ["/binnenkomst", "Binnenkomst"],
  ["/uitgifte", "Uitgifte"],
  ["/karren", "Karren"],
] as const;

type AppShellProps = {
  children: ReactNode;
  title?: string;
};

export function AppShell({ children, title }: AppShellProps) {
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

      <main className="content">
        {title ? <h2>{title}</h2> : null}
        {children}
      </main>
    </div>
  );
}