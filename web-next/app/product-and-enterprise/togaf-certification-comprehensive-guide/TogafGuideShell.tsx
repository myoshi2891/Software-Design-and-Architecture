"use client";
import {
  IconBuildingArch,
  IconCertificate,
  IconDatabase,
  IconFileDescription,
  IconLayoutGrid,
  IconLink,
  IconListDetails,
  IconMap,
  IconRefresh,
  IconShieldCheck,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import { type ReactNode, useState } from "react";

const ICONS = {
  "building-arch": IconBuildingArch,
  certificate: IconCertificate,
  refresh: IconRefresh,
  "list-details": IconListDetails,
  "layout-grid": IconLayoutGrid,
  "file-description": IconFileDescription,
  database: IconDatabase,
  users: IconUsers,
  "shield-check": IconShieldCheck,
  target: IconTarget,
  map: IconMap,
  link: IconLink,
};
export type TogafNavGroup = {
  label: string;
  items: { id: string; label: string; icon: keyof typeof ICONS }[];
};
export type TogafPanel = { id: string; content: ReactNode };

/** Keeps selection interactive while receiving the complete chapter content from the server. */
export default function TogafGuideShell({
  groups,
  panels,
}: {
  groups: TogafNavGroup[];
  panels: TogafPanel[];
}) {
  const [activeId, setActiveId] = useState("overview");
  const panel = panels.find((item) => item.id === activeId);
  return (
    <div className="shell">
      <nav className="sidebar" aria-label="TOGAFガイドの目次">
        <div className="sidebar-logo">
          <div className="badge">TOGAF v10</div>
          <h1>完全解説ガイド</h1>
        </div>
        {groups.map((group) => (
          <div className="nav-section" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item${activeId === item.id ? " active" : ""}`}
                  aria-pressed={activeId === item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  <Icon size={15} className={`mvp-icon icon-${item.icon}`} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <main className="main">
        {panel && (
          <div key={panel.id} className="section active" id={panel.id}>
            {panel.content}
          </div>
        )}
      </main>
    </div>
  );
}
