import { test, expect } from "@playwright/test";

const routes = ["/", "/projects", "/about", "/contact", "/project/aurora-commerce"];

test.describe("basic routing", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
    });
  }
});

test("navigasi keyboard navbar", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator("a", { hasText: "Proyek" }).first()).toBeFocused();
});

test("audio button toggles pressed state", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForSelector('[data-testid="hero-audio-toggle"] button');
  const firstToggle = await page.evaluate(async () => {
    const button = document.querySelector<HTMLButtonElement>(
      '[data-testid="hero-audio-toggle"] button'
    );
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return {
      pressed: button?.getAttribute("aria-pressed"),
      enabled: window.localStorage.getItem("audio-enabled"),
    };
  });
  expect(firstToggle?.pressed).toBe("true");
  expect(firstToggle?.enabled).toBe("true");

  const secondToggle = await page.evaluate(async () => {
    const button = document.querySelector<HTMLButtonElement>(
      '[data-testid="hero-audio-toggle"] button'
    );
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return {
      pressed: button?.getAttribute("aria-pressed"),
      enabled: window.localStorage.getItem("audio-enabled"),
    };
  });
  expect(secondToggle?.pressed).toBe("false");
  expect(secondToggle?.enabled).toBe("false");
});
