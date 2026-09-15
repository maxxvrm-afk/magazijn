'use client';

import Link from 'next/link';
import { useRef } from 'react';

const links = [
  ['/shop','Shop'],
  ['/drops','Drops'],
  ['/calendar','Calendar'],
  ['/archive','Archive'],
  ['/membership','Bloodline'],
  ['/vault','Vault'],
  ['/account','Account'],
  ['/about','About'],
] as const;

export default function MobileMenu(){
  const menuRef=useRef<HTMLDetailsElement>(null);
  const closeMenu=()=>menuRef.current?.removeAttribute('open');

  return <details className="mobileMenu" ref={menuRef}>
    <summary>Menu</summary>
    <div className="mobilePanel">
      {links.map(([href,label])=><Link href={href} onClick={closeMenu} key={href}>{label}</Link>)}
    </div>
  </details>;
}
