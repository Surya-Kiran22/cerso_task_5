const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Food = require('./models/Food');
const User = require('./models/User');

dotenv.config();

const seedFoods = [
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our signature sauce on a toasted brioche bun.',
    price: 12.99,
    category: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with San Marzano tomato sauce, fresh mozzarella, and basil.',
    price: 14.50,
    category: 'Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Spicy Tuna Roll',
    description: 'Fresh tuna with spicy mayo and cucumber, topped with sesame seeds.',
    price: 16.00,
    category: 'Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken marinated in yogurt and spices, cooked in a rich and creamy tomato sauce. Served with naan.',
    price: 18.50,
    category: 'Indian',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and classic Caesar dressing.',
    price: 10.99,
    category: 'Salads',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with eggs, peanuts, bean sprouts, and your choice of protein in a tangy tamarind sauce.',
    price: 15.00,
    category: 'Thai',
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tacos Al Pastor',
    description: 'Authentic Mexican tacos with marinated pork, pineapple, cilantro, and onions on corn tortillas.',
    price: 11.50,
    category: 'Mexican',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Vegan Buddha Bowl',
    description: 'Healthy bowl packed with quinoa, roasted sweet potatoes, avocado, chickpeas, and a tahini dressing.',
    price: 13.99,
    category: 'Vegan',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon grilled to perfection, served with asparagus and lemon butter sauce.',
    price: 22.00,
    category: 'Seafood',
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with a molten liquid center, topped with vanilla bean ice cream.',
    price: 8.50,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food-order').then(async () => {
  console.log('MongoDB connected for Seeding...');
  
  // Clear collections
  await Food.deleteMany({});
  await User.deleteMany({});
  console.log('Previous data cleared.');
  
  // Insert foods
  await Food.insertMany(seedFoods);
  console.log('Food dishes seeded successfully!');

  // Create Admin
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  await User.create({
    name: 'Admin User',
    email: 'admin@foodexpress.com',
    password: adminPassword,
    isAdmin: true
  });
  console.log('Admin account created: admin@foodexpress.com / admin123');

  // Create regular User
  const userPassword = await bcrypt.hash('user123', salt);
  await User.create({
    name: 'Regular User',
    email: 'user@foodexpress.com',
    password: userPassword,
    isAdmin: false
  });
  console.log('Regular user created: user@foodexpress.com / user123');

  mongoose.connection.close();
}).catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
