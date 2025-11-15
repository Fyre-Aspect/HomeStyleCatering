export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
}

export const dishes: Dish[] = [
  {
    id: 'pineapple-souffle',
    name: 'Pineapple Souffle',
    description: 'A heavenly, cloud-like dessert infused with tropical pineapple flavor. Light, airy, and perfectly sweet.',
    image: '/images/souffle.png',
    category: 'Dessert',
    featured: true,
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Authentic aromatic rice dish layered with tender chicken, fragrant spices, and saffron. A traditional homestyle delicacy.',
    image: '/images/Chicken Biryani.jpg',
    category: 'Main Course',
    featured: true,
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    description: 'Creamy, rich tomato-based curry with tender chicken pieces. A beloved classic that melts in your mouth.',
    image: '/images/Butter chicken.jpg',
    category: 'Main Course',
    featured: true,
  },
  {
    id: 'lamb-biryani',
    name: 'Lamb Biryani',
    description: 'Tender lamb pieces cooked with aromatic basmati rice, exotic spices, and herbs. A royal feast on a plate.',
    image: '/images/Lamb-biryani.jpg',
    category: 'Main Course',
    featured: false,
  },
  {
    id: 'veg-biryani',
    name: 'Vegetable Biryani',
    description: 'A delightful medley of fresh vegetables and fragrant basmati rice, perfectly spiced and aromatic.',
    image: '/images/Veg Biryani.png',
    category: 'Main Course',
    featured: false,
  },
  {
    id: 'sauce-chicken',
    name: 'Sauce Chicken',
    description: 'Succulent chicken pieces in a flavorful, rich sauce with aromatic spices. A comfort food favorite.',
    image: '/images/Sauce Chicken.jpg',
    category: 'Main Course',
    featured: false,
  },
  {
    id: 'chicken-noodle-gravy',
    name: 'Chicken Noodle Gravy',
    description: 'Tender noodles and chicken in a savory, aromatic gravy. Perfect blend of textures and flavors.',
    image: '/images/Chicken Noodle Gravy.jpg',
    category: 'Main Course',
    featured: false,
  },
  {
    id: 'haleem',
    name: 'Haleem',
    description: 'A rich, slow-cooked stew of meat, lentils, and wheat. Traditional comfort food with incredible depth of flavor.',
    image: '/images/Haleem.jpg',
    category: 'Main Course',
    featured: false,
  },
  {
    id: 'cake',
    name: 'Special Cake',
    description: 'Delicious homemade cake, moist and flavorful. Perfect for celebrations or a sweet treat.',
    image: '/images/Cake.jpg',
    category: 'Dessert',
    featured: false,
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    description: 'Thick, creamy milkshake made with premium ingredients. Refreshing and indulgent.',
    image: '/images/Milkshake.jpg',
    category: 'Beverage',
    featured: false,
  },
];

export const featuredDishes = dishes.filter(dish => dish.featured);
