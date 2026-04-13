'use client';

export default function Juosta() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-10"
      >
        {/* Background band */}
        <rect width="1200" height="40" fill="#8b1a1a" />

        {/* Main geometric woven pattern — repeating diamond/cross motif */}
        {Array.from({ length: 40 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 30}, 0)`}>
            {/* Diamond */}
            <polygon
              points="15,4 26,20 15,36 4,20"
              fill="none"
              stroke="#d4a843"
              strokeWidth="1.2"
            />
            {/* Inner cross */}
            <line x1="15" y1="8" x2="15" y2="32" stroke="#c9952a" strokeWidth="0.8" />
            <line x1="7" y1="20" x2="23" y2="20" stroke="#c9952a" strokeWidth="0.8" />
            {/* Corner dots */}
            <circle cx="15" cy="4" r="1.5" fill="#d4a843" />
            <circle cx="26" cy="20" r="1.5" fill="#d4a843" />
            <circle cx="15" cy="36" r="1.5" fill="#d4a843" />
            <circle cx="4" cy="20" r="1.5" fill="#d4a843" />
          </g>
        ))}

        {/* Top and bottom border lines */}
        <line x1="0" y1="1" x2="1200" y2="1" stroke="#d4a843" strokeWidth="1.5" />
        <line x1="0" y1="39" x2="1200" y2="39" stroke="#d4a843" strokeWidth="1.5" />

        {/* Inner border lines */}
        <line x1="0" y1="5" x2="1200" y2="5" stroke="#c9952a" strokeWidth="0.5" opacity="0.6" />
        <line x1="0" y1="35" x2="1200" y2="35" stroke="#c9952a" strokeWidth="0.5" opacity="0.6" />
      </svg>
    </div>
  );
}
