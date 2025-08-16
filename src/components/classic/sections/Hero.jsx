import profile from "../../../../data/profile.json";

export default function Hero() {
  const about = profile?.about ?? {};
  const contact = profile?.contact ?? {};
  const socials = profile?.socials ?? {};

  // Path to CV at the project root; place CV.pdf in the root (served as /CV.pdf)
  const cvHref = "https://ik.imagekit.io/1usyzu9ab/CV.pdf";

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pt-10 pb-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-slate-600">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Available for new opportunities</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {about.name || "Your Name"}
          </h1>

          <p className="text-lg text-slate-700">
            {about.title || "Web Developer"}
          </p>

          <p className="text-slate-600">
            {about.summary ||
              "Passionate developer with experience in building responsive web applications using modern technologies."}
          </p>

          {/* Primary actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href="#projects"
              className="inline-flex h-10 items-center rounded-md bg-emerald-600 px-4 text-[15px] font-medium text-white transition hover:bg-emerald-700"
            >
              View projects
            </a>

            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-[15px] font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Contact
            </a>

            {/* Download CV button (forces download of /cv.pdf) */}
            <a
              href={cvHref}
              download
              target="_blank"
              className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-[15px] font-medium text-slate-800 transition hover:bg-slate-50"
              title="Download CV (PDF)"
            >
              Download CV
            </a>
          </div>

          {/* Socials row (circular buttons) */}
          <SocialRow socials={socials} contact={contact} />
        </div>

        {/* Right visual */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-[color:color-mix(in_srgb,#84cc16_10%,transparent)] blur-xl" />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
            <div className="flex h-full items-center justify-center text-slate-400">
              <img
                src={about.image}
                alt={about.name}
                className="flex h-full items-center justify-center text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialRow({ socials = {}, contact = {} }) {
  const items = [
    socials.github
      ? {
          key: "github",
          href: socials.github,
          label: "GitHub",
          icon: GitHubIcon,
        }
      : null,
    socials.linkedin
      ? {
          key: "linkedin",
          href: socials.linkedin,
          label: "LinkedIn",
          icon: LinkedInIcon,
        }
      : null,
    socials.X ? { key: "x", href: socials.X, label: "X", icon: XIcon } : null,
    socials.instagram
      ? {
          key: "instagram",
          href: socials.instagram,
          label: "Instagram",
          icon: InstagramIcon,
        }
      : null,
    contact.email
      ? {
          key: "email",
          href: `mailto:${contact.email}`,
          label: "Email",
          icon: MailIcon,
        }
      : null,
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className="pt-3">
      <div className="flex items-center gap-2">
        {items.map(({ key, href, label, icon: Icon }) => (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noreferrer"}
            className="
              inline-flex size-9 items-center justify-center rounded-full
              border border-slate-200 bg-white text-slate-700
              hover:bg-slate-50 hover:text-slate-900
              transition
            "
            aria-label={label}
            title={label}
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

/* Icons (minimal inline SVGs) */
function GitHubIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.72c-2.78.61-3.37-1.2-3.37-1.2-.45-1.14-1.1-1.45-1.1-1.45-.9-.6.07-.59.07-.59 1 .07 1.53 1.05 1.53 1.05.9 1.52 2.36 1.08 2.94.83.09-.66.35-1.09.63-1.34-2.22-.26-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.42.21 2.46.11 2.72.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.59.69.49A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5v12H3.72v-12h3.22zm.19-4.02a1.86 1.86 0 1 1-3.72 0a1.86 1.86 0 0 1 3.72 0zM20.28 20.5h-3.22v-6.26c0-1.49-.03-3.41-2.08-3.41c-2.08 0-2.4 1.62-2.4 3.3v6.37H9.36v-12h3.09v1.64h.04c.43-.82 1.48-1.68 3.05-1.68c3.26 0 3.86 2.15 3.86 4.95v7.09z"
      />
    </svg>
  );
}

function XIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 5h3.3l-4.42 5.05L19.5 19h-3.9l-3-4.26L8.9 19H5.6l4.7-5.36L4.8 5h4l2.72 3.92L14.7 5Zm-.68 12h1.83L9.99 6.95H8.09L14.02 17Z"
      />
    </svg>
  );
}

function InstagramIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m5 3a6 6 0 1 1 0 12A6 6 0 0 1 12 7m0 2.5A3.5 3.5 0 1 0 15.5 13A3.5 3.5 0 0 0 12 9.5M18 6.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18 6.25Z"
      />
    </svg>
  );
}

function MailIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z"
      />
    </svg>
  );
}
