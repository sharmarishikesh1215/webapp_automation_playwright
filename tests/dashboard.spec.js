// @ts-check
import { test, expect } from "@playwright/test";
import "dotenv/config";

test.beforeEach("Login into dashboard", async ({ page }) => {
  await page.goto("https://dealerplus.staging.myautochek.com/auth/sign-in");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dealer+ | Sign In/);

  // Ensure that the environment variables are set
  if (!process.env.SUHAIL_EMAIL || !process.env.SUHAIL_PASSWORD) {
    throw new Error(
      "Environment variables SUHAIL_EMAIL and SUHAIL_PASSWORD must be set"
    );
  }

  await page.fill('input[name="email"]', process.env.SUHAIL_EMAIL);
  await page.fill('input[name="password"]', process.env.SUHAIL_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(
    "https://dealerplus.staging.myautochek.com/dealer/dashboard"
  );
});

test("Dashboard has Autochek logo", async ({ page }) => {
  await expect(page.locator('(//img[@alt="autochek-logo"])[1]')).toBeVisible();
});
