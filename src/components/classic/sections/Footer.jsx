import profile from "../../../../data/profile.json";

export default function Footer() {
  const s = profile?.socials ?? {};
  const name = profile?.about?.name || "Your Name";

  return (
    <footer  className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <div className="flex items-center gap-3">
            {s.github && (
              <a
                href={s.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                GitHub
              </a>
            )}
            {s.linkedin && (
              <a
                href={s.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                LinkedIn
              </a>
            )}
            {s.X && (
              <a
                href={s.X}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                X
              </a>
            )}
            {s.instagram && (
              <a
                href={s.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
