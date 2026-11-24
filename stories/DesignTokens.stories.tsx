/// <reference types="vite/client" />
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import tokensCss from "../design-tokens.css?raw";

/*
 * Design tokens, read straight from design-tokens.css so this page can never
 * drift from the real values. Grouped by the comments in that file.
 */

type Token = { name: string; value: string };
type Group = { title: string; tokens: Token[] };

function parseTokens(css: string): Group[] {
  const root = css.slice(css.indexOf(":root"));
  const groups: Group[] = [];
  let current: Group = { title: "Tokens", tokens: [] };
  for (const line of root.split("\n")) {
    const heading = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/);
    if (heading) {
      if (current.tokens.length) groups.push(current);
      current = { title: heading[1], tokens: [] };
      continue;
    }
    const token = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);/);
    if (token) current.tokens.push({ name: token[1], value: token[2] });
  }
  if (current.tokens.length) groups.push(current);
  return groups;
}

const groups = parseTokens(tokensCss);

const mono: React.CSSProperties = { fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 };
const label: React.CSSProperties = { ...mono, color: "var(--color-muted)" };

function Preview({ name }: { name: string }) {
  const v = `var(${name})`;
  if (name.startsWith("--color-"))
    return (
      <div
        style={{
          width: 56,
          height: 40,
          borderRadius: 8,
          background: v,
          border: "1px solid var(--color-border)",
        }}
      />
    );
  if (name.startsWith("--font-weight-"))
    return <span style={{ fontFamily: "var(--font-heading)", fontWeight: v, fontSize: 20 }}>Localwise</span>;
  if (name.startsWith("--font-"))
    return <span style={{ fontFamily: v, fontSize: 20 }}>Juniper Street Bakery</span>;
  if (name.startsWith("--text-"))
    return <span style={{ fontFamily: "var(--font-heading)", fontSize: v, lineHeight: 1.1 }}>Aa</span>;
  if (name.startsWith("--space-"))
    return <div style={{ width: v, height: 12, background: "var(--color-sky)", borderRadius: 2 }} />;
  if (name.startsWith("--radius-"))
    return (
      <div
        style={{
          width: 56,
          height: 40,
          borderRadius: v,
          background: "var(--color-tint)",
          border: "2px solid var(--color-accent)",
        }}
      />
    );
  if (name.startsWith("--shadow-"))
    return <div style={{ width: 72, height: 40, borderRadius: 10, background: "var(--color-surface)", boxShadow: v }} />;
  if (name.startsWith("--opacity-"))
    return <div style={{ width: 56, height: 40, borderRadius: 8, background: "var(--color-accent)", opacity: v }} />;
  return null;
}

function TokensPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-body)", maxWidth: 960 }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", margin: "0 0 8px" }}>
        Localwise design tokens
      </h1>
      <p style={{ color: "var(--color-muted)", margin: "0 0 32px" }}>
        From design-tokens.css, the same names and values as the Paper file &ldquo;Localwise design system&rdquo;.
        Use them in code as <code style={mono}>var(--name)</code>.
      </p>
      {groups.map((g) => (
        <section key={g.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h5)", margin: "0 0 12px" }}>
            {g.title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {g.tokens.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 12,
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 10,
                  minHeight: 64,
                }}
              >
                <div style={{ flexShrink: 0, minWidth: 56, display: "flex", justifyContent: "center" }}>
                  <Preview name={t.name} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ ...mono, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ ...label, overflowWrap: "anywhere" }}>{t.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Design tokens",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {
  name: "All tokens",
  render: () => <TokensPage />,
};
