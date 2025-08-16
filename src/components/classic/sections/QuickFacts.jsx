import profile from "../../../../data/profile.json";

function Fact({ k, v }) {
  if (!v) return null;
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {k}
      </span>
      <span className="text-sm font-semibold text-slate-900">{v}</span>
    </div>
  );
}

export default function QuickFacts() {
  const contact = profile?.contact ?? {};
  return (
    <section className="mx-auto max-w-6xl px-4 mb-10 mt-10">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 md:grid-cols-3">
        <Fact k="Email" v={contact.email} />
        <Fact k="Phone" v={contact.phone} />
        <Fact k="Location" v={contact.location} />
      </div>
    </section>
  );
}
