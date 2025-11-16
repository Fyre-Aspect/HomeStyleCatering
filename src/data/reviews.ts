export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sonia Kumar',
    rating: 5,
    text: 'The biryani is absolutely incredible! It reminds me of my grandmother\'s cooking. The flavors are authentic and the portion sizes are generous. Highly recommend!',
    date: '2025-10-15',
  },
  {
    id: '3',
    name: 'Priya Patel',
    rating: 5,
    text: 'HOMESTYLE Catering lives up to its name - the food is simply amazing! Everything tastes homemade and fresh. The pineapple souffle is to die for!',
    date: '2025-10-25',
  },
  {
    id: '5',
    name: 'Aisha Rahman',
    rating: 5,
    text: 'Finally found a place that makes food like my mom used to! Fresh ingredients, traditional recipes, and amazing customer service.',
    date: '2025-11-01',
  },
];
