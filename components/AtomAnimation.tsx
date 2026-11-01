export default function AtomAnimation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`atom-scene ${className}`}
      aria-label="Animated metallic atom with VYRO and BUILD. BRAND. GROW. in motion"
      role="img"
    >
      <div className="atom-card">
        <div className="atom">

          {/* Three clean 3D rotating gold rings with orbiting electron satellites */}
          <div className="orbit orbit-one">
            <span className="electron" />
          </div>
          <div className="orbit orbit-two">
            <span className="electron" />
          </div>
          <div className="orbit orbit-three">
            <span className="electron" />
          </div>

          {/* Center nucleus wrap: rotating BUILD · BRAND · GROW ring + gold core */}
          <div className="nucleus-wrap">

            {/* Precision Rotating Ring with BUILD · BRAND · GROW text */}
            <svg
              className="nucleus-orbit-text"
              viewBox="0 0 180 180"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="nucleusTextPath"
                  d="M 90,90 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
              </defs>

              {/* Outer delicate gold guide ring */}
              <circle
                cx="90"
                cy="90"
                r="68"
                fill="none"
                stroke="rgba(201, 164, 92, 0.4)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />

              {/* Inner delicate gold guide ring */}
              <circle
                cx="90"
                cy="90"
                r="52"
                fill="none"
                stroke="rgba(201, 164, 92, 0.45)"
                strokeWidth="0.8"
              />

              {/* Rotating text ring */}
              <text className="nucleus-svg-text">
                <textPath
                  href="#nucleusTextPath"
                  startOffset="0%"
                  textLength="376"
                  lengthAdjust="spacing"
                >
                  BUILD • BRAND • GROW • BUILD • BRAND • GROW •
                </textPath>
              </text>
            </svg>

            {/* Center Circle in Theme Color (Gold Metallic Core) with Black VYRO */}
            <div className="nucleus nucleus-gold-theme">
              <div className="nucleus-ring-sheen" />
              <span className="nucleus-brand">VYRO</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
