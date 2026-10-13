export default function Home() {
  // Step 1 scaffold only. Sections are built from step 3 (docs/TZ.md §11).
  return (
    <main className="flex min-h-svh items-end px-[var(--page-x)] pb-12">
      <h1 className="font-display text-display font-semibold leading-[0.95] tracking-[-0.03em]">
        sunrise <span className="text-sun-500">{"//"}</span> bangkok{" "}
        <span className="text-sun-500">{"//"}</span> pattaya
      </h1>
    </main>
  );
}
