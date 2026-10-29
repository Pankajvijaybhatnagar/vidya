// Decorative lotus mandala drawn in SVG; colour follows `currentColor`.
export default function Mandala({ className = "", petals = 16 }) {
  const items = Array.from({ length: petals });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="96" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="88" strokeWidth="0.4" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="30" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="12" strokeWidth="0.8" />
      {items.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals) * i} 100 100)`}>
          <path d="M100 30 C 112 50, 112 62, 100 70 C 88 62, 88 50, 100 30 Z" strokeWidth="0.8" />
          <path d="M100 8 C 108 20, 108 26, 100 32 C 92 26, 92 20, 100 8 Z" strokeWidth="0.5" />
          <circle cx="100" cy="78" r="2" strokeWidth="0.6" />
        </g>
      ))}
      {items.map((_, i) => (
        <g key={`o${i}`} transform={`rotate(${(360 / petals) * i + 360 / petals / 2} 100 100)`}>
          <path d="M100 42 C 106 54, 106 60, 100 66 C 94 60, 94 54, 100 42 Z" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}
