[![powered-by-vercel](https://user-images.githubusercontent.com/50735025/117214368-55650a80-ae1a-11eb-8e0c-12d028d25e7e.png)](https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss)

# Covid.army - Covid 19 Twitter Resources Aggregator

**Covid.army** scrapes tweets from Twitter's search page (using Twitter's advanced search feature) and collates them, and showcases all of them in one place with a beautiful user-friendly interface.

[![Preview Image](./public/preview.png)](https://covid.army)

Want to contribute? Check the [Contributing](#contributing) section.

## Get Started

Set the variables in .env.example and move them to .env.local

```
npm install
npm run dev
```

## Environment Variables

```bash
NEXT_PUBLIC_FB_API_KEY=""
NEXT_PUBLIC_FB_APP_ID=""
NEXT_PUBLIC_FB_MEASUREMENT_ID=""
NEXT_PUBLIC_FB_MESSAGING_ID=""
NEXT_PUBLIC_FB_PROJECT_ID=""
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

We belive in open source, just as much as you do. Feel free to open a issue or PR. 
