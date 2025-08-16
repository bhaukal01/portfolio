import { useState } from "react";
import profile from "./../../../../data/profile.json";

export default function ClassicNavbar() {
  const [open, setOpen] = useState(false);

  const name = profile?.about?.name || "Your Name";
  const resumeUrl =
    profile?.resumeUrl || "https://ik.imagekit.io/1usyzu9ab/CV.pdf";
  const email = profile?.contact?.email || "mailto:me@example.com";

  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <nav
        className="
          h-14 flex items-center justify-between
          px-4 md:px-6
          border-b bg-white/90 backdrop-blur
          border-[color:#e5e7eb]
          shadow-[0_4px_12px_rgba(2,6,23,0.04)]
        "
        aria-label="Classic navbar"
      >
        {/* Brand */}
        <a href="" className="inline-flex items-center gap-2 select-none">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-emerald-500 text-white font-bold">
            AN
          </span>
          <span className="text-sm font-semibold text-slate-900">{name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions (desktop) */}
        {/* <div className="hidden md:flex items-center gap-2">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex h-9 items-center rounded-md border
                border-[color:#e5e7eb] bg-white px-3 text-sm font-medium text-slate-800
                hover:bg-slate-50
              "
            >
              Resume
            </a>
          )}
          <a
            href={`mailto:${email.replace(/^mailto:/, "")}`}
            className="
              inline-flex h-9 items-center rounded-md bg-emerald-600 px-3 text-sm font-medium text-white
              hover:bg-emerald-700
            "
          >
            Hire me
          </a>
        </div> */}

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:#e5e7eb] text-slate-700 hover:bg-slate-50"
          aria-expanded={open}
          aria-controls="classic-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="pointer-events-none"
          >
            {open ? (
              <path
                fill="currentColor"
                d="M18.3 5.71L12 12.01L5.7 5.7L4.29 7.11L10.59 13.41L4.29 19.71L5.7 21.12L12 14.82L18.3 21.12L19.71 19.71L13.41 13.41L19.71 7.11z"
              />
            ) : (
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="classic-mobile-menu"
          className="
            md:hidden border-b border-[color:#e5e7eb] bg-white
            shadow-[0_8px_20px_rgba(2,6,23,0.06)]
          "
          onClick={() => setOpen(false)}
        >
          <ul className="px-4 py-3 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {/* <div className="px-4 pb-4 flex items-center gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 h-9 items-center justify-center rounded-md border border-[color:#e5e7eb] bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Resume
              </a>
            )}
            <a
              href={`mailto:${email.replace(/^mailto:/, "")}`}
              className="inline-flex flex-1 h-9 items-center justify-center rounded-md bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Hire me
            </a>
          </div> */}
        </div>
      )}
    </header>
  );
}
