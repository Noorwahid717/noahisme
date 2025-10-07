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
  await expect(page.locator("a", { hasText: "Proyek" }).first()).toBeFocused();
});
