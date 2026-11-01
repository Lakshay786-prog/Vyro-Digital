"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["Home","/"],["About","/about"],["Founder","/founder"],["Services","/services"],["Work","/work"],["Pricing","/pricing"],["Insights","/insights"],["Contact","/contact"]];
export function SiteShell({children}:{children:React.ReactNode}) {
  const [open,setOpen]=useState(false); const path=usePathname();
  return <>
    <header className="header"><Link href="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark">V</span><span>VYRO<span className="brand-light"> DIGITAL</span><small>BUILD. BRAND. GROW.</small></span></Link>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button>
      <nav className={open?"nav nav-open":"nav"}>{links.map(([label,url])=><Link key={url} href={url} className={path===url?"active":""} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="/contact" onClick={()=>setOpen(false)}>Let's talk <span>↗</span></Link></nav>
    </header>
    <main>{children}</main>
    <footer className="footer"><div className="footer-top"><div><Link href="/" className="brand"><span className="brand-mark">V</span><span>VYRO<span className="brand-light"> DIGITAL</span><small>BUILD. BRAND. GROW.</small></span></Link><p>A digital growth studio for businesses ready to move forward.</p></div><div><b>Explore</b>{links.slice(1,6).map(([n,u])=><Link key={u} href={u}>{n}</Link>)}</div><div><b>Connect</b><a href="mailto:hewankachru33@gmail.com">Email VYRO</a><a href="https://wa.me/918082703677" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VYRO Digital. All rights reserved.</span><span>Build. Brand. Grow.</span></div></footer>
  </>;
}