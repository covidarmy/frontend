// @ts-check
const chrome = require("chrome-aws-lambda")
const qs = require("query-string")

/** @type {typeof import("puppeteer") | typeof import ("puppeteer-core")} */
let puppeteer
const isLocal = typeof process.env.VERCEL_REGION === "undefined"

if (isLocal) {
  puppeteer = require("puppeteer")
} else {
  puppeteer = require("puppeteer-core")
}

// https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/
const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
]

const blocked_domains = ["googlesyndication.com", "adservice.google.com"]

const launchPuppeteer = async () => {
  const browser = await puppeteer.launch(
    isLocal
      ? {
          args: minimal_args,
          headless: false,
        }
      : {
          args: chrome.args,
          executablePath: await chrome.executablePath,
        }
  )

  return browser
}

const newPage = async () => {
  const browser = await launchPuppeteer()
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setRequestInterception(true)
  page.on("request", (request) => {
    const url = request.url()
    if (blocked_domains.some((domain) => url.includes(domain))) {
      request.abort()
    } else {
      request.continue()
    }
  })

  return page
}

/**
 * @param {string} city
 */
const getTweets = async (city) => {
  const page = await newPage()
  await page.goto(
    `https://twitter.com/search?${qs.stringify({
      q: `${city} (remdesivir OR oxygen) since:2021-04-15 until:2021-04-18 min_faves:20 -filter:replies -need -required -needed -getting -help`,
      src: "typed_query",
    })}`
  )
}

getTweets("delhi")
