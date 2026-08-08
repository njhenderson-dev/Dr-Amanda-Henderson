import Link from "next/link";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
        We couldn&rsquo;t find that page
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-muted">
        The page may have moved. Here are some helpful places to go instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact &amp; book
        </Link>
      </div>
      <nav aria-label="Helpful links" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
