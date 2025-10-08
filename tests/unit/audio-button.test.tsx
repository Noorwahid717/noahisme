/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("howler", () => {
  const play = vi.fn(() => 1);
  const stop = vi.fn();
  const unload = vi.fn();
  const playing = vi.fn(() => false);
  const volume = vi.fn();

  const Howl = vi.fn(() => ({ play, stop, unload, playing, volume }));

  return {
    Howl,
  };
});

import AudioButton from "~/components/AudioButton";

describe("AudioButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders with expected accessibility attributes", () => {
    render(<AudioButton />);
    const button = screen.getByRole("button");

    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.getAttribute("aria-label")).toBeTruthy();
  });

  it("toggles playback state when clicked", async () => {
    const user = userEvent.setup();
    render(<AudioButton />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("true");

    await user.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });
});
