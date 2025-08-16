import profile from "../../../../data/profile.json";

export default function Education() {
  const items = Array.isArray(profile?.education) ? profile.education : [];
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Education</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((e, idx) => (
          <div
            key={`${e.level}-${idx}`}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <h3 className="text-[15px] font-semibold text-slate-900">
              {e.level}
            </h3>
            <p className="text-sm text-slate-700">{e.board}</p>
            <p className="text-sm text-slate-600">{e.school}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
              {e.year && <span>{e.year}</span>}
              {e.percentage && <span>{e.percentage}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
