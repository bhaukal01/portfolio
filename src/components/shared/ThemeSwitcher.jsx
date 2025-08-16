import { useEffect, useMemo, useState } from "react";

/**
 * Self-contained ThemeSwitcher bar (Tailwind v4)
 * - No external CSS variables; no global theme tokens.
 * - All colors are defined per-theme inside this component.
 * - Props:
 *    - theme: "classic" | "aws" | "azure" | "gcp"
 *    - onChange: (nextTheme: string) => void
 */

const THEMES = ["classic", "aws", "azure", "gcp"];

const STYLES = {
  classic: {
    navBg: "bg-[color:color-mix(in_srgb,#f1fbe7_88%,transparent)]",
    navBorder: "border-[color:#d9f0c7]",
    navFg: "text-[color:#0f172a]",
    accent: "#2bb673",
    // pills
    btnBg: "bg-[color:#f7fbf3]",
    btnHover: "hover:bg-[color:#eef8e6]",
    btnFg: "text-[color:#0f172a]",
    btnBorder: "border-[color:#d9f0c7]",
    // menu
    menuBg: "bg-[color:#ffffff]",
    menuBorder: "border-[color:#e3f3d5]",
  },
  azure: {
    navBg: "bg-[color:color-mix(in_srgb,#ffffff_92%,transparent)]",
    navBorder: "border-[color:#d7e3ff]",
    navFg: "text-[color:#0b1a33]",
    accent: "#0078d4",
    btnBg: "bg-[color:#f2f7ff]",
    btnHover: "hover:bg-[color:#e6f0ff]",
    btnFg: "text-[color:#0b1a33]",
    btnBorder: "border-[color:#d7e3ff]",
    menuBg: "bg-[color:#ffffff]",
    menuBorder: "border-[color:#d7e3ff]",
  },
  gcp: {
    navBg: "bg-[color:color-mix(in_srgb,#ffffff_92%,transparent)]",
    navBorder: "border-[color:#e0e3e7]",
    navFg: "text-[color:#1f1f1f]",
    accent: "#1a73e8",
    btnBg: "bg-[color:#fafafa]",
    btnHover: "hover:bg-[color:#f1f3f4]",
    btnFg: "text-[color:#1f1f1f]",
    btnBorder: "border-[color:#e0e3e7]",
    menuBg: "bg-[color:#ffffff]",
    menuBorder: "border-[color:#e0e3e7]",
  },
  aws: {
    navBg: "bg-[color:color-mix(in_srgb,#0b1220_88%,transparent)]",
    navBorder: "border-[color:#22314d]",
    navFg: "text-[color:#e5ecff]",
    accent: "#ff9900",
    btnBg: "bg-[color:color-mix(in_srgb,#0f172a_78%,transparent)]",
    btnHover: "hover:bg-[color:#182342]",
    btnFg: "text-[color:#e5ecff]",
    btnBorder: "border-[color:#22314d]",
    menuBg: "bg-[color:#0f172a]",
    menuBorder: "border-[color:#22314d]",
  },
};

export default function ThemeSwitcher({ theme = "classic", onChange }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [theme]);

  const S = useMemo(() => STYLES[theme] ?? STYLES.classic, [theme]);

  const pillBase =
    [
      "h-7 px-2.5 rounded-full border text-xs transition active:translate-y-px",
      S.btnBg,
      S.btnFg,
      S.btnBorder,
      S.btnHover,
      "focus-visible:outline-none focus-visible:ring-2",
      `focus-visible:ring-[color:${S.accent}]/40`,
      "focus-visible:ring-offset-0",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Theme switcher"
        className={[
          "h-11 flex items-center justify-between px-3 gap-3",
          "border-b backdrop-blur-md",
          S.navBg,
          S.navBorder,
          "shadow-[0_4px_12px_rgba(0,0,0,0.04)]",
        ].join(" ")}
      >
        {/* Brand */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className={[
            "inline-flex items-center gap-2 font-semibold text-sm select-none",
            S.navFg,
          ].join(" ")}
          title="Home"
        >
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full"
            style={{
              background: S.accent,
              boxShadow: `0 0 0 4px color-mix(in srgb, ${S.accent} 18%, transparent)`,
            }}
          />
          <span>Available Themes »</span>
        </button>

        {/* Desktop theme pills */}
        <ul className="hidden sm:flex items-center gap-2">
          {THEMES.map((t) => {
            const active = theme === t;
            const A = STYLES[t];
            return (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => onChange?.(t)}
                  aria-pressed={active}
                  className={[
                    pillBase,
                    active
                      ? [
                          `border-[color:${S.accent}]`,
                          `text-[color:${S.accent}]`,
                          "bg-white/70 font-medium",
                          `ring-1 ring-[color:${S.accent}]/20`,
                        ].join(" ")
                      : "",
                  ].join(" ")}
                  // title shows what the pill would look like if selected (accent varies per theme)
                  style={active ? undefined : { outlineColor: A.accent }}
                >
                  {t}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile dropdown */}
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={[
              "h-7 px-2.5 rounded-md border text-xs inline-flex items-center gap-1",
              S.btnBg,
              S.btnFg,
              S.btnBorder,
              "focus-visible:outline-none focus-visible:ring-2",
              `focus-visible:ring-[color:${S.accent}]/40`,
            ].join(" ")}
          >
            {theme}
            <svg width="16" height="16" viewBox="0 0 20 20" className="opacity-70">
              <path fill="currentColor" d="M5 7l5 6 5-6H5z" />
            </svg>
          </button>

          {open && (
            <ul
              role="listbox"
              className={[
                "absolute right-0 mt-1 w-40 p-1.5 rounded-lg border shadow-xl",
                S.menuBg,
                S.menuBorder,
              ].join(" ")}
              onMouseLeave={() => setOpen(false)}
            >
              {THEMES.map((t) => {
                const active = theme === t;
                const T = STYLES[t];
                return (
                  <li key={t}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => onChange?.(t)}
                      className={[
                        "w-full text-left px-2.5 py-1.5 rounded-md text-sm",
                        S.btnFg,
                        S.btnHover,
                        active
                          ? `bg-[color:color-mix(in_srgb,${T.accent}_12%,white)] text-[color:${T.accent}] font-medium`
                          : "",
                      ].join(" ")}
                      style={!active ? { outlineColor: T.accent } : undefined}
                    >
                      {t}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
