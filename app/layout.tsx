import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import './home-upgrade.css';
import './product-card-fixes.css';

export const metadata: Metadata = { title: 'Luna Cruenta — L.C.', description: 'Numbered clothing drops beneath the blood moon.' };

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><body><header className="siteHeader"><div className="topline">LUNA CRUENTA — THE BLOOD MOON ARCHIVE</div><div className="navWrap"><Link href="/" className="brand" aria-label="Luna Cruenta home"><span className="logoWrap"><Image src="https://cdn.shopify.com/s/files/1/1009/1325/0631/files/luna-cruenta-lc-logo.png?v=1789377736" alt="Luna Cruenta LC logo" width={38} height={38} priority/></span><span>LUNA CRUENTA</span></Link><nav className="desktopNav"><Link href="/shop">Shop</Link><Link href="/drops">Drops</Link><Link href="/calendar">Calendar</Link><Link href="/archive">Archive</Link><Link href="/membership">Bloodline</Link><Link href="/about">About</Link></nav><div className="accountLinks"><Link href="/vault">Vault</Link><Link href="/account">Account</Link></div><details className="mobileMenu"><summary>Menu</summary><div className="mobilePanel"><Link href="/shop">Shop</Link><Link href="/drops">Drops</Link><Link href="/calendar">Calendar</Link><Link href="/archive">Archive</Link><Link href="/membership">Bloodline</Link><Link href="/vault">Vault</Link><Link href="/account">Account</Link><Link href="/about">About</Link></div></details></div></header><main>{children}</main><footer className="footer"><div><strong>LUNA CRUENTA</strong><p>Small numbered chapters. Same blood moon.</p></div><div><Link href="/drops">Drops</Link><Link href="/membership">Bloodline</Link><Link href="/archive">Archive</Link></div><div><span>© 2026 L.C.</span><span>Built for the first chapter.</span></div></footer></body></html>;
}
