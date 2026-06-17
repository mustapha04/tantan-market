import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("listings page loads", async ({ page }) => {
    await page.goto("/listings")
    await expect(page).toHaveURL(/\/listings/)
  })

  test("auctions page loads", async ({ page }) => {
    await page.goto("/auctions")
    await expect(page).toHaveURL(/\/auctions/)
  })

  test("login page loads with email input", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator('input[type="email"]').first()).toBeVisible()
  })

  test("register page loads with form", async ({ page }) => {
    await page.goto("/register")
    await expect(page.locator('input[type="email"]').first()).toBeVisible()
  })

  test("new listing page loads with form", async ({ page }) => {
    await page.goto("/listings/new")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("header listings link navigates correctly", async ({ page }) => {
    await page.goto("/")
    const navLinks = page.locator("nav a")
    const secondLink = navLinks.nth(1)
    const href = await secondLink.getAttribute("href")
    if (href) {
      await secondLink.click()
      await expect(page).toHaveURL(new RegExp(href.replace("?", "\\?")), { timeout: 10000 })
    }
  })

  test("mobile menu toggles", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    const menuButton = page.locator("header button").first()
    await menuButton.click()
    await page.waitForTimeout(300)
  })
})
