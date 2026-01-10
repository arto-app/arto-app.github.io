// Type declarations for modules without type definitions

declare module "@tabler/icons/tabler-nodes-outline.json" {
  type TablerNode = [string, Record<string, string>];
  const icons: Record<string, TablerNode[]>;
  export default icons;
}
