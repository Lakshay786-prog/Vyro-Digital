import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-hero" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p className="hero-copy" style={{ margin: "24px auto 0", maxWidth: 560 }}>
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link className="button button-gold" href="/" style={{ marginTop: 30 }}>
          Back home
        </Link>
      </div>
    </main>
  );
}
