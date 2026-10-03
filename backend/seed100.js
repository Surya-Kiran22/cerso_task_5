const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');

dotenv.config();

const categories = ['Burgers', 'Pizza', 'Sushi', 'Indian', 'Salads', 'Thai', 'Mexican', 'Vegan', 'Seafood', 'Desserts', 'Italian', 'Chinese', 'Breakfast', 'Beverages', 'Sandwiches'];
const adjectives = ['Spicy', 'Classic', 'Delicious', 'Crispy', 'Roasted', 'Creamy', 'Tangy', 'Savory', 'Sweet', 'Zesty', 'Grilled', 'Smoked', 'Cheesy', 'Fresh', 'Hearty'];
const nouns = ['Special', 'Delight', 'Supreme', 'Feast', 'Bowl', 'Wrap', 'Platter', 'Bite', 'Extravaganza', 'Trio', 'Combo', 'Medley', 'Surprise', 'Fusion', 'Classic'];

const images = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-811114215714?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const generateFoods = (num) => {
  const foods = [];
  for (let i = 0; i < num; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const image = images[Math.floor(Math.random() * images.length)];
    
    foods.push({
      name: `${adj} ${category} ${noun}`,
      description: `A wonderful ${category.toLowerCase()} dish prepared with the finest ingredients. ${adj} and packed with flavor, it's a true ${noun.toLowerCase()}!`,
      price: Number((Math.random() * 25 + 5).toFixed(2)),
      category: category,
      imageUrl: image
    });
  }
  return foods;
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food-order').then(async () => {
  console.log('MongoDB connected for Bulk Seeding...');
  
  // We won't clear users, just foods. Wait, let's just clear foods.
  await Food.deleteMany({});
  console.log('Previous food data cleared.');
  
  const seedFoods = generateFoods(100);
  await Food.insertMany(seedFoods);
  console.log('100 Food dishes seeded successfully!');
  
  mongoose.connection.close();
}).catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
