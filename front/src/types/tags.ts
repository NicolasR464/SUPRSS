import { z } from 'zod'

/** Tags to classify a collection */
export const CollectionTag = z.enum([
    // General news & society
    'POLITICS',
    'ECONOMY',
    'INTERNATIONAL',
    'LOCAL_NEWS',
    'SOCIETY',
    'CULTURE',
    'EDUCATION',
    'SCIENCE_TECH',
    'ENVIRONMENT',
    'HEALTH',
    'SPORTS',
    'ENTERTAINMENT',
    'ARTS',
    'LIFESTYLE',
    'FOOD',
    'TRAVEL',

    // Professional & niche
    'BUSINESS',
    'STARTUPS',
    'MARKETING',
    'SOFTWARE_DEV',
    'AI',
    'CYBERSECURITY',
    'DESIGN',
    'RESEARCH',
    'PODCASTS',
    'OPEN_SOURCE',
])
export type CollectionTag = z.infer<typeof CollectionTag>

/** Types of RSS feeds */
export const FeedType = z.enum([
    // By source
    'NEWS_SITE',
    'BLOG',
    'PODCAST',
    'YOUTUBE_CHANNEL',
    'ACADEMIC_JOURNAL',
    'GOVERNMENT',
    'NGO',
    'SOCIAL_MEDIA',
    'FORUM',

    // By thematic purpose
    'GENERAL_NEWS',
    'TOPIC_BASED',
    'COMPANY',
    'EVENTS',
    'WEATHER',
    'JOBS',
    'MONITORING',
])
export type FeedType = z.infer<typeof FeedType>

export const ChipColor = z.enum([
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'error',
])
export type ChipColor = z.infer<typeof ChipColor>
