import projects from "../../../../data/projects.json";

export default function Projects() {
  const items = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
        <a
          href="#contact"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          Work with me
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, idx) => (
          <article
            key={
              p.projectGithubLink || p.projectLiveLink || p.projectName || idx
            }
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-[0_12px_30px_rgba(2,6,23,0.08)]"
          >
            {p.projectImage ? (
              <img
                src={p.projectImage}
                alt={p.projectName}
                className="h-36 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-36 bg-slate-100" />
            )}

            <div className="space-y-1 p-4">
              <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald-700">
                {p.projectName}
              </h3>
              {p.projectBrief && (
                <p className="text-sm text-slate-600 line-clamp-2">
                  {p.projectBrief}
                </p>
              )}
              {Array.isArray(p.technologies) && p.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 px-4 pb-4 text-sm">
              {p.projectLiveLink && (
                <a
                  className="text-emerald-700 hover:underline"
                  href={p.projectLiveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                </a>
              )}
              {p.projectGithubLink && (
                <a
                  className="text-slate-700 hover:underline"
                  href={p.projectGithubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {p.projectTimeline && (
                <span className="ml-auto text-xs text-slate-500">
                  {p.projectTimeline}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
