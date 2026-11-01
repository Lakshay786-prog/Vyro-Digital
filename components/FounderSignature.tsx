export function FounderSignature({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hewan Kachru Signature"
    >
      {/* Signature path inspired by luxury editorial calligraphy */}
      <path
        d="M24 72 C28 54, 38 28, 48 16 C53 10, 58 12, 55 22 C50 38, 38 78, 35 88 C33 96, 40 88, 48 74 C54 64, 62 44, 68 44 C73 44, 69 56, 66 68 C70 58, 78 50, 85 50 C91 50, 88 62, 85 72 C90 60, 100 52, 107 54 C113 55, 111 65, 109 74 C115 62, 126 56, 134 58 C139 59, 140 68, 142 76"
        stroke="#dfbe7e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M165 24 C170 14, 177 12, 179 19 C183 29, 175 55, 170 75 C167 86, 172 80, 180 64 C185 54, 193 36, 200 40 C206 44, 201 59, 198 72 C203 60, 212 52, 219 54 C225 56, 222 66, 221 73 C227 61, 236 56, 245 58 C253 60, 256 68, 259 75"
        stroke="#dfbe7e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dynamic looping flourish underline */}
      <path
        d="M18 80 C70 78, 148 81, 222 79 C252 78, 280 74, 305 70 C288 78, 248 85, 202 88 C160 90, 108 89, 62 86"
        stroke="#dfbe7e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* End flourish tick */}
      <path
        d="M275 48 C287 40, 302 46, 296 62 C289 76, 268 80, 252 76"
        stroke="#dfbe7e"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
    </svg>
  );
}
