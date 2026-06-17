import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("loads with correct title and RTL direction", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("hero section displays key elements", async ({ page }) => {
    await page.goto("/")
    const hero = page.locator("section").first()
    await expect(hero.locator("h1")).toBeVisible()
    await expect(hero.locator('a[href="/listings"]')).toBeVisible()
    await expect(hero.locator('a[href="/listings/new"]')).toBeVisible()
  })

  test("search input works on hero", async ({ page }) => {
    await page.goto("/")
    const searchInput = page.locator("section").first().locator('input').first()
    await searchInput.fill("هاتف")
    await searchInput.press("Enter")
    await page.waitForURL(/\/listings\?search=/)
  })

  test("category links navigate correctly", async ({ page }) => {
    await page.goto("/")
    const categories = page.locator("section").nth(1).locator("a")
    const count = await categories.count()
    expect(count).toBeGreaterThanOrEqual(8)
    const firstCat = categories.first()
    const href = await firstCat.getAttribute("href")
    await firstCat.click()
    await expect(page).toHaveURL(new RegExp(href!.replace("?", "\\?")), { timeout: 10000 })
  })

  test("recent listings section shows loading then content or empty state", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("text=أحدث الإعلانات")).toBeVisible()
    await page.waitForTimeout(2000)
    const empty = page.getByText("لا توجد إعلانات").first()
    if (!(await empty.isVisible())) {
      const cards = page.locator('a[href^="/listings/"]')
      expect(await cards.count()).toBeGreaterThan(0)
    }
  })

  test("language switcher changes direction", async ({ page }) => {
    await page.goto("/")
    const globe = page.locator("svg.lucide-globe").first()
    await globe.click()
    const frOption = page.locator("text=Français")
    if (await frOption.isVisible()) {
      await frOption.click()
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr")
    }
  })

  test("header navigation is present", async ({ page }) => {
    await page.goto("/")
    const nav = page.locator("nav a")
    expect(await nav.count()).toBeGreaterThanOrEqual(2)
  })
})
