import { useState } from "react";
import profile from "../../../../data/profile.json";

export default function Contact() {
  const contact = profile?.contact ?? {};
  const socials = profile?.socials ?? {};

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: "",
      });
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error: String(err.message || err),
      });
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
        <p className="mt-1 text-slate-600">
          Reach out via email or phone, or send a quick message using the form.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Contact details
          </h3>
          <dl className="space-y-2">
            {contact.email && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </dt>
                <dd className="text-sm text-slate-900">{contact.email}</dd>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  Phone
                </dt>
                <dd className="text-sm text-slate-900">{contact.phone}</dd>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  Location
                </dt>
                <dd className="text-sm text-slate-900">{contact.location}</dd>
              </div>
            )}
          </dl>

          {(socials.github ||
            socials.linkedin ||
            socials.X ||
            socials.instagram) && (
            <>
              <div className="my-4 h-px bg-slate-200" />
              <div className="flex flex-wrap items-center gap-2">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    GitHub
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    LinkedIn
                  </a>
                )}
                {socials.X && (
                  <a
                    href={socials.X}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    X
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Send a message
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="name"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.value }))
                  }
                  required
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="John Doe"
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                  }
                  required
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="john@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, phone: e.target.value }))
                  }
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="message"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                  }
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Tell me a bit about your project…"
                />
              </div>
            </div>

            {/* Status messages */}
            {status.error && (
              <div className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {status.success}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                type="submit"
                disabled={status.loading}
                className={[
                  "inline-flex h-10 items-center rounded-md bg-emerald-600 px-4 text-[15px] font-medium text-white",
                  status.loading ? "opacity-75" : "hover:bg-emerald-700",
                ].join(" ")}
              >
                {status.loading ? "Sending..." : "Send message"}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setValues({ name: "", email: "", phone: "", message: "" });
                  setStatus({ loading: false, success: "", error: "" });
                }}
                className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-[15px] font-medium text-slate-800 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
