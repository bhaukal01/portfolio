import { motion } from "framer-motion";
import pastWork from "../../../../data/past_work.json";

// animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PastWork() {
  const items = Array.isArray(pastWork) ? pastWork : [];
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12" id="past-work">
      {/* title  */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-2xl font-bold text-slate-900"
      >
        Past Work
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((work, idx) => {
          const hasImage = Boolean(work.image);
          const hasIframe = !hasImage && Boolean(work.iframe);
          const status = (work.status || "completed").toLowerCase();

          return (
            <motion.article
              key={`${work.title}-${idx}`}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 160 }}
              className="
                overflow-hidden rounded-xl border border-slate-200 bg-white
                shadow-sm transition-shadow hover:shadow-md
              "
            >
              {/* image/iframe  */}
              {(hasImage || hasIframe) && (
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  {hasImage && (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}

                  {hasIframe && (
                    <iframe
                      src={work.iframe}
                      title={work.title}
                      loading="lazy"
                      className="h-full w-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  )}
                </div>
              )}

              {/* content */}
              <div className="p-4">
                {/* TITLE + STATUS */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-slate-900">
                    {work.title}
                  </h3>

                  <StatusBadge status={status} />
                </div>

                {work.description && (
                  <p className="mt-1 text-sm text-slate-600">
                    {work.description}
                  </p>
                )}

                {/* ===== TECH ===== */}
                {Array.isArray(work.tech) && work.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {work.tech.map((t, i) => (
                      <span
                        key={`${t}-${i}`}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* project status  */}
                <div className="mt-4">
                  {status === "completed" && work.live && (
                    <a
                      href={work.live}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex text-sm font-medium
                        text-emerald-600 hover:underline
                      "
                    >
                      View live →
                    </a>
                  )}

                  {status === "current" && (
                    <span className="text-sm font-medium text-amber-600">
                      Ongoing project
                    </span>
                  )}

                  {status === "paused" && (
                    <span className="text-sm font-medium text-slate-500">
                      Project on hold
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

//  status badge 
function StatusBadge({ status }) {
  const map = {
    completed: {
      label: "Completed",
      className: "bg-emerald-50 text-emerald-700",
    },
    current: {
      label: "In Progress",
      className: "bg-amber-50 text-amber-700",
    },
    paused: {
      label: "Paused",
      className: "bg-slate-100 text-slate-600",
    },
  };

  const cfg = map[status] || {
    label: status,
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
