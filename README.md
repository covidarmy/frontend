# covid-resources - Covid 19 Twitter Resources Aggregator

**covid-resources** scrapes tweets from Twitter's search page (using Twitter's advanced search feature) and collates them on one page

Link - [https://covidresources.vercel.app](https://covidresources.vercel.app)

Want to contribute? Check the [Contributing](#contributing) section.

## Get Started

Set the variables in .env.example and move them to .env.local

```
npm install
npm run build
npm run dev
```

## Environment Variables

```bash
FB_PRIVATE_KEY=           # Private key from firebase service account json
FB_CLIENT_EMAIL=          # Client email from firebase service account json
FB_PROJECT_ID=            # Your firebase project id
NEXT_PUBLIC_CLARITY_ID=   # Microsoft Clarity ID
```

## Data Models

1. **Tweet & Tweets Document**

   ```typescript
   type Tweet = {
     tweetId: string
     username: string
     for: Record<string, boolean>
     location: Record<string, boolean>
   }

   type Tweets = Record<string, Tweet>
   ```

2. **Locations**

   ```typescript
   type Locations = Record<string, boolean>
   ```

3. **Location Resources**

   ```typescript
   type ResourceTitle = string
   type ResourceURL = string
   type LocationResources = Record<string, Record<ResourceTitle, ResourceURL>>
   ```

4. **Resources**

   ```typescript
   type SearchTerm = string

   type Resources = Record<string, SearchTerm>
   ```

## Contributing
