import { useMemo, useState } from "react";
import profile from "../../../data/profile.json";
import projects from "../../../data/projects.json";
import pastWork from "../../../data/past_work.json";
import certs from "../../../data/certs.json";
import AWSThemeLayout from "./AWSThemeLayout";
import "./awsConsole.css";

export default function AwsHome() {
  const about = profile?.about ?? {};
  const contact = profile?.contact ?? {};
  const socials = profile?.socials ?? {};

  const projectItems = Array.isArray(projects) ? projects : [];
  const experienceItems = Array.isArray(profile?.experience)
    ? profile.experience
    : [];
  const skillGroups = Object.entries(profile?.skills ?? {}).filter(
    ([, items]) => Array.isArray(items) && items.length,
  );
  const educationItems = Array.isArray(profile?.education)
    ? profile.education
    : [];
  const certItems = Array.isArray(certs) ? certs : [];
  const pastWorkItems = Array.isArray(pastWork) ? pastWork : [];

  const skillCount = useMemo(
    () => skillGroups.reduce((count, [, items]) => count + items.length, 0),
    [skillGroups],
  );

  const roleList = Array.isArray(about.title)
    ? about.title.filter(Boolean)
    : [about.title].filter(Boolean);

  const services = useMemo(
    () => [
      {
        id: "overview",
        group: "Management & Governance",
        label: "Career Overview",
        title: "Management & Governance / Career Overview",
        subtitle:
          "Professional snapshot ordered for recruiter and client review",
        breadcrumbLeaf: about.name,
        count: roleList.length || 1,
        icon: GovernanceIcon,
      },
      {
        id: "experience",
        group: "Analytics",
        label: "Experience Timeline",
        title: "Analytics / Experience Timeline",
        subtitle: `${experienceItems.length} experience records from profile.experience`,
        breadcrumbLeaf: experienceItems[0]?.role,
        count: experienceItems.length,
        icon: AnalyticsIcon,
      },
      {
        id: "past-work",
        group: "Storage",
        label: "Past Work",
        title: "Storage / Past Work",
        subtitle: `${pastWorkItems.length} historic deployment records from past_work.json`,
        breadcrumbLeaf: pastWorkItems[0]?.title,
        count: pastWorkItems.length,
        icon: StorageIcon,
      },
      {
        id: "projects",
        group: "Compute",
        label: "Project Workloads",
        title: "Compute / Project Workloads",
        subtitle: `${projectItems.length} projects from projects.json`,
        breadcrumbLeaf: projectItems[0]?.projectName,
        count: projectItems.length,
        icon: ComputeIcon,
      },
      {
        id: "skills",
        group: "Developer Tools",
        label: "Skill Inventory",
        title: "Developer Tools / Skill Inventory",
        subtitle: `${skillCount} technologies across ${skillGroups.length} categories`,
        breadcrumbLeaf: formatLabel(skillGroups[0]?.[0]),
        count: skillGroups.length,
        icon: DatabaseIcon,
      },
      {
        id: "certifications",
        group: "Security, Identity, & Compliance",
        label: "Certifications",
        title: "Security, Identity, & Compliance / Certifications",
        subtitle: `${certItems.length} certification entries from certs.json`,
        breadcrumbLeaf: certItems[0]?.title,
        count: certItems.length,
        icon: SecurityIcon,
      },
      {
        id: "education",
        group: "Networking & Content Delivery",
        label: "Education Records",
        title: "Networking & Content Delivery / Education Records",
        subtitle: `${educationItems.length} education records from profile.education`,
        breadcrumbLeaf: educationItems[0]?.level,
        count: educationItems.length,
        icon: NetworkIcon,
      },
      {
        id: "contact",
        group: "Business Applications",
        label: "Contact Form",
        title: "Business Applications / Contact Form",
        subtitle: "Direct inquiry flow with submission support",
        breadcrumbLeaf: contact.location,
        count: Object.values(contact).filter(Boolean).length,
        icon: ContactIcon,
      },
    ],
    [
      about,
      contact,
      roleList.length,
      experienceItems,
      projectItems,
      skillCount,
      skillGroups,
      certItems,
      educationItems,
      pastWorkItems,
    ],
  );

  const [activeServiceId, setActiveServiceId] = useState(
    () => services[0]?.id ?? "overview",
  );

  const activeService =
    services.find((service) => service.id === activeServiceId) ?? services[0];

  const breadcrumbs = [
    "Portfolio",
    activeService?.group,
    activeService?.breadcrumbLeaf,
  ].filter(Boolean);

  return (
    <AWSThemeLayout
      accountName={about.name || "Account"}
      services={services}
      activeServiceId={activeServiceId}
      onSelectService={setActiveServiceId}
      breadcrumbs={breadcrumbs}
      pageTitle={activeService?.title || "Portfolio Console"}
      pageSubtitle={activeService?.subtitle || ""}
    >
      {renderConsoleView({
        activeServiceId,
        about,
        contact,
        socials,
        roleList,
        projectItems,
        experienceItems,
        skillGroups,
        educationItems,
        certItems,
        pastWorkItems,
      })}
    </AWSThemeLayout>
  );
}

