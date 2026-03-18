import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Magazijn App",
  description: "Magazijn app voor onderdelen, labels en scanflows",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
