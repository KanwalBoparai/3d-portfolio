// Dev-only visual probe: boots the experience in headless Chrome, walks the
// interaction flow, and saves screenshots to /tmp/shots. Not part of the app.
import { chromium } from 'playwright-core'
import fs from 'node:fs'

const URL = process.env.PROBE_URL ?? 'http://localhost:5179/'
const OUT = '/tmp/shots'
const MOBILE = process.env.PROBE_MOBILE === '1'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'],
})
const page = await browser.newPage({
  viewport: MOBILE ? { width: 390, height: 844 } : { width: 1440, height: 810 },
  deviceScaleFactor: MOBILE ? 2 : 1,
  hasTouch: MOBILE,
})
const tag = MOBILE ? 'm-' : ''

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto(URL, { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(4500)
await page.screenshot({ path: `${OUT}/${tag}1-boot.png` })

// Establish link
const btn = page.getByRole('button', { name: /establish link/i })
await btn.waitFor({ state: 'visible', timeout: 15000 })
await btn.click()
await page.waitForTimeout(3500) // intro flight
await page.screenshot({ path: `${OUT}/${tag}2-idle.png` })

// Move cursor near head to test eye tracking pose
await page.mouse.move(1100, 250)
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/${tag}3-look.png` })

// Open Projects via nav (reliable target), capturing dive mid-flight
const nav = page.getByRole('button', { name: 'PROJECTS', exact: true })
if (await nav.count()) {
  await nav.first().click()
} else {
  await page.locator('nav button', { hasText: 'PROJECTS' }).first().click()
}
await page.waitForTimeout(1100)
await page.screenshot({ path: `${OUT}/${tag}4-dive.png` })
await page.waitForTimeout(2200)
await page.screenshot({ path: `${OUT}/${tag}5-projects.png` })

// Disconnect
await page.keyboard.press('Escape')
await page.waitForTimeout(2600)
await page.screenshot({ path: `${OUT}/${tag}6-returned.png` })

console.log('console errors:', errors.length ? errors.slice(0, 10) : 'none')
await browser.close()
