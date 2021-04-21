export type Tweet = {
  id: string
  location: Record<string, boolean>
  for: Record<string, boolean>
  tweetId: string
  tweetUrl: string
  username: string
  votes: number
  postedAt: string
}

export type Cities = Record<string, boolean>
export type Resources = Record<string, string>
