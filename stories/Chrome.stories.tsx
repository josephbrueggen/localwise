import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter, TopBar } from "@/components/landing/Chrome";

/* The shared top bar and footer of the landing and Privacy and contact pages. */
const meta = {
  title: "Live site/Chrome",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
  render: () => (
    <header className="lp-header-solid on-navy">
      <TopBar />
    </header>
  ),
};

export const Footer: Story = {
  render: () => <SiteFooter />,
};