function renderConsoleView({
  activeServiceId,
  about,
  contact,
  socials,
  roleList,
  projectItems,
  experienceItems,
  skillGroups,
  educationItems,
  certItems,
  pastWorkItems,
}) {
  switch (activeServiceId) {
    case "overview":
      return (
        <OverviewPanel
          about={about}
          contact={contact}
          roleList={roleList}
          projectCount={projectItems.length}
          experienceCount={experienceItems.length}
          skillCount={skillGroups.reduce(
            (count, [, items]) => count + items.length,
            0,
          )}
          certCount={certItems.length}
          educationCount={educationItems.length}
        />
      );
    case "experience":
      return <ExperiencePanel items={experienceItems} />;
    case "projects":
      return <ProjectsPanel items={projectItems} />;
    case "skills":
      return <SkillsPanel groups={skillGroups} />;
    case "certifications":
      return <CertificationsPanel items={certItems} />;
    case "education":
      return <EducationPanel items={educationItems} />;
    case "contact":
      return <ContactPanel about={about} contact={contact} socials={socials} />;
    case "past-work":
      return <PastWorkPanel items={pastWorkItems} />;
    default:
      return (
        <OverviewPanel about={about} contact={contact} roleList={roleList} />
      );
  }
}

function OverviewPanel({
  about,
  contact,
  roleList,
  projectCount = 0,
  experienceCount = 0,
  skillCount = 0,
  certCount = 0,
  educationCount = 0,
}) {
  return (
    <div className="aws-panel-stack">
      <div className="aws-summary-grid">
        <SummaryItem label="Name" value={about.name} />
        <SummaryItem label="Primary Role" value={roleList[0]} />
        <SummaryItem label="Location" value={contact.location} />
        <SummaryItem label="Experience" value={`${experienceCount} records`} />
        <SummaryItem label="Projects" value={`${projectCount} workloads`} />
      </div>

      <div className="aws-overview-grid">
        <article className="aws-widget-card">
          <header className="aws-widget-head">
            <span>Career Summary</span>
          </header>
          <div className="aws-widget-body">
            <div className="aws-profile-hero">
              {about.image && (
                <img
                  src={about.image}
                  alt={about.name || "Profile photo"}
                  className="aws-profile-photo"
                />
              )}
              <div className="aws-profile-copy">
                <h3 className="aws-profile-name">{about.name}</h3>
                <p className="aws-profile-role">{roleList[0] || "-"}</p>
              </div>
            </div>

            <p className="aws-paragraph">{about.summary}</p>
            {roleList.length > 0 && (
              <div className="aws-tags">
                {roleList.map((role) => (
                  <span key={role} className="aws-tag">
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        <article className="aws-widget-card">
          <header className="aws-widget-head">
            <span>Portfolio Snapshot</span>
          </header>
          <div className="aws-widget-body">
            <ul className="aws-simple-list">
              <li>
                <span className="aws-simple-k">Experience entries</span>
                <span className="aws-simple-v">{experienceCount}</span>
              </li>
              <li>
                <span className="aws-simple-k">Project entries</span>
                <span className="aws-simple-v">{projectCount}</span>
              </li>
              <li>
                <span className="aws-simple-k">Tracked technologies</span>
                <span className="aws-simple-v">{skillCount}</span>
              </li>
              <li>
                <span className="aws-simple-k">Certifications</span>
                <span className="aws-simple-v">{certCount}</span>
              </li>
              <li>
                <span className="aws-simple-k">Education records</span>
                <span className="aws-simple-v">{educationCount}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

function ExperiencePanel({ items }) {
  if (!items.length) {
    return <div className="aws-empty">No experience records available.</div>;
  }

  return (
    <div className="aws-widget-grid">
      {items.map((item, index) => (
        <article
          key={`${item.role || "role"}-${index}`}
          className="aws-widget-card"
        >
          <header className="aws-widget-head">
            <span>{item.role}</span>
            <span className="aws-widget-meta">{item.duration}</span>
          </header>
          <div className="aws-widget-body">
            <dl className="aws-kv">
              <dt>Company</dt>
              <dd>{item.company}</dd>

              <dt>Duration</dt>
              <dd>{item.duration}</dd>

              <dt>Description</dt>
              <dd>{item.description}</dd>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectsPanel({ items }) {
  if (!items.length) {
    return <div className="aws-empty">No project records available.</div>;
  }

  return (
    <div className="aws-widget-grid">
      {items.map((project, index) => (
        <article
          key={`${project.projectName || "project"}-${index}`}
          className="aws-widget-card"
        >
          <header className="aws-widget-head">
            <span>{project.projectName}</span>
            <span className="aws-widget-meta">
              {toResourceId(project.projectName, index, "ec2")}
            </span>
          </header>
          <div className="aws-widget-body">
            {project.projectImage && (
              <img
                src={project.projectImage}
                alt={project.projectName || "Project image"}
                className="aws-image"
              />
            )}

            <dl className="aws-kv">
              <dt>Brief</dt>
              <dd>{project.projectBrief}</dd>

              <dt>Description</dt>
              <dd>{project.projectDetailDescription}</dd>

              <dt>Timeline</dt>
              <dd>{project.projectTimeline}</dd>

              <dt>Live Endpoint</dt>
              <dd>{renderLinkOrText(project.projectLiveLink)}</dd>

              <dt>Source</dt>
              <dd>{renderLinkOrText(project.projectGithubLink)}</dd>
            </dl>

            {Array.isArray(project.technologies) &&
              project.technologies.length > 0 && (
                <div className="aws-tags">
                  {project.technologies.map((technology) => (
                    <span
                      key={`${project.projectName}-${technology}`}
                      className="aws-tag"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsPanel({ groups }) {
  const normalized = groups.map(([groupKey, items]) => ({
    key: groupKey,
    label: formatLabel(groupKey),
    items: items
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.name || item?.label || JSON.stringify(item),
      )
      .filter(Boolean),
  }));

  if (!normalized.length) {
    return <div className="aws-empty">No skill inventory data available.</div>;
  }

  const totalSkills = normalized.reduce(
    (count, group) => count + group.items.length,
    0,
  );
  const maxSkills = Math.max(
    ...normalized.map((group) => group.items.length),
    1,
  );

  const clusters = [
    {
      title: "Core Engineering",
      subtitle: "Languages, frontend, backend, and databases",
      keys: ["languages", "frontend", "backend", "database"],
    },
    {
      title: "Cloud & DevOps",
      subtitle: "Cloud platforms and delivery tooling",
      keys: ["cloud", "devops", "tools"],
    },
    {
      title: "Delivery Practices",
      subtitle: "Operational and engineering practice skills",
      keys: ["other"],
    },
  ]
    .map((cluster) => ({
      ...cluster,
      groups: normalized.filter((group) => cluster.keys.includes(group.key)),
    }))
    .filter((cluster) => cluster.groups.length > 0);

  return (
    <div className="aws-panel-stack">
      <div className="aws-summary-grid">
        <SummaryItem label="Skill Categories" value={normalized.length} />
        <SummaryItem label="Technologies" value={totalSkills} />
        <SummaryItem
          label="Largest Category"
          value={
            normalized.sort((a, b) => b.items.length - a.items.length)[0]?.label
          }
        />
      </div>

      <div className="aws-skill-track-grid">
        {clusters.map((cluster) => (
          <article key={cluster.title} className="aws-widget-card">
            <header className="aws-widget-head">
              <span>{cluster.title}</span>
              <span className="aws-widget-meta">{cluster.subtitle}</span>
            </header>

            <div className="aws-widget-body aws-skill-stack">
              {cluster.groups.map((group) => (
                <section key={group.key} className="aws-skill-group">
                  <div className="aws-skill-group-head">
                    <h3>{group.label}</h3>
                    <span>{group.items.length}</span>
                  </div>
                  <div className="aws-skill-meter" aria-hidden="true">
                    <span
                      style={{
                        width: `${Math.round((group.items.length / maxSkills) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="aws-tags">
                    {group.items.map((item) => (
                      <span key={`${group.key}-${item}`} className="aws-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CertificationsPanel({ items }) {
  const rows = items.map((item, index) => ({
    id: `cert-${item.id || index}`,
    cells: [
      item.title,
      item.issuer,
      item.date,
      renderCertificateAction(item.certificateUrl),
    ],
  }));

  return (
    <AwsTable
      columns={["Certification", "Issuer", "Date", "Certificate"]}
      rows={rows}
    />
  );
}

function EducationPanel({ items }) {
  const rows = items.map((item, index) => ({
    id: `education-${index}`,
    cells: [item.level, item.board, item.school, item.year, item.percentage],
  }));

  return (
    <AwsTable
      columns={["Level", "Board / Program", "Institution", "Year", "Score"]}
      rows={rows}
    />
  );
}

function ContactPanel({ about, contact, socials }) {
  const titleValue = Array.isArray(about.title)
    ? about.title.join(" | ")
    : about.title;

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

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Failed to send");
      }

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: "",
      });
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus({
        loading: false,
        success: "",
        error: String(error.message || error),
      });
    }
  }

  return (
    <div className="aws-panel-stack">
      <div className="aws-summary-grid">
        <SummaryItem label="Name" value={about.name} />
        <SummaryItem label="Role" value={titleValue} />
        <SummaryItem label="Email" value={contact.email} />
        <SummaryItem label="Phone" value={contact.phone} />
        <SummaryItem label="Location" value={contact.location} />
      </div>

      <div className="aws-contact-grid">
        <article className="aws-widget-card">
          <header className="aws-widget-head">
            <span>Contact details</span>
          </header>
          <div className="aws-widget-body">
            <dl className="aws-kv">
              <dt>Email</dt>
              <dd>{contact.email}</dd>
              <dt>Phone</dt>
              <dd>{contact.phone}</dd>
              <dt>Location</dt>
              <dd>{contact.location}</dd>
            </dl>

            {(socials.github ||
              socials.linkedin ||
              socials.X ||
              socials.instagram) && (
              <div className="aws-inline-links">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="aws-link-chip"
                  >
                    GitHub
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="aws-link-chip"
                  >
                    LinkedIn
                  </a>
                )}
                {socials.X && (
                  <a
                    href={socials.X}
                    target="_blank"
                    rel="noreferrer"
                    className="aws-link-chip"
                  >
                    X
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="aws-link-chip"
                  >
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </article>

        <article className="aws-widget-card">
          <header className="aws-widget-head">
            <span>Send a message</span>
          </header>
          <form className="aws-widget-body aws-form" onSubmit={onSubmit}>
            <label className="aws-field" htmlFor="aws-contact-name">
              <span>Name *</span>
              <input
                id="aws-contact-name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="aws-input"
                placeholder="John Doe"
              />
            </label>

            <label className="aws-field" htmlFor="aws-contact-email">
              <span>Email *</span>
              <input
                id="aws-contact-email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="aws-input"
                placeholder="john@example.com"
              />
            </label>

            <label
              className="aws-field aws-field-full"
              htmlFor="aws-contact-phone"
            >
              <span>Phone</span>
              <input
                id="aws-contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                className="aws-input"
                placeholder="+91 98765 43210"
              />
            </label>

            <label
              className="aws-field aws-field-full"
              htmlFor="aws-contact-message"
            >
              <span>Message *</span>
              <textarea
                id="aws-contact-message"
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                className="aws-textarea"
                placeholder="Tell me a bit about your project..."
              />
            </label>

            {status.error && (
              <div className="aws-status-error" role="alert">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="aws-status-success" role="status">
                {status.success}
              </div>
            )}

            <div className="aws-form-actions">
              <button
                type="submit"
                className="aws-btn-primary"
                disabled={status.loading}
              >
                {status.loading ? "Sending..." : "Send message"}
              </button>
              <button
                type="button"
                className="aws-btn-secondary"
                onClick={() => {
                  setValues({ name: "", email: "", phone: "", message: "" });
                  setStatus({ loading: false, success: "", error: "" });
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

function PastWorkPanel({ items }) {
  if (!items.length) {
    return <div className="aws-empty">No past work records available.</div>;
  }

  return (
    <div className="aws-widget-grid">
      {items.map((work, index) => (
        <article
          key={`${work.title || "work"}-${index}`}
          className="aws-widget-card"
        >
          <header className="aws-widget-head">
            <span>{work.title}</span>
            <span className="aws-widget-meta">
              {toResourceId(work.title, index, "s3")}
            </span>
          </header>

          <div className="aws-widget-body">
            {work.image && (
              <img
                src={work.image}
                alt={work.title || "Work image"}
                className="aws-image"
              />
            )}

            <dl className="aws-kv">
              <dt>Status</dt>
              <dd>{work.status}</dd>

              <dt>Description</dt>
              <dd>{work.description}</dd>

              <dt>Live URL</dt>
              <dd>{renderLinkOrText(work.live)}</dd>

              <dt>Preview URL</dt>
              <dd>{renderLinkOrText(work.iframe)}</dd>
            </dl>

            {Array.isArray(work.tech) && work.tech.length > 0 && (
              <div className="aws-tags">
                {work.tech.map((item) => (
                  <span key={`${work.title}-${item}`} className="aws-tag">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function AwsTable({ columns, rows }) {
  if (!rows.length) {
    return (
      <div className="aws-empty">No entries available for this service.</div>
    );
  }

  return (
    <div className="aws-table-shell">
      <table className="aws-table">
        <thead>
          <tr>
            <th className="aws-checkbox-col">
              <input
                type="checkbox"
                className="aws-checkbox"
                aria-label="Select all rows"
              />
            </th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="aws-checkbox-col">
                <input
                  type="checkbox"
                  className="aws-checkbox"
                  aria-label="Select row"
                />
              </td>
              {row.cells.map((cell, cellIndex) => (
                <td key={`${row.id}-${cellIndex}`}>
                  {cell || <span className="aws-widget-meta">-</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="aws-summary-item">
      <p className="aws-summary-k">{label}</p>
      <p className="aws-summary-v">{value || "-"}</p>
    </div>
  );
}

function renderLinkOrText(value) {
  if (!value) {
    return "-";
  }

  if (isHttpUrl(value)) {
    return (
      <a className="aws-link" href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    );
  }

  return value;
}

function renderCertificateAction(value) {
  if (!value) {
    return <span className="aws-widget-meta">Unavailable</span>;
  }

  if (isHttpUrl(value)) {
    return (
      <a
        className="aws-link-action"
        href={value}
        target="_blank"
        rel="noreferrer"
        title="Open certificate"
      >
        <span>View Certificate</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 8h10" stroke="currentColor" />
          <path d="M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" />
        </svg>
      </a>
    );
  }

  return value;
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value));
}

function formatLabel(value) {
  return String(value || "")
    .replace(/[_\-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function toResourceId(value, index, prefix) {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${prefix}-${slug || "item"}-${index + 1}`;
}

function ComputeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="2.5"
        width="13"
        height="4"
        rx="1"
        stroke="currentColor"
      />
      <rect
        x="1.5"
        y="9.5"
        width="13"
        height="4"
        rx="1"
        stroke="currentColor"
      />
      <circle cx="4" cy="4.5" r="0.9" fill="currentColor" />
      <circle cx="4" cy="11.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 13.5h12" stroke="currentColor" />
      <rect x="3" y="8" width="2" height="4.5" fill="currentColor" />
      <rect x="7" y="5" width="2" height="7.5" fill="currentColor" />
      <rect x="11" y="3" width="2" height="9.5" fill="currentColor" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="8" cy="3.5" rx="5.5" ry="2" stroke="currentColor" />
      <path
        d="M2.5 3.5v4c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2v-4"
        stroke="currentColor"
      />
      <path
        d="M2.5 7.5v4c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2v-4"
        stroke="currentColor"
      />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="3" r="1.5" stroke="currentColor" />
      <circle cx="3" cy="12" r="1.5" stroke="currentColor" />
      <circle cx="13" cy="12" r="1.5" stroke="currentColor" />
      <path d="M8 4.5v3m0 0L4.5 10m3.5-2.5L11.5 10" stroke="currentColor" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1.8l4.7 1.7v3.3c0 3.2-2 5.7-4.7 7.4C5.3 12.5 3.3 10 3.3 6.8V3.5L8 1.8z"
        stroke="currentColor"
      />
      <path d="M6.4 7.8l1.1 1.1 2.2-2.3" stroke="currentColor" />
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 5.5l6-3 6 3-6 3-6-3z" stroke="currentColor" />
      <path d="M2 8.5l6 3 6-3" stroke="currentColor" />
      <path d="M2 11.5l6 3 6-3" stroke="currentColor" />
    </svg>
  );
}

function GovernanceIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.2" stroke="currentColor" />
      <path
        d="M8 1.8v2.1m0 8.2v2.1M1.8 8h2.1m8.2 0h2.1M3.4 3.4l1.5 1.5m6.2 6.2l1.5 1.5M12.6 3.4l-1.5 1.5M4.9 11.1l-1.5 1.5"
        stroke="currentColor"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" />
      <path d="M3 4l5 4 5-4" stroke="currentColor" />
    </svg>
  );
}
