export const INTEREST_MAPPING: Record<string, { categoryId: string | null, activityLabels: string[] }> = {
  cafe: { categoryId: 'coffee', activityLabels: ['Coffee', 'Fine Dining'] },
  movie: { categoryId: 'movie', activityLabels: ['Art & Culture'] },
  tour: { categoryId: 'city', activityLabels: ['Architecture', 'Art & Culture'] },
  event: { categoryId: 'city', activityLabels: ['Networking'] },
  gym: { categoryId: null, activityLabels: ['Wellness'] },
  shopping: { categoryId: 'city', activityLabels: [] },
  dining: { categoryId: 'coffee', activityLabels: ['Fine Dining'] },
  art: { categoryId: 'study', activityLabels: ['Art & Culture', 'Architecture'] },
  network: { categoryId: 'study', activityLabels: ['Networking', 'Study Buddy'] },
  wellness: { categoryId: null, activityLabels: ['Wellness'] },
  language: { categoryId: 'study', activityLabels: ['Study Buddy', 'Networking'] },
  music: { categoryId: 'movie', activityLabels: ['Art & Culture'] }
};
