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
import { type KeyboardEvent, type ReactNode, useState } from "react";

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
  const order = groups.flatMap((group) => group.items.map((item) => item.id));
  const select = (id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0 });
  };
  // 縦方向タブリストのキーボード操作（上下は循環、Home/End は両端）
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const index = order.indexOf(id);
    const last = order.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const nextId = order[target];
    if (nextId === undefined) return;
    select(nextId);
    document.getElementById(`tab-${nextId}`)?.focus();
  };
  return (
    <div className="shell">
      <nav className="sidebar" aria-label="TOGAFガイドの目次">
        <div className="sidebar-logo">
          <div className="badge">TOGAF v10</div>
          <h1>完全解説ガイド</h1>
        </div>
        <div role="tablist" aria-label="章" aria-orientation="vertical">
          {groups.map((group) => (
            <div className="nav-section" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`tab-${item.id}`}
                    role="tab"
                    className={`nav-item${activeId === item.id ? " active" : ""}`}
                    aria-selected={activeId === item.id}
                    aria-controls={item.id}
                    tabIndex={activeId === item.id ? 0 : -1}
                    onClick={() => select(item.id)}
                    onKeyDown={(event) => handleKeyDown(event, item.id)}
                  >
                    <Icon size={15} className={`mvp-icon icon-${item.icon}`} aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>
      <main className="main">
        {panel && (
          <div
            key={panel.id}
            className="section active"
            id={panel.id}
            role="tabpanel"
            aria-labelledby={`tab-${panel.id}`}
          >
            {panel.content}
          </div>
        )}
      </main>
    </div>
  );
}
