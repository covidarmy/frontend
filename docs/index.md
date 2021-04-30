# covid.army/frontend
## Welcome to our frontend project

This project is the frontend to our Twitter aggregator. Our `backend` project collects data from Twitter which is display here in this project. If you wish to contribute to this project, which we really encourage anyone to do, please clone both the `frontend` and `banckend` repositories to get a better overview.

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
