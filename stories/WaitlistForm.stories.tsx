import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import WaitlistForm from "@/components/landing/WaitlistForm";

/*
 * The waitlist signup form. Every story here is offline: the signup request
 * is answered by a fake response in the browser, so nothing reaches the real
 * server, the database or the spam check. Only made-up addresses at
 * example.com are used.
 */

const FAKE_EMAIL = "owner@example.com";

type Respond = () => Promise<Response>;

const json = (status: number, body: unknown) =>
  Promise.resolve(
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }),
  );

/** Swap in a fake answer for the signup request, and put the real fetch back afterwards. */
function fakeSignup(respond: Respond) {
  return () => {
    const realFetch = window.fetch;
    window.fetch = (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url.includes("/api/waitlist")) return respond();
      return realFetch(input, init);
    };
    return () => {
      window.fetch = realFetch;
    };
  };
}

async function submit(canvasElement: HTMLElement, email: string) {
  const canvas = within(canvasElement);
  const input = await canvas.findByLabelText("Your email");
  // fireEvent.change fills the field the way React expects from a person typing.
  fireEvent.change(input, { target: { value: email } });
  await expect(input).toHaveValue(email);
  await userEvent.click(canvas.getByRole("button", { name: "Join the waitlist" }));
  return canvas;
}

const meta = {
  title: "Live site/WaitlistForm",
  component: WaitlistForm,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="lp-hero on-navy" style={{ padding: "var(--space-12)" }}>
        <div className="lp-pitch" style={{ maxWidth: 560 }}>
          <Story />
        </div>
      </div>
    ),
  ],
  // Default for every story: a successful signup.
  beforeEach: fakeSignup(() => json(200, { status: "ok" })),
} satisfies Meta<typeof WaitlistForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The form as it first appears. */
export const Empty: Story = {};

/** An address that fails the check in the browser; nothing is sent. */
export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = await submit(canvasElement, "not-an-email");
    await expect(await canvas.findByRole("alert")).toHaveTextContent("doesn't look quite right");
  },
};

/** Waiting for the server (the fake answer never arrives). */
export const Sending: Story = {
  beforeEach: fakeSignup(() => new Promise<Response>(() => {})),
  play: async ({ canvasElement }) => {
    const canvas = await submit(canvasElement, FAKE_EMAIL);
    await expect(await canvas.findByRole("button", { name: "Joining…" })).toBeDisabled();
  },
};

/** A new signup. */
export const Joined: Story = {
  play: async ({ canvasElement }) => {
    const canvas = await submit(canvasElement, FAKE_EMAIL);
    await expect(await canvas.findByText("You're on the list.")).toBeVisible();
  },
};

/** The address was already on the waitlist. */
export const AlreadyOnList: Story = {
  beforeEach: fakeSignup(() => json(200, { status: "already" })),
  play: async ({ canvasElement }) => {
    const canvas = await submit(canvasElement, FAKE_EMAIL);
    await expect(await canvas.findByText("You're already on the list.")).toBeVisible();
  },
};

/** The server had a problem. */
export const ServerError: Story = {
  beforeEach: fakeSignup(() => json(500, { error: "server" })),
  play: async ({ canvasElement }) => {
    const canvas = await submit(canvasElement, FAKE_EMAIL);
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Something went wrong on our side");
  },
};
