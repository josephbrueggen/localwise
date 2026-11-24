import type { StorybookConfig } from "@storybook/nextjs-vite";

/*
 * Storybook for the live Localwise components (landing page and Privacy and
 * contact page). The parked homepage has no stories on purpose.
 * Runs locally with `npm run storybook`; the static build goes to
 * storybook-static/ (gitignored).
 */
const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-mcp"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // Stories never load the real spam check.
  env: (config) => ({ ...config, NEXT_PUBLIC_TURNSTILE_SITE_KEY: "" }),
  // No usage data sent to Storybook.
  core: { disableTelemetry: true },
};

export default config;
