import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Logo from "@/components/Logo";

const meta = {
  title: "Live site/Logo",
  component: Logo,
  args: { size: 36 },
  argTypes: { size: { control: { type: "range", min: 16, max: 160, step: 4 } } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = { args: { size: 120 } };

export const OnNavy: Story = {
  args: { size: 48 },
  render: (args) => (
    <div style={{ background: "var(--color-navy)", padding: "var(--space-6)", display: "inline-block" }}>
      <Logo {...args} />
    </div>
  ),
};
