// Portrait placeholder.
//
// IMPORTANT: This renders a tasteful placeholder until real photography of
// Dr Amanda Henderson is supplied. Drop a real image at
// /public/images/dr-amanda-henderson.jpg (and update <img> usage) before
// launch — see MIGRATION-PLAN.md §15 "Assets to obtain".

type Props = {
  className?: string;
  rounded?: string;
  label?: string;
};

export function Portrait({
  className = "",
  rounded = "rounded-2xl",
  label = "Photograph of Dr Amanda Henderson — to be supplied",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 400 500"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DCE5DD" />
            <stop offset="100%" stopColor="#F4E7E1" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#pg)" />
        <circle cx="200" cy="195" r="70" fill="#BFCEC1" opacity="0.7" />
        <path
          d="M80 470c0-70 54-118 120-118s120 48 120 118z"
          fill="#BFCEC1"
          opacity="0.7"
        />
        <text
          x="200"
          y="210"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="64"
          fill="#4F6F5E"
        >
          AH
        </text>
      </svg>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-sage-700">
        Photo to be added
      </span>
    </div>
  );
}
