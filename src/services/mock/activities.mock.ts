import { adminValues } from '../../config/adminValues';

export const ACTIVITIES = adminValues.activityCategories.map(cat => ({
  id: cat.id,
  titleKey: `activity.${cat.id}.title`,
  defaultTitle: cat.label,
  icon: cat.icon || 'star',
  multiplier: cat.multiplier,
  descKey: `activity.${cat.id}.desc`,
  defaultDesc: `${cat.label} session`
}));
