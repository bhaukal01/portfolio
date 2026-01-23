import { motion } from "framer-motion";
import profile from "../../../../data/profile.json";

/* ===================== ANIMATIONS ===================== */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const badge = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Skills() {
  const skills = profile?.skills || {};
  const entries = Object.entries(skills).filter(
    ([, items]) => Array.isArray(items) && items.length,
  );

  if (!entries.length) return null;

  const formatLabel = (label) =>
    String(label)
      .replace(/[_\-]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12" id="skills">
      {/* ===== TITLE ===== */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 text-2xl font-bold text-slate-900"
      >
        Skills
      </motion.h2>

      {/* ===== CARDS GRID ===== */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 md:grid-cols-2"
      >
        {entries.map(([group, items]) => (
          <motion.div
            key={group}
            variants={card}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="
              rounded-xl border border-slate-200 bg-white p-4
              shadow-sm transition-shadow
              hover:shadow-md
            "
          >
            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              {formatLabel(group)}
            </h3>

            {/* ===== BADGES ===== */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {items.map((item, idx) => {
                if (typeof item === "string") {
                  return <SkillBadge key={`${item}-${idx}`} label={item} />;
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
                    <SkillBadge
                      key={`${label}-${idx}`}
                      label={label}
                      meta={meta || undefined}
                    />
                  );
                }

                return null;
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ===================== BADGE ===================== */
function SkillBadge({ label, meta }) {
  return (
    <motion.span
      variants={badge}
      whileHover={{ scale: 1.08, y: -2 }}
      className="
        inline-flex items-center gap-1 rounded-md
        bg-slate-100 px-2.5 py-1 text-xs text-slate-700
        cursor-default transition-colors
        hover:bg-emerald-50 hover:text-emerald-700
      "
    >
      {label}
      {meta && <span className="text-[10px] text-slate-500">({meta})</span>}
    </motion.span>
  );
}

/* ===================== UTIL ===================== */
function prettyLevel(level) {
  const s = String(level).toLowerCase();
  if (s === "adv" || s === "advanced") return "Advanced";
  if (s === "intermediate" || s === "mid") return "Intermediate";
  if (s === "beginner" || s === "junior") return "Beginner";
  return level;
}
