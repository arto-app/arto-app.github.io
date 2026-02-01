// Tabler-icons components for Hono JSX
// SVG data imported from @tabler/icons package

import tablerIcons from "@tabler/icons/tabler-nodes-outline.json";
import {
  siGnuemacs,
  siHomebrew,
  siNeovim,
  siNixos,
  siRust,
  siVim,
} from "simple-icons";

type IconProps = {
  size?: number;
  stroke?: number;
  class?: string;
};

type TablerNode = [string, Record<string, string>];

// Helper to create icon component from tabler node data
function createIcon(nodes: TablerNode[]) {
  return function IconComponent(props: IconProps) {
    const { size = 24, stroke = 2, class: className } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
        class={className}
      >
        {nodes.map(([tag, attrs], i) => {
          if (tag === "path") {
            return <path key={i} d={attrs.d} />;
          }
          if (tag === "circle") {
            return (
              <circle key={i} cx={attrs.cx} cy={attrs.cy} r={attrs.r} />
            );
          }
          if (tag === "rect") {
            return (
              <rect
                key={i}
                x={attrs.x}
                y={attrs.y}
                width={attrs.width}
                height={attrs.height}
                rx={attrs.rx}
                ry={attrs.ry}
              />
            );
          }
          if (tag === "line") {
            return (
              <line
                key={i}
                x1={attrs.x1}
                y1={attrs.y1}
                x2={attrs.x2}
                y2={attrs.y2}
              />
            );
          }
          if (tag === "polyline") {
            return <polyline key={i} points={attrs.points} />;
          }
          if (tag === "polygon") {
            return <polygon key={i} points={attrs.points} />;
          }
          return null;
        })}
      </svg>
    );
  };
}

// Type assertion for the JSON import
const icons = tablerIcons as Record<string, TablerNode[]>;

// Export tabler icons used in this project
export const IconBolt = createIcon(icons["bolt"]);
export const IconBook = createIcon(icons["book"]);
export const IconBrandApple = createIcon(icons["brand-apple"]);
export const IconBrandGithub = createIcon(icons["brand-github"]);
export const IconBrandNodejs = createIcon(icons["brand-nodejs"]);
export const IconCheck = createIcon(icons["check"]);
export const IconCode = createIcon(icons["code"]);
export const IconCpu = createIcon(icons["cpu"]);
export const IconDeviceDesktop = createIcon(icons["device-desktop"]);
export const IconDownload = createIcon(icons["download"]);
export const IconInfoCircle = createIcon(icons["info-circle"]);
export const IconKeyboard = createIcon(icons["keyboard"]);
export const IconLayoutDashboard = createIcon(icons["layout-dashboard"]);
export const IconMoon = createIcon(icons["moon"]);
export const IconNavigation = createIcon(icons["navigation"]);
export const IconPlug = createIcon(icons["plug"]);
export const IconSearch = createIcon(icons["search"]);
export const IconSettings = createIcon(icons["settings"]);
export const IconSun = createIcon(icons["sun"]);
export const IconTerminal2 = createIcon(icons["terminal-2"]);
export const IconWifiOff = createIcon(icons["wifi-off"]);
export const IconWindow = createIcon(icons["window"]);

// Custom brand icons not available in tabler-icons

// Simple Icons - brand icons
function createSimpleIcon(icon: { path: string }) {
  return function SimpleIconComponent({ class: className }: IconProps) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        class={className}
      >
        <path d={icon.path} />
      </svg>
    );
  };
}

export const IconEmacs = createSimpleIcon(siGnuemacs);
export const IconHomebrew = createSimpleIcon(siHomebrew);
export const IconNeovim = createSimpleIcon(siNeovim);
export const IconNix = createSimpleIcon(siNixos);
export const IconRust = createSimpleIcon(siRust);
export const IconVim = createSimpleIcon(siVim);
