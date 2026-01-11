import { basePath } from "../lib/path";
import { IconBrandGithub, IconSun } from "./Icons";

type NavItem = {
  href: string;
  label: string;
  id: string;
};

const navItems: NavItem[] = [
  { href: basePath("/"), label: "Home", id: "home" },
  { href: basePath("/features"), label: "Features", id: "features" },
  { href: basePath("/install"), label: "Install", id: "install" },
];

export function Header({ current }: { current: string }) {
  return (
    <header class="site-header">
      <div class="nav-container">
        <a href={basePath("/")} class="logo-link">
          <img src={basePath("/images/logo.svg")} alt="Arto" class="logo-img" />
          <span>Arto</span>
        </a>
        <nav class="site-nav">
          {navItems.map((item) => (
            <a
              href={item.href}
              class="nav-link"
              aria-current={current === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            class="theme-toggle"
            id="theme-toggle"
            aria-label="Toggle theme"
          >
            <IconSun size={20} stroke={2} />
          </button>
          <a
            href="https://github.com/arto-app/Arto"
            class="github-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <IconBrandGithub size={20} stroke={2} />
          </a>
        </nav>
      </div>
    </header>
  );
}
