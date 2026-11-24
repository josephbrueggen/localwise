import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroMap } from "@/components/Illustrations";

/*
 * Decorative illustrations used on the live site. Only HeroMap (the street map
 * behind the landing hero) is live; the other drawings in Illustrations.tsx
 * belong to the parked homepage and have no stories.
 */
const meta = {
  title: "Live site/Illustrations",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroMapBackground: Story = {
  name: "HeroMap",
  render: () => (
    <div className="lp-hero on-navy" style={{ minHeight: 480 }}>
      <HeroMap />
    </div>
  ),
};
