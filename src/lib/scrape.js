const qs = require("querystringify")

const exePath =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"

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

const isLocal = typeof process.env.AWS_REGION === "undefined"

/**
 * @param {string} tweetUrl
 */
const getDataFromTweetUrl = (tweetUrl) => {
  const urlWithoutHttps = tweetUrl.replace("https://", "")
  const split = urlWithoutHttps.split("/")
  const username = split[1]
  const tweetId = split[split.length - 1]
  return { username, tweetId, tweetUrl }
}

/**
 * @param {import("~/types").Cities} cities
 * @param {import("~/types").Resources} resources
 * @param {string[]} filterAccounts
 */
const getTweets = async (cities, resources, filterAccounts) => {
  const browser = isLocal
    ? await require("playwright-core").chromium.launch({
        executablePath: exePath,
        args: minimal_args,
        headless: true,
      })
    : await require("playwright-aws-lambda").launchChromium({ headless: true })

  const [year, month, date] = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .map((i) => parseInt(i))
  const since = `${year}-${month}-${date - 1}`
  const newTweets = {}

  for (const city of Object.keys(cities)) {
    for (const [title, searchTerm] of Object.entries(resources)) {
      const page = await browser.newPage({
        viewport: {
          width: 1920,
          height: 1080,
        },
      })

      await page.goto(
        `https://twitter.com/search?` +
          qs.stringify({
            q: [
              `"${city}"`,
              searchTerm,
              `since:${since}`,
              "min_retweets:10 -filter:replies -requirement -needed -needs -need -required",
              filterAccounts.map((account) => `-from:${account}`).join(" "),
            ].join(" "),
            src: "typed_query",
            f: "live",
          }),
        {
          waitUntil: "networkidle",
        }
      )

      const tweets = await page.evaluate(async () => {
        return await new Promise((resolve) => {
          let links = new Set()
          for (let i = 0; i <= 1; i++) {
            setTimeout(() => {
              if (i === 1) {
                resolve(Array.from(links))
              }
              scrollBy(0, 1000)
              Array.from(document.querySelectorAll("div.r-1d09ksm > a"))
                .filter((node) => node.href !== undefined)
                .forEach((node) =>
                  links.add({
                    tweetUrl: node.href,
                    time: Array.from(node.childNodes)[0].dateTime,
                  })
                )
            }, 100 * i)
          }
        })
      })

      for (const { tweetUrl, time } of tweets) {
        const metadata = getDataFromTweetUrl(tweetUrl)
        newTweets[metadata.tweetId] = {
          ...metadata,
          location: {
            [city]: true,
          },
          for: {
            Remdesivir: false,
            "Oxygen Bed": false,
            Fabiflue: false,
            Tocilizumab: false,
            [title]: true,
          },
          show: true,
          status: "available",
          votes: 0,
          postedAt: new Date(time),
          createdAt: new Date(),
        }
      }
      await page.close()
    }
  }
  await browser.close()
  return newTweets
}

module.exports.getTweets = getTweets
