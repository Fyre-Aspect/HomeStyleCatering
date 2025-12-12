export interface DishOption {
  name: string;
  price: number;
  largePrice?: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  featured?: boolean;
  options?: DishOption[];
}

export const dishes: Dish[] = [
  // SECTION 1 — APPETIZERS
  {
    id: 'vegetable-cutlets',
    name: 'Vegetable Cutlets',
    description: 'Crispy and savory vegetable patties, perfect for a light snack.',
    image: '/images/Vegetable Cutlets.jpg',
    category: 'APPETIZERS',
    price: 50,
    featured: false,
    options: [
      { name: 'Veg', price: 50, largePrice: 100 }
    ]
  },
  {
    id: 'bateta-vada',
    name: 'Bateta Vada (Potato Fritters)',
    description: 'Spiced mashed potato balls dipped in chickpea batter and deep-fried.',
    image: '/images/Bateta Vada.jpg',
    category: 'APPETIZERS',
    price: 50,
    featured: false,
    options: [
      { name: 'Veg', price: 50, largePrice: 100 }
    ]
  },
  {
    id: 'russian-cutlets',
    name: 'Russian Cutlets',
    description: 'Delicious minced meat and vegetable cutlets with a crispy coating.',
    image: '/images/Russian Cutlet.jpg',
    category: 'APPETIZERS',
    price: 75,
    featured: true,
    options: [
      { name: 'Chicken', price: 75, largePrice: 150 }
    ]
  },
  {
    id: 'beda-kheema-roti',
    name: 'Beda Kheema Roti',
    description: 'Spiced minced meat stuffed in a flaky roti, a savory delight.',
    image: '/images/Beda Keema.jpg',
    category: 'APPETIZERS',
    price: 70,
    featured: true,
    options: [
      { name: 'Mutton', price: 70, largePrice: 140 }
    ]
  },
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken',
    description: 'Chicken marinated in yogurt and spices, roasted to perfection.',
    image: '/images/Tandoori Chicken.jpg',
    category: 'APPETIZERS',
    price: 62.5,
    featured: false,
    options: [
      { name: 'Chicken', price: 62.5, largePrice: 125 }
    ]
  },

  // SECTION 2 — BRIYANI
  {
    id: 'veg-briyani',
    name: 'Veg Briyani',
    description: 'Aromatic basmati rice cooked with mixed vegetables and traditional spices.',
    image: '/images/Veg Biryani.png',
    category: 'BRIYANI',
    price: 55,
    featured: false,
    options: [
      { name: 'Veg', price: 55, largePrice: 95 }
    ]
  },
  {
    id: 'chicken-briyani',
    name: 'Chicken Briyani',
    description: 'Classic chicken biryani with tender meat and fragrant saffron rice.',
    image: '/images/Chicken Biryani.jpg',
    category: 'BRIYANI',
    price: 60,
    featured: true,
    options: [
      { name: 'Chicken', price: 60, largePrice: 110 }
    ]
  },
  {
    id: 'chicken-tikka-briyani',
    name: 'Chicken Tikka Briyani',
    description: 'Smoky chicken tikka pieces layered with spiced biryani rice.',
    image: '/images/Chicken Tikka Briyani.jpg',
    category: 'BRIYANI',
    price: 60,
    featured: false,
    options: [
      { name: 'Chicken Tikka', price: 60, largePrice: 110 }
    ]
  },
  {
    id: 'chicken-fried-rice-briyani',
    name: 'Chicken Fried Rice (Biryani Style)',
    description: 'Flavorful fried rice with chicken, a fusion favorite.',
    image: '/images/Chicken Fried Rice.jpg',
    category: 'BRIYANI',
    price: 55,
    featured: false,
    options: [
      { name: 'Chicken', price: 55, largePrice: 100 }
    ]
  },
  {
    id: 'tandoori-chicken-briyani',
    name: 'Tandoori Chicken Briyani',
    description: 'Biryani featuring the bold flavors of tandoori chicken.',
    image: '/images/Tandoori Chicken Briyani.jpg',
    category: 'BRIYANI',
    price: 60,
    featured: false,
    options: [
      { name: 'Tandoori Chicken', price: 60, largePrice: 110 }
    ]
  },
  {
    id: 'lamb-briyani',
    name: 'Lamb Briyani',
    description: 'Rich and hearty biryani made with tender lamb.',
    image: '/images/Lamb-biryani.jpg',
    category: 'BRIYANI',
    price: 75,
    featured: true,
    options: [
      { name: 'Lamb', price: 75, largePrice: 135 }
    ]
  },

  // SECTION 3 — HAKKA ITEMS
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Classic stir-fried rice with fresh vegetables or chicken.',
    image: '/images/Veg Fried Rice.jpg',
    category: 'HAKKA ITEMS',
    price: 55,
    featured: false,
    options: [
      { name: 'Veg', price: 55, largePrice: 95 },
      { name: 'Chicken', price: 60, largePrice: 105 }
    ]
  },
  {
    id: 'hakka-noodles',
    name: 'Hakka Noodles',
    description: 'Indo-Chinese style noodles tossed with savory sauces.',
    image: '/images/Veg Hakka Noodles.jpg',
    category: 'HAKKA ITEMS',
    price: 55,
    featured: false,
    options: [
      { name: 'Veg', price: 55, largePrice: 95 },
      { name: 'Chicken', price: 60, largePrice: 105 }
    ]
  },

  // SECTION 4 — CURRIES
  {
    id: 'paneer-makhani',
    name: 'Paneer Makhani',
    description: 'Cubes of paneer in a rich and creamy tomato butter sauce.',
    image: '/images/Paneer Makhani.jpg',
    category: 'CURRIES',
    price: 50,
    featured: true,
    options: [
      { name: 'Veg', price: 50, largePrice: 95 }
    ]
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    description: 'Paneer cooked with bell peppers and freshly ground spices.',
    image: '/images/Kadai Paneer.jpg',
    category: 'CURRIES',
    price: 50,
    featured: false,
    options: [
      { name: 'Veg', price: 50, largePrice: 95 }
    ]
  },
  {
    id: 'dal-fry',
    name: 'Dal Fry',
    description: 'Yellow lentils tempered with aromatic spices and herbs.',
    image: '/images/Dal Fry.jpg',
    category: 'CURRIES',
    price: 40,
    featured: false,
    options: [
      { name: 'Veg', price: 40, largePrice: 90 }
    ]
  },
  {
    id: 'cholay',
    name: 'Cholay',
    description: 'Spicy and tangy chickpea curry.',
    image: '/images/Cholay.jpg',
    category: 'CURRIES',
    price: 40,
    featured: false,
    options: [
      { name: 'Veg', price: 40, largePrice: 90 }
    ]
  },
  {
    id: 'rajma',
    name: 'Rajma',
    description: 'Red kidney beans cooked in a thick gravy.',
    image: '/images/Rajma.jpg',
    category: 'CURRIES',
    price: 40,
    featured: false,
    options: [
      { name: 'Veg', price: 40, largePrice: 90 }
    ]
  },
  {
    id: 'lasagna',
    name: 'Lasagna',
    description: 'Layers of pasta, cheese, and sauce with your choice of filling.',
    image: '/images/Veg Lasagna.jpg',
    category: 'CURRIES',
    price: 35,
    featured: false,
    options: [
      { name: 'Veg', price: 35, largePrice: 70 },
      { name: 'Chicken', price: 45, largePrice: 90 }
    ]
  },
  {
    id: 'boneless-chicken',
    name: 'Boneless Chicken',
    description: 'Choice of: Butter Chicken / White Butter Chicken / Chicken Tikka Masala / Chicken Karahi.',
    image: '/images/Butter chicken.jpg',
    category: 'CURRIES',
    price: 65,
    featured: true,
    options: [
      { name: 'Chicken', price: 65, largePrice: 145 }
    ]
  },
  {
    id: 'korma',
    name: 'Korma',
    description: 'Meat cooked in a creamy, yogurt-based sauce with spices.',
    image: '/images/Sauce Chicken.jpg',
    category: 'CURRIES',
    price: 60,
    featured: false,
    options: [
      { name: 'Chicken', price: 60, largePrice: 120 },
      { name: 'Mutton', price: 70, largePrice: 135 }
    ]
  },
  {
    id: 'haleem',
    name: 'Haleem',
    description: 'A slow-cooked stew of meat, lentils, and wheat.',
    image: '/images/Haleem.jpg',
    category: 'CURRIES',
    price: 60,
    featured: false,
    options: [
      { name: 'Chicken', price: 60, largePrice: 120 },
      { name: 'Mutton', price: 60, largePrice: 120 }
    ]
  },
  {
    id: 'nihari',
    name: 'Nihari',
    description: 'A rich, slow-cooked meat stew, a traditional favorite.',
    image: '/images/Nihari.jpg',
    category: 'CURRIES',
    price: 70,
    featured: false,
    options: [
      { name: 'Beef', price: 70, largePrice: 130 }
    ]
  },

  // SECTION 5 — DESSERTS
  {
    id: 'pineapple-suffle',
    name: 'Pineapple Suffle',
    description: 'Light and airy pineapple dessert.',
    image: '/images/souffle.png',
    category: 'DESSERTS',
    price: 45,
    featured: false,
    options: [
      { name: 'Regular', price: 45, largePrice: 90 }
    ]
  },
  {
    id: 'fruit-bowl',
    name: 'Fruit Bowl (Custard)',
    description: 'Fresh fruits served in creamy custard.',
    image: '/images/Fruit bowl.jpg',
    category: 'DESSERTS',
    price: 50,
    featured: false,
    options: [
      { name: 'Regular', price: 50, largePrice: 100 }
    ]
  },
  {
    id: 'kheer',
    name: 'Kheer',
    description: 'Traditional rice pudding with milk and nuts.',
    image: '/images/Kheer.jpg',
    category: 'DESSERTS',
    price: 35,
    featured: false,
    options: [
      { name: 'Regular', price: 35, largePrice: 70 }
    ]
  },
  {
    id: 'suji-halwa',
    name: 'Suji Halwa',
    description: 'Sweet semolina pudding.',
    image: '/images/Sooji Halwa.jpg',
    category: 'DESSERTS',
    price: 30,
    featured: false,
    options: [
      { name: 'Regular', price: 30, largePrice: 65 }
    ]
  },
];

export const featuredDishes = dishes.filter(dish => dish.featured);
