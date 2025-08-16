import profile from "../../../../data/profile.json";

/**
 * Dynamic Skills section
 * - Renders every key in profile.skills as its own card.
 * - Accepts items as:
 *    - ["React","TypeScript"] OR
 *    - [{ "name":"React","level":"advanced","years":3 }, ...]
 * - Unknown groups are handled automatically (e.g., "devops", "ml").
 */
export default function Skills() {
  const skills = profile?.skills || {};
  const entries = Object.entries(skills).filter(
    ([, items]) => Array.isArray(items) && items.length
  );

  if (!entries.length) return null;

  // Title-case the group label (e.g., "frontend" -> "Frontend")
  const formatLabel = (label) =>
    String(label)
      .replace(/[_\-]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12" id="skills">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Skills</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {entries.map(([group, items]) => (
          <div
            key={group}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              {formatLabel(group)}
            </h3>

            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => {
                // Support string or object form
                if (typeof item === "string") {
                  return <Badge key={`${item}-${idx}`} label={item} />;
                }

                if (item && typeof item === "object") {
                  const label = item.name ?? item.label ?? `Skill ${idx + 1}`;
                  const meta = [
                    item.level ? prettyLevel(item.level) : null,
                    item.years != null ? `${item.years}y` : null,
                  ]
                    .filter(Boolean)
                    .join(" • ");

                  return (
                    <Badge
                      key={`${label}-${idx}`}
                      label={label}
                      meta={meta || undefined}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Badge({ label, meta }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
      {label}
      {meta && <span className="text-[10px] text-slate-500">({meta})</span>}
    </span>
  );
}

function prettyLevel(level) {
  const s = String(level).toLowerCase();
  if (s === "adv" || s === "advanced") return "Advanced";
  if (s === "intermediate" || s === "mid") return "Intermediate";
  if (s === "beginner" || s === "junior") return "Beginner";
  return level; // leave custom values as-is
}
