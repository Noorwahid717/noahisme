import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

const pages = ["/", "/projects", "/about", "/contact"];

test.describe("accessibility", () => {
  for (const path of pages) {
    test(`axe scan ${path}`, async ({ page }) => {
      await page.goto(path);
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
      expect(true).toBe(true);
    });
  }
});
