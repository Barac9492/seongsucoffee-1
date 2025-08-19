// Social media API integrations for ML data pipeline
import { MLDataService } from './database'

export interface YouTubeVideoData {
  id: string
  title: string
  description: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  channelTitle: string
  channelId: string
  tags?: string[]
  categoryId: string
}

export interface InstagramPostData {
  id: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  mediaUrl: string
  permalink: string
  timestamp: string
  username: string
  likeCount?: number
  commentsCount?: number
}

export interface TikTokVideoData {
  id: string
  title: string
  video_description: string
  create_time: number
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  username: string
}

export interface NaverSearchData {
  keyword: string
  period: string
  ratio: number
  data: Array<{
    period: string
    ratio: number
  }>
}

// YouTube Data API v3 integration
export class YouTubeDataCollector {
  private apiKey: string
  private baseUrl = 'https://www.googleapis.com/youtube/v3'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async searchVideos(query: string, maxResults: number = 50): Promise<YouTubeVideoData[]> {
    try {
      // Search for videos
      const searchUrl = `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}&regionCode=KR&relevanceLanguage=ko`
      
      const searchResponse = await fetch(searchUrl)
      const searchData = await searchResponse.json()

      if (!searchData.items) return []

      // Get video statistics
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')
      const statsUrl = `${this.baseUrl}/videos?part=statistics,snippet&id=${videoIds}&key=${this.apiKey}`
      
      const statsResponse = await fetch(statsUrl)
      const statsData = await statsResponse.json()

      return statsData.items?.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        viewCount: parseInt(video.statistics.viewCount || '0'),
        likeCount: parseInt(video.statistics.likeCount || '0'),
        commentCount: parseInt(video.statistics.commentCount || '0'),
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        tags: video.snippet.tags,
        categoryId: video.snippet.categoryId
      })) || []

    } catch (error) {
      console.error('YouTube API error:', error)
      return []
    }
  }

  async getKoreanCoffeeContent(): Promise<YouTubeVideoData[]> {
    const queries = [
      '한국 카페 트렌드 2024',
      '서울 카페 신메뉴',
      '성수동 카페',
      '크림치즈 커피',
      '흑임자 라떼',
      '한라봉 커피',
      '카페 레시피 한국'
    ]

    const allVideos: YouTubeVideoData[] = []
    
    for (const query of queries) {
      const videos = await this.searchVideos(query, 25)
      allVideos.push(...videos)
      
      // Rate limiting: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Remove duplicates
    const uniqueVideos = allVideos.filter((video, index, self) => 
      index === self.findIndex(v => v.id === video.id)
    )

    return uniqueVideos
  }
}

// Instagram Basic Display API integration
export class InstagramDataCollector {
  private accessToken: string
  private baseUrl = 'https://graph.instagram.com'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async searchHashtag(hashtag: string): Promise<InstagramPostData[]> {
    try {
      // Note: Instagram API requires business accounts and hashtag search is limited
      // This is a simplified implementation
      const url = `${this.baseUrl}/ig_hashtag_search?user_id={user-id}&q=${hashtag}&access_token=${this.accessToken}`
      
      const response = await fetch(url)
      const data = await response.json()

      // Transform data to our format
      return data.data?.map((post: any) => ({
        id: post.id,
        caption: post.caption,
        mediaType: post.media_type,
        mediaUrl: post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        username: post.username,
        likeCount: post.like_count,
        commentsCount: post.comments_count
      })) || []

    } catch (error) {
      console.error('Instagram API error:', error)
      return []
    }
  }

  async getKoreanCoffeeContent(): Promise<InstagramPostData[]> {
    const hashtags = [
      '서울카페',
      '성수동카페',
      '카페신메뉴',
      '한국커피',
      '카페트렌드',
      '크림치즈커피'
    ]

    const allPosts: InstagramPostData[] = []
    
    for (const hashtag of hashtags) {
      const posts = await this.searchHashtag(hashtag)
      allPosts.push(...posts)
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    return allPosts
  }
}

// Naver Search Trends API integration
export class NaverTrendsCollector {
  private clientId: string
  private clientSecret: string
  private baseUrl = 'https://openapi.naver.com/v1/datalab'

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  async getSearchTrends(keywords: string[], startDate: string, endDate: string): Promise<NaverSearchData[]> {
    try {
      const url = `${this.baseUrl}/search`
      
      const requestBody = {
        startDate,
        endDate,
        timeUnit: 'week',
        keywordGroups: keywords.map(keyword => ({
          groupName: keyword,
          keywords: [keyword]
        }))
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Naver-Client-Id': this.clientId,
          'X-Naver-Client-Secret': this.clientSecret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      return data.results?.map((result: any) => ({
        keyword: result.title,
        period: `${startDate} - ${endDate}`,
        ratio: result.data[result.data.length - 1]?.ratio || 0,
        data: result.data
      })) || []

    } catch (error) {
      console.error('Naver API error:', error)
      return []
    }
  }

  async getCoffeeSearchTrends(): Promise<NaverSearchData[]> {
    const today = new Date()
    const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
    
    const startDate = threeMonthsAgo.toISOString().split('T')[0]
    const endDate = today.toISOString().split('T')[0]

    const keywords = [
      '크림치즈 커피',
      '흑임자 라떼',
      '한라봉 커피',
      '피스타치오 라떼',
      '카페 신메뉴',
      '성수동 카페',
      '서울 카페'
    ]

    return this.getSearchTrends(keywords, startDate, endDate)
  }
}

// Main data collection orchestrator
export class TrendDataCollector {
  private mlDataService: MLDataService
  private youtubeCollector?: YouTubeDataCollector
  private instagramCollector?: InstagramDataCollector
  private naverCollector?: NaverTrendsCollector

