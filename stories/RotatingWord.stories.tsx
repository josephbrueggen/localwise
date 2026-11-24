import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RotatingWord from "@/components/landing/RotatingWord";

/*
 * The cycling word in the landing headline. It cycles every 2.6 seconds and
 * stays on "shop" when the viewer prefers reduced motion.
 */
const meta = {
  title: "Live site/RotatingWord",
  component: RotatingWord,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RotatingWord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InHeadline: Story = {
  render: () => (
    <div className="lp-hero on-navy" style={{ padding: "var(--space-12)" }}>
      <h1 className="lp-title" style={{ margin: 0 }}>
        Simple, actionable insights for your local <RotatingWord />
      </h1>
    </div>
  ),
};
