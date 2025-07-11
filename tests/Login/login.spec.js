// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';

test.beforeEach('has title', async ({ page }) => {
  await page.goto('https://dealerplus.staging.myautochek.com/auth/sign-in');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dealer+ | Sign In/);
});

test('Login page has Autochek logo', async ({ page }) => {
  await expect(page.locator('//img[@alt="Autochek\'s Logo"]')).toBeVisible();
});

test('Login with valid credentials', async ({ page }) => {

  // Ensure that the environment variables are set
  if (!process.env.SUHAIL_EMAIL || !process.env.SUHAIL_PASSWORD) {
    throw new Error('Environment variables SUHAIL_EMAIL and SUHAIL_PASSWORD must be set');
  }

  await page.fill('input[name="email"]', process.env.SUHAIL_EMAIL);
  await page.fill('input[name="password"]', process.env.SUHAIL_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(
    "https://dealerplus.staging.myautochek.com/dealer/dashboard"
  );
});

test('Forgot password is working', async ({ page }) => {
  await page.click('//div[text()="Forgot Password"]');
  await expect(page).toHaveURL(
    "https://dealerplus.staging.myautochek.com/auth/forgot-password"
  );
  
  if (!process.env.SUHAIL_EMAIL) {
    throw new Error(
      "Environment variable SUHAIL_EMAIL must be set"
    );
  }

  await page.fill('//input[@id="reset-link_payload"]', process.env.SUHAIL_EMAIL);
  await page.click('//span[text()="Send Reset Link"]');
  await expect(page.locator('(//button[@type="submit"])/child::span')).toHaveText('Verify Code');
});
