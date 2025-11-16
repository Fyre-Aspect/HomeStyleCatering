export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  featured?: boolean;
}

export const dishes: Dish[] = [
  // Biryani
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Authentic aromatic rice dish layered with tender chicken, fragrant spices, and saffron. A traditional homestyle delicacy.',
    image: '/images/Chicken Biryani.jpg',
    category: 'Biryani',
    price: 59,
    featured: true,
  },
  {
    id: 'lamb-biryani',
    name: 'Lamb Biryani',
    description: 'Tender lamb pieces cooked with aromatic basmati rice, exotic spices, and herbs. A royal feast on a plate.',
    image: '/images/Lamb-biryani.jpg',
    category: 'Biryani',
    price: 73,
    featured: false,
  },
  {
    id: 'veg-biryani',
    name: 'Vegetable Biryani',
    description: 'A delightful medley of fresh vegetables and fragrant basmati rice, perfectly spiced and aromatic.',
    image: '/images/Veg Biryani.png',
    category: 'Biryani',
    price: 52,
    featured: false,
  },
  
  // Curries
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    description: 'Creamy, rich tomato-based curry with tender chicken pieces. A beloved classic that melts in your mouth.',
    image: '/images/Butter chicken.jpg',
    category: 'Curries',
    price: 55,
    featured: true,
  },
  {
    id: 'Korma-chicken',
    name: 'Korma Chicken',
    description: 'Succulent chicken pieces in a flavorful, rich sauce with aromatic spices. A comfort food favorite.',
    image: '/images/Sauce Chicken.jpg',
    category: 'Curries',
    price: 55,
    featured: false,
  },
  {
    id: 'haleem',
    name: 'Haleem',
    description: 'A rich, slow-cooked stew of meat, lentils, and wheat. Traditional comfort food with incredible depth of flavor.',
    image: '/images/Haleem.jpg',
    category: 'Curries',
    price: 55,
    featured: false,
  },
  
  // Appetizers
  {
    id: 'chicken-noodle-gravy',
    name: 'Chicken Noodle Gravy',
    description: 'Tender noodles and chicken in a savory, aromatic gravy. Perfect blend of textures and flavors.',
    image: '/images/Chicken Noodle Gravy.jpg',
    category: 'Appetizers',
    price: 50,
    featured: false,
  },
  {
    id: 'russian-cutlet',
    name: 'Russian Cutlet',
    description: 'Crispy, golden-fried cutlets with a savory filling. A delightful starter that\'s perfect for any occasion.',
    image: '/images/Russian Cutlet.jpg',
    category: 'Appetizers',
    price: 35,
    featured: false,
  },
  {
    id: 'beda-kheema-roti',
    name: 'Beda Kheema Roti',
    description: 'Mumbai Style spiced minced meat wrapped in flaky, layered roti. Street food perfection with bold flavors.',
    image: '/images/Beda Keema.jpg',
    category: 'Appetizers',
    price: 39,
    featured: false,
  },
  
  // Desserts
  {
    id: 'pineapple-souffle',
    name: 'Pineapple Souffle',
    description: 'A heavenly, cloud-like dessert infused with tropical pineapple flavor. Light, airy, and perfectly sweet.',
    image: '/images/souffle.png',
    category: 'Desserts',
    price: 34,
    featured: true,
  },
  {
    id: 'kheer',
    name: 'Kheer',
    description: 'Traditional creamy rice pudding infused with cardamom, saffron, and nuts. A classic homestyle dessert.',
    image: '/images/kheer.jpg',
    category: 'Desserts',
    price: 30,
    featured: false,
  },
  {
    id: 'sooji-halwa',
    name: 'Sooji Halwa',
    description: 'Warm, aromatic semolina pudding cooked with ghee, sugar, and fragrant spices. Pure comfort in every bite.',
    image: '/images/Sooji Halwa.jpg',
    category: 'Desserts',
    price: 30,
    featured: false,
  },
];

export const featuredDishes = dishes.filter(dish => dish.featured);
