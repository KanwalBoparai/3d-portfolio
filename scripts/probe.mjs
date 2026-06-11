// Dev-only visual probe: loads the experience in headless Chrome, walks the
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
await page.waitForTimeout(6500) // loading veil + intro dolly
await page.screenshot({ path: `${OUT}/${tag}1-hero.png` })

// Eye tracking pose
await page.mouse.move(1150, 230)
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/${tag}2-look.png` })

if (!MOBILE) {
  // Drag to rotate
  await page.mouse.move(720, 380)
  await page.mouse.down()
  await page.mouse.move(980, 380, { steps: 12 })
  await page.mouse.up()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/${tag}3-drag.png` })
  await page.waitForTimeout(2200)
}

// Click the PROJECTS nav link → smooth scroll into the section
await page.getByRole('button', { name: 'PROJECTS' }).first().click({ timeout: 10000 }).catch(async () => {
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'auto' }))
})
await page.waitForTimeout(2200)
await page.screenshot({ path: `${OUT}/${tag}4-projects.png` })

// Resume + contact sections
await page.evaluate(() => document.getElementById('resume')?.scrollIntoView({ behavior: 'auto' }))
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/${tag}5-resume.png` })

await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'auto' }))
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/${tag}6-contact.png` })

// Back to top — cards grid just below hero
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.95 }))
await page.waitForTimeout(1600)
await page.screenshot({ path: `${OUT}/${tag}7-cards.png` })

console.log('console errors:', errors.length ? errors.slice(0, 10) : 'none')
await browser.close()
