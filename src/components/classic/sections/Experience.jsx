import profile from "../../../../data/profile.json";

export default function Experience() {
  const items = Array.isArray(profile?.experience) ? profile.experience : [];
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Experience</h2>
      <div className="space-y-4">
        {items.map((x, idx) => (
          <div
            key={`${x.company}-${idx}`}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {x.role}
                </h3>
                <p className="text-sm text-slate-700">{x.company}</p>
              </div>
              <span className="text-xs text-slate-500">{x.duration}</span>
            </div>
            {x.description && (
              <p className="mt-2 text-sm text-slate-600">{x.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
