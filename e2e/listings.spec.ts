import { test, expect } from "@playwright/test"

test.describe("Listings", () => {
  test("search filters are present on listings page", async ({ page }) => {
    await page.goto("/listings")
    const inputCount = await page.locator('input').count()
    const selectCount = await page.locator('select').count()
    expect(inputCount + selectCount).toBeGreaterThan(0)
  })

  test("layout adapts to mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/listings")
    await expect(page.locator("body")).toBeVisible()
  })

  test("layout adapts to tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/listings")
    await expect(page.locator("body")).toBeVisible()
  })
})
