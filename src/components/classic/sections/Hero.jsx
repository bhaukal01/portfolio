import { motion } from "framer-motion";
import profile from "../../../../data/profile.json";
import { gsap } from "gsap";
import RotatingText from "./../../reactBits/RotatingText.jsx";
import TextType from "@/components/reactBits/TextType";

// animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Hero() {
  const about = profile?.about ?? {};
  const contact = profile?.contact ?? {};
  const socials = profile?.socials ?? {};

  const cvHref = "https://ik.imagekit.io/1usyzu9ab/CV.pdf";

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pt-10 pb-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 text-xs text-slate-600"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new opportunities</span>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
          >
            {about.name || "Your Name"}
          </motion.h1>
          {/* <motion.p variants={item} className="text-lg text-slate-700">
            {about.title || "Web Developer"}
          </motion.p> */}
          {/* <RotatingText
            texts={["React", "Bits", "Is", "Cool!"]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          /> */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 text-xl font-bold text-slate-600"
          >
            <TextType
              text={about.title}
              typingSpeed={60}
              pauseDuration={1500}
              showCursor
              cursorCharacter="▎"
              deletingSpeed={50}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />
          </motion.div>
          <motion.p variants={item} className="text-slate-600">
            {about.summary ||
              "Passionate developer with experience in building responsive web applications using modern technologies."}
          </motion.p>
          {/* ===== ACTION BUTTONS ===== */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-2 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex h-10 items-center rounded-md bg-emerald-600 px-4 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              View projects
            </a>

            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-[15px] font-medium text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Contact
            </a>

            <a
              href={cvHref}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-[15px] font-medium text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Download CV
            </a>
          </motion.div>
          <motion.div variants={item}>
            <SocialRow socials={socials} contact={contact} />
          </motion.div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.04, rotate: 0.6 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative group"
        >
          <div className="absolute -inset-6 rounded-3xl bg-[color:color-mix(in_srgb,#84cc16_15%,transparent)] blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_15px_40px_rgba(2,6,23,0.12)]">
            <img
              src={about.image}
              alt={about.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// social icons row
function SocialRow({ socials = {}, contact = {} }) {
  const items = [
    socials.github && {
      key: "github",
      href: socials.github,
      label: "GitHub",
      icon: GitHubIcon,
    },
    socials.linkedin && {
      key: "linkedin",
      href: socials.linkedin,
      label: "LinkedIn",
      icon: LinkedInIcon,
    },
    socials.X && { key: "x", href: socials.X, label: "X", icon: XIcon },
    socials.instagram && {
      key: "instagram",
      href: socials.instagram,
      label: "Instagram",
      icon: InstagramIcon,
    },
    contact.email && {
      key: "email",
      href: `mailto:${contact.email}`,
      label: "Email",
      icon: MailIcon,
    },
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
            aria-label={label}
            title={label}
            className="
              inline-flex size-9 items-center justify-center rounded-full
              border border-slate-200 bg-white text-slate-700
              transition-all duration-200
              hover:-translate-y-1 hover:scale-110
              hover:bg-emerald-50 hover:text-emerald-600
            "
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

// icons
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
