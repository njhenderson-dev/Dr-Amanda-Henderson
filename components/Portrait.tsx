// Real photograph of Dr Amanda Henderson (migrated from the original site and
// stored locally in /public/images - see scripts/fetch-images.mjs).
// Responsive WebP, fixed aspect ratio to avoid layout shift.

type Props = {
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean; // eager-load + high priority for the hero (LCP)
  label?: string;
};

export function Portrait({
  className = "",
  rounded = "rounded-2xl",
  sizes = "(min-width: 1024px) 24rem, 80vw",
  priority = false,
  label = "Dr Amanda Henderson, family GP in Maroubra, Sydney",
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-canvas ${rounded} ${className}`}>
      <img
        src="/images/dr-amanda-henderson-960.webp"
        srcSet="/images/dr-amanda-henderson-640.webp 640w, /images/dr-amanda-henderson-960.webp 960w"
        sizes={sizes}
        width={960}
        height={1200}
        alt={label}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