  constructor() {
    this.mlDataService = new MLDataService()
    
    // Initialize collectors with API keys from environment
    if (process.env.YOUTUBE_API_KEY) {
      this.youtubeCollector = new YouTubeDataCollector(process.env.YOUTUBE_API_KEY)
    }
    
    if (process.env.INSTAGRAM_ACCESS_TOKEN) {
      this.instagramCollector = new InstagramDataCollector(process.env.INSTAGRAM_ACCESS_TOKEN)
    }
    
    if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET) {
      this.naverCollector = new NaverTrendsCollector(
        process.env.NAVER_CLIENT_ID,
        process.env.NAVER_CLIENT_SECRET
      )
    }
  }

  async collectAllData(): Promise<{
    youtube: YouTubeVideoData[]
    instagram: InstagramPostData[]
    naver: NaverSearchData[]
  }> {
    const results = {
      youtube: [] as YouTubeVideoData[],
      instagram: [] as InstagramPostData[],
      naver: [] as NaverSearchData[]
    }

    // Collect data from all sources in parallel
    const promises = []

    if (this.youtubeCollector) {
      promises.push(
        this.youtubeCollector.getKoreanCoffeeContent()
          .then(data => { results.youtube = data })
          .catch(error => console.error('YouTube collection failed:', error))
      )
    }

    if (this.instagramCollector) {
      promises.push(
        this.instagramCollector.getKoreanCoffeeContent()
          .then(data => { results.instagram = data })
          .catch(error => console.error('Instagram collection failed:', error))
      )
    }

    if (this.naverCollector) {
      promises.push(
        this.naverCollector.getCoffeeSearchTrends()
          .then(data => { results.naver = data })
          .catch(error => console.error('Naver collection failed:', error))
      )
    }

    await Promise.all(promises)
    return results
  }

  async storeCollectedData(data: {
    youtube: YouTubeVideoData[]
    instagram: InstagramPostData[]
    naver: NaverSearchData[]
  }): Promise<void> {
    // Store YouTube videos as social content
    for (const video of data.youtube) {
      try {
        await this.mlDataService.storeSocialContent({
          trendId: '', // Will need to match to trends via content analysis
          platform: 'youtube',
          platformId: video.id,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          title: video.title,
          description: video.description,
          author: video.channelTitle,
          authorId: video.channelId,
          postedAt: new Date(video.publishedAt),
          views: video.viewCount,
          likes: video.likeCount,
          comments: video.commentCount,
          shares: 0,
          language: 'ko',
          containsRecipe: this.detectsRecipe(video.title + ' ' + video.description),
          containsIngredients: this.detectsIngredients(video.title + ' ' + video.description)
        })
      } catch (error) {
        console.error('Error storing YouTube video:', error)
      }
    }

    // Store Instagram posts
    for (const post of data.instagram) {
      try {
        await this.mlDataService.storeSocialContent({
          trendId: '', // Will need to match to trends
          platform: 'instagram',
          platformId: post.id,
          url: post.permalink,
          title: post.caption?.substring(0, 100),
          description: post.caption,
          author: post.username,
          authorId: post.username,
          postedAt: new Date(post.timestamp),
          views: 0,
          likes: post.likeCount || 0,
          comments: post.commentsCount || 0,
          shares: 0,
          language: 'ko',
          containsRecipe: this.detectsRecipe(post.caption || ''),
          containsIngredients: this.detectsIngredients(post.caption || '')
        })
      } catch (error) {
        console.error('Error storing Instagram post:', error)
      }
    }
  }

  private detectsRecipe(text: string): boolean {
    const recipeKeywords = ['레시피', '만들기', '재료', '준비물', '방법', '단계']
    return recipeKeywords.some(keyword => text.includes(keyword))
  }

  private detectsIngredients(text: string): boolean {
    const ingredientKeywords = ['크림치즈', '흑임자', '한라봉', '피스타치오', '바닐라', '시럽', '우유', '에스프레소']
    return ingredientKeywords.some(keyword => text.includes(keyword))
  }
}

// Export for use in API routes and cron jobs
export { TrendDataCollector as DataCollector }