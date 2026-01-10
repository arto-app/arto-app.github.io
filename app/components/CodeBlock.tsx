type CodeBlockProps = {
  label: string;
  code: string;
};

export function CodeBlock({ label, code }: CodeBlockProps) {
  return (
    <div class="code-block">
      <div class="code-header">
        <span class="code-label">{label}</span>
        <button
          type="button"
          class="copy-btn"
          onclick={`navigator.clipboard.writeText(\`${code.replace(/`/g, "\\`")}\`)`}
        >
          Copy
        </button>
      </div>
      <div class="code-content">
        <code>{code}</code>
      </div>
    </div>
  );
}
