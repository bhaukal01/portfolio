import certs from "./../../../../data/certs.json";

export default function Certifications() {
  const items = Array.isArray(certs) ? certs : [];

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Certifications</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {items.map((c) => (
          <div
            key={c.id ?? c.certificateUrl ?? c.title}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600">{c.issuer}</p>
              </div>
              {c.date && (
                <span className="text-xs text-slate-500">{c.date}</span>
              )}
            </div>
            {c.description && (
              <p className="mt-2 text-sm text-slate-600 mb-4">
                {c.description}
              </p>
            )}
            {c.certificateUrl && (
              <a
                href={c.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex text-sm font-medium text-emerald-700 hover:underline"
              >
                View credential
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
