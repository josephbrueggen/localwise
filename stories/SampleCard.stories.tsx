import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SampleCard from "@/components/landing/SampleCard";

/* The sample report card from the landing page. The shop is made up. */
const meta = {
  title: "Live site/SampleCard",
  component: SampleCard,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="lp-hero on-navy" style={{ padding: "var(--space-12)" }}>
        <div style={{ maxWidth: 520 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SampleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
