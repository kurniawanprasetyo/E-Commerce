import { test, expect } from '@playwright/test'

test('homepage shows the VIVA storefront and featured products', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Elevate Your Everyday/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Top Picks For You/i })).toBeVisible()
  await expect(page.getByText('Noise Cancelling Headphones')).toBeVisible()
})

test('search filters products', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: 'Search products' }).fill('Coffee')
  await expect(page.getByText('Compact Coffee Maker')).toBeVisible()
  await expect(page.getByText('Noise Cancelling Headphones')).toHaveCount(0)
})

test('user can add a product and see it in the cart', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Add Noise Cancelling Headphones to cart' }).click()
  await expect(page.locator('.toast')).toContainText('added to your bag')
  await page.getByRole('button', { name: 'Cart', exact: true }).click()
  await expect(page.getByRole('complementary', { name: 'Shopping cart' })).toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Shopping cart' }).getByText('Noise Cancelling Headphones')).toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Shopping cart' }).locator('.cart-item').getByText('$79.99', { exact: true })).toBeVisible()
})

test('wishlist toggles for a product', async ({ page }) => {
  await page.goto('/')
  const save = page.getByRole('button', { name: 'Add Noise Cancelling Headphones to wishlist' })
  await save.click()
  await expect(page.getByRole('button', { name: 'Remove Noise Cancelling Headphones from wishlist' })).toBeVisible()
})

test('newsletter accepts a valid email', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: 'Email address' }).fill('tester@example.com')
  await page.getByRole('button', { name: 'Subscribe' }).click()
  await expect(page.getByText('Thanks for subscribing. You’re on the list!')).toBeVisible()
})
