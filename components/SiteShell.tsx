"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Founder", "/founder"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Pricing", "/pricing"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape or click/touch outside & lock body scroll when open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Image
              src="/vyro-logo.png"
              alt="VYRO Digital"
              width={34}
              height={32}
              className="brand-logo"
              priority
            />
          </span>
          <span>
            VYRO<span className="brand-light"> DIGITAL</span>
            <small>BUILD. BRAND. GROW.</small>
          </span>
        </Link>

        <button
          ref={toggleRef}
          id="mobile-menu-toggle"
          className="menu-toggle"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>

        <nav
          id="primary-navigation"
          ref={navRef}
          className={open ? "nav nav-open" : "nav"}
          aria-label="Main Navigation"
        >
          {links.map(([label, url]) => (
            <Link
              key={url}
              href={url}
              className={path === url ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="nav-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk <span>↗</span>
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <span className="brand-mark">
                <Image
                  src="/vyro-logo.png"
                  alt="VYRO Digital"
                  width={34}
                  height={32}
                  className="brand-logo"
                />
              </span>
              <span>
                VYRO<span className="brand-light"> DIGITAL</span>
                <small>BUILD. BRAND. GROW.</small>
              </span>
            </Link>
            <p>A digital growth studio for businesses ready to move forward.</p>
          </div>
          <div>
            <b>Explore</b>
            {links.slice(1, 6).map(([n, u]) => (
              <Link key={u} href={u}>
                {n}
              </Link>
            ))}
          </div>
          <div>
            <b>Connect</b>
            <a href="mailto:vyrodigital04@gmail.com">Email VYRO</a>
            <a
              href="https://wa.me/918082703677"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/vyro__digital?psln=MWJsbDJzMnkzZ2dmNg=="
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} VYRO Digital. All rights reserved.
          </span>
          <span>Build. Brand. Grow.</span>
        </div>
      </footer>
    </>
  );
}
