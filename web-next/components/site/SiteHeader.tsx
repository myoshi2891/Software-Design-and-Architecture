"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavLink, navLinks } from "./nav-links";
import { SiteHeaderClient } from "./SiteHeaderClient";

const GITHUB_URL = "https://github.com/myoshi2891/Software-Design-and-Architecture";

/**
 * Determines whether a link matches the current path.
 *
 * @param href - The link target to compare.
 * @param pathname - The current path.
 * @returns `true` if `href` exactly matches `pathname`, `false` otherwise.
 */
function isActivePath(href: string, pathname: string): boolean {
  return href === pathname;
}

/**
 * Determines whether any child link matches the current path.
 *
 * @param link - The navigation item to inspect
 * @param pathname - The current route path
 * @returns `true` if the link has children and one child href exactly matches `pathname`, `false` otherwise.
 */
function isParentActive(link: NavLink, pathname: string): boolean {
  if (!("children" in link)) return false;
  return link.children.some((c) => isActivePath(c.href, pathname));
}

/**
 * Renders the shared site header with global navigation.
 *
 * Uses `pathnameProp` when provided, otherwise the current router pathname, and falls back to `/`.
 * Marks the matching navigation link as active, propagates active state to parent dropdowns, and
 * appends an external GitHub link.
 *
 * @param pathnameProp - Optional pathname used instead of the current router pathname.
 */
export function SiteHeader({ pathname: pathnameProp }: { pathname?: string } = {}) {
  const fromHook = usePathname();
  const pathname = pathnameProp ?? fromHook ?? "/";

  return (
    <SiteHeaderClient>
      <nav id="common-header" aria-label="Main Navigation" className="ch-nav">
        <Link className="ch-brand" href="/general/comprehensive-guide">
          設計手法ガイド
        </Link>
        <button
          type="button"
          className="ch-hamburger"
          aria-controls="ch-menu"
          aria-expanded="false"
          aria-label="Toggle menu"
        >
          <span className="ch-bar" />
          <span className="ch-bar" />
          <span className="ch-bar" />
        </button>
        <ul id="ch-menu" className="ch-links">
          {navLinks.map((link) => {
            if ("children" in link) {
              const parentActive = isParentActive(link, pathname);
              return (
                <li key={link.name} className="ch-dropdown">
                  <button
                    type="button"
                    className={`ch-dropdown-toggle${parentActive ? " ch-active" : ""}`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span>{link.name}</span>
                  </button>
                  <ul className="ch-submenu">
                    {link.children.map((c) => {
                      const active = isActivePath(c.href, pathname);
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={active ? "ch-active" : undefined}
                            aria-current={active ? "page" : undefined}
                          >
                            {c.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
            const active = isActivePath(link.href, pathname);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={active ? "ch-active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub（新しいタブで開く）"
            >
              GitHub
              <span aria-hidden="true">{"↗"}</span>
            </a>
          </li>
        </ul>
      </nav>
    </SiteHeaderClient>
  );
}
