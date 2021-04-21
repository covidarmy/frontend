const qs = require("querystringify")
const { store } = require("./firebase-admin")

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

const getTweets = async () => {
  const browser = isLocal
    ? await require("playwright-core").chromium.launch({
        executablePath: exePath,
        args: minimal_args,
      })
    : await require("playwright-aws-lambda").launchChromium({ headless: true })

  const [year, month, date] = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .map((i) => parseInt(i))
  const since = `${year}-${month}-${date - 2}`
  const cities = (await store.doc("main/cities").get()).data()
  const tweetsDoc = store.doc("main/tweets")
  const tweetsData = (await tweetsDoc.get()).data()
  for (const city of Object.keys(cities)) {
    const page = await browser.newPage({
      viewport: {
        width: 1920,
        height: 1080,
      },
    })
    await page.goto(
      `https://twitter.com/search?${qs.stringify({
        q: `"${city}" (remdesivir OR remdesvir) since:${since} min_retweets:10 -filter:replies -requirement -needed -needs -need -required -from:IndiaToday -from:ANI -from:PTI_NEWS -from:TOIMumbai`,
        src: "typed_query",
        f: "live",
      })}`,
      {
        waitUntil: "networkidle",
      }
    )
    const tweets = await page.evaluate(async () => {
      return await new Promise((resolve) => {
        let links = new Set()
        let timeIncrement = 5000
        let timesToScroll = 2
        for (let i = 0; i <= timesToScroll; i++) {
          setTimeout(() => {
            scrollBy(0, 1000)
            Array.from(document.querySelectorAll("div.r-1d09ksm > a"))
              .filter((x) => x.href !== undefined)
              .forEach((x) => links.add(x.href))
            if (i === timesToScroll) {
              resolve(Array.from(links))
            }
          }, timeIncrement * i)
        }
      })
    })
    const setObject = {}
    for (const tweetUrl of tweets) {
      const metadata = getDataFromTweetUrl(tweetUrl)
      setObject[metadata.tweetId] = {
        ...metadata,
        city: {
          [city]: true,
        },
        for: {
          Remdesivir: true,
        },
        show: true,
        status: "available",
        votes: 0,
      }
    }
    await tweetsDoc.set(setObject, {
      merge: true,
    })
    await page.close()
  }
  await browser.close()
  return { tweets: (await tweetsDoc.get()).data(), cities }
}

module.exports.getTweets = getTweets
getTweets().catch((err) => console.log(err))
