import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-ink-900 md:text-4xl">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-md text-ink-600">
        The page you are looking for may have been moved or no longer exists.
        Return to the homepage or explore our research areas.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/research-areas" variant="secondary">
          Research areas
        </ButtonLink>
      </div>
    </section>
  );
}
