import { useState } from "react";

export default function AWSThemeLayout({
  accountName,
  services,
  activeServiceId,
  onSelectService,
  breadcrumbs,
  pageTitle,
  pageSubtitle,
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className="aws-console">
      <header className="aws-topbar">
        <div className="aws-topbar-left">
          <div className="aws-brand" aria-label="Portfolio Console">
            <span className="aws-brand-mark">PN</span>
            <span className="aws-brand-text">Portfolio Console</span>
          </div>

          <button
            type="button"
            className="aws-topbar-btn"
            aria-label="Services"
          >
            Services
            <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M3 6l5 5 5-5H3z" />
            </svg>
          </button>
        </div>

        <div className="aws-search-wrap" role="search">
          <span className="aws-search-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" />
            </svg>
          </span>
          <input
            type="search"
            className="aws-search-input"
            placeholder="Search for services, features, blogs, docs..."
            aria-label="Global console search"
          />
          <span className="aws-search-shortcut" aria-hidden="true">
            /
          </span>
        </div>

        <div className="aws-topbar-right">
          <button
            type="button"
            className="aws-topbar-icon aws-help-btn"
            aria-label="Help"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
              <path
                d="M6.7 6.1a1.4 1.4 0 1 1 2.52.86c-.42.56-1.22.87-1.22 1.8"
                stroke="currentColor"
              />
              <circle cx="8" cy="11.7" r="0.6" fill="currentColor" />
            </svg>
          </button>

          <button
            type="button"
            className="aws-topbar-icon aws-notification-btn"
            aria-label="Notifications"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2.3a2.4 2.4 0 0 0-2.4 2.4v1.2c0 .8-.23 1.57-.67 2.24L4 9.9h8l-.93-1.76a4.03 4.03 0 0 1-.67-2.24V4.7A2.4 2.4 0 0 0 8 2.3z"
                stroke="currentColor"
              />
              <path d="M6.6 11.2a1.4 1.4 0 0 0 2.8 0" stroke="currentColor" />
            </svg>
          </button>

          <button
            type="button"
            className="aws-topbar-menu aws-region-menu"
            aria-label="Region"
          >
            us-east-1
            <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M3 6l5 5 5-5H3z" />
            </svg>
          </button>

          <button
            type="button"
            className="aws-topbar-menu aws-account-menu"
            aria-label="Account menu"
          >
            <span className="aws-account-label-full">{accountName}</span>
            <span className="aws-account-label-short">Account</span>
            <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M3 6l5 5 5-5H3z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="aws-shell">
        <aside className={`aws-sidebar ${isCollapsed ? "is-collapsed" : ""}`}>
          <div className="aws-sidebar-head">
            {!isCollapsed && <span>Service categories</span>}

            <button
              type="button"
              className={`aws-sidebar-toggle ${isCollapsed ? "is-collapsed" : ""}`}
              onClick={() => setIsCollapsed((current) => !current)}
              aria-label={
                isCollapsed
                  ? "Expand services navigation"
                  : "Collapse services navigation"
              }
              aria-expanded={!isCollapsed}
            >
              <svg
                className="aws-sidebar-toggle-chevron"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M10.5 3.5L6 8l4.5 4.5" stroke="currentColor" />
              </svg>
              {!isCollapsed && <span>Collapse</span>}
            </button>
          </div>

          <nav className="aws-service-nav" aria-label="Console services">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = service.id === activeServiceId;

              return (
                <button
                  key={service.id}
                  type="button"
                  className={`aws-service-item ${isActive ? "is-active" : ""}`}
                  onClick={() => onSelectService(service.id)}
                  title={`${service.group} - ${service.label}`}
                >
                  <span className="aws-service-icon" aria-hidden="true">
                    <Icon />
                  </span>

                  {!isCollapsed && (
                    <span className="aws-service-copy">
                      <span className="aws-service-group">{service.group}</span>
                      <span className="aws-service-label">{service.label}</span>
                    </span>
                  )}

                  {!isCollapsed && typeof service.count === "number" && (
                    <span className="aws-service-count">{service.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="aws-main">
          <div className="aws-main-inner">
            <nav className="aws-breadcrumbs" aria-label="Breadcrumbs">
              {(breadcrumbs || []).map((crumb, index) => (
                <span key={`${crumb}-${index}`}>
                  {index > 0 && (
                    <span className="aws-breadcrumb-sep">&gt;</span>
                  )}
                  <span>{crumb}</span>
                </span>
              ))}
            </nav>

            <div className="aws-page-row">
              <div>
                <h1 className="aws-page-title">{pageTitle}</h1>
                <p className="aws-page-subtitle">{pageSubtitle}</p>
              </div>

              <div className="aws-actions">
                <button
                  type="button"
                  className="aws-btn-primary"
                  onClick={() => onSelectService("contact")}
                >
                  Contact
                </button>
                <button
                  type="button"
                  className="aws-btn-secondary"
                  onClick={() => onSelectService("projects")}
                >
                  Projects
                </button>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </section>
  );
}
