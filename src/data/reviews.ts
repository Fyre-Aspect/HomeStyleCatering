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
    name: 'Sarah Johnson',
    rating: 5,
    text: 'The biryani is absolutely incredible! It reminds me of my grandmother\'s cooking. The flavors are authentic and the portion sizes are generous. Highly recommend!',
    date: '2024-10-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    text: 'Best butter chicken I\'ve ever had outside of India. The sauce is rich and creamy, and the chicken is perfectly tender. Will definitely order again!',
    date: '2024-10-20',
  },
  {
    id: '3',
    name: 'Priya Patel',
    rating: 5,
    text: 'Simply Aafiya lives up to its name - the food is simply amazing! Everything tastes homemade and fresh. The pineapple souffle is to die for!',
    date: '2024-10-25',
  },
  {
    id: '4',
    name: 'David Martinez',
    rating: 5,
    text: 'Outstanding quality and authentic taste. You can tell every dish is made with love and care. The spices are perfectly balanced.',
    date: '2024-10-28',
  },
  {
    id: '5',
    name: 'Aisha Rahman',
    rating: 5,
    text: 'Finally found a place that makes food like my mom used to! Fresh ingredients, traditional recipes, and amazing customer service.',
    date: '2024-11-01',
  },
  {
    id: '6',
    name: 'James Wilson',
    rating: 5,
    text: 'Ordered for a family gathering and everyone loved it! The fried rice was a hit with the kids, and the adults couldn\'t get enough of the biryani.',
    date: '2024-11-05',
  },
];
