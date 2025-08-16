import { useState } from "react";
import profile from "../../../../data/profile.json";

export default function Contact() {
  const contact = profile?.contact ?? {};
  const socials = profile?.socials ?? {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: null,
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
        <p className="mt-1 text-slate-600">
          Reach out via email or phone, or send a quick message using the form.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Details card */}
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

        {/* Form card */}
        <div className="lg:col-span-2">
          <form
            className="rounded-xl border border-slate-200 bg-white p-5"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Send a message
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="contact-name"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="contact-email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="contact-phone"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-slate-700"
                  htmlFor="contact-message"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Tell me a bit about your project…"
                />
              </div>
            </div>

            {/* Status messages */}
            {status.error && (
              <p className="mt-3 text-sm text-red-600">{status.error}</p>
            )}
            {status.success && (
              <p className="mt-3 text-sm text-green-600">{status.success}</p>
            )}

            {/* Buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex h-10 items-center rounded-md bg-emerald-600 px-4 text-[15px] font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {status.loading ? "Sending..." : "Send message"}
              </button>
              <button
                type="reset"
                onClick={() =>
                  setForm({ name: "", email: "", phone: "", message: "" })
                }
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
