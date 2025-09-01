import { CollectionTag, FeedType } from '@/types/tags'

/** Display labels for collection tags */
export const CollectionTagLabels: Record<CollectionTag, string> = {
    POLITICS: 'Politics',
    ECONOMY: 'Economy',
    INTERNATIONAL: 'International',
    LOCAL_NEWS: 'Local News',
    SOCIETY: 'Society',
    CULTURE: 'Culture',
    EDUCATION: 'Education',
    SCIENCE_TECH: 'Science & Tech',
    ENVIRONMENT: 'Environment',
    HEALTH: 'Health',
    SPORTS: 'Sports',
    ENTERTAINMENT: 'Entertainment',
    ARTS: 'Arts',
    LIFESTYLE: 'Lifestyle',
    FOOD: 'Food',
    TRAVEL: 'Travel',

    BUSINESS: 'Business',
    STARTUPS: 'Startups',
    MARKETING: 'Marketing',
    SOFTWARE_DEV: 'Software Development',
    AI: 'Artificial Intelligence',
    CYBERSECURITY: 'Cybersecurity',
    DESIGN: 'Design',
    RESEARCH: 'Research',
    PODCASTS: 'Podcasts',
    OPEN_SOURCE: 'Open Source',
}

/** Display labels for feed types */
export const FeedTypeLabels: Record<FeedType, string> = {
    NEWS_SITE: 'News Site',
    BLOG: 'Blog',
    PODCAST: 'Podcast',
    YOUTUBE_CHANNEL: 'YouTube Channel',
    ACADEMIC_JOURNAL: 'Academic Journal',
    GOVERNMENT: 'Government',
    NGO: 'NGO',
    SOCIAL_MEDIA: 'Social Media',
    FORUM: 'Forum',

    GENERAL_NEWS: 'General News',
    TOPIC_BASED: 'Topic-based Feed',
    COMPANY: 'Company Feed',
    EVENTS: 'Events',
    WEATHER: 'Weather',
    JOBS: 'Job Listings',
    MONITORING: 'Monitoring Feed',
}
