import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    await Booking.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('123456', salt);
    const userPassword = await bcrypt.hash('123456', salt);

    const usersToInsert = [
      {
        name: 'Admin User',
        email: 'admin@luxedrive.com',
        password: adminPassword,
        role: 'admin',
        isVerified: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        role: 'user',
        isVerified: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: userPassword,
        role: 'user',
        isVerified: true
      }
    ];

    const createdUsers = await User.insertMany(usersToInsert);
    const adminUser = createdUsers[0]._id;
    const regularUser1 = createdUsers[1]._id;

    const carsToInsert = [
      {
        name: 'S-Class 2024',
        brand: 'Mercedes-Benz',
        model: 'S580',
        year: 2024,
        category: 'luxury',
        transmission: 'automatic',
        fuel: 'hybrid',
        seats: 5,
        doors: 4,
        pricePerDay: 450,
        pricePerWeek: 2800,
        location: 'New York',
        features: ['Leather Seats', 'Burmester Audio', 'Massage Seats', 'Ambient Lighting', 'HUD'],
        images: [{ url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80', public_id: 's-class' }]
      },
      {
        name: '911 Carrera S',
        brand: 'Porsche',
        model: '911',
        year: 2023,
        category: 'sports',
        transmission: 'automatic',
        fuel: 'essence',
        seats: 2,
        doors: 2,
        pricePerDay: 550,
        pricePerWeek: 3500,
        location: 'Miami',
        features: ['Sport Chrono', 'Carbon Ceramic Brakes', 'Bose Audio', 'Sport Exhaust'],
        images: [{ url: 'https://images.unsplash.com/photo-1503376710356-70e68c8c5123?auto=format&fit=crop&q=80', public_id: 'porsche' }]
      },
      {
        name: 'Model S Plaid',
        brand: 'Tesla',
        model: 'Model S',
        year: 2024,
        category: 'sedan',
        transmission: 'automatic',
        fuel: 'electric',
        seats: 5,
        doors: 4,
        pricePerDay: 300,
        pricePerWeek: 1800,
        location: 'Los Angeles',
        features: ['Autopilot', 'Yoke Steering', 'Gaming Computer', 'Glass Roof'],
        images: [{ url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80', public_id: 'tesla' }]
      },
      {
        name: 'G-Class AMG 63',
        brand: 'Mercedes-Benz',
        model: 'G63',
        year: 2023,
        category: 'suv',
        transmission: 'automatic',
        fuel: 'essence',
        seats: 5,
        doors: 4,
        pricePerDay: 600,
        pricePerWeek: 3900,
        location: 'Beverly Hills',
        features: ['Side Pipes', 'Nappa Leather', 'Off-road Package', 'Moonroof'],
        images: [{ url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80', public_id: 'g-class' }]
      },
      {
        name: 'V-Class VIP',
        brand: 'Mercedes-Benz',
        model: 'V300d',
        year: 2022,
        category: 'van',
        transmission: 'automatic',
        fuel: 'diesel',
        seats: 7,
        doors: 4,
        pricePerDay: 250,
        pricePerWeek: 1500,
        location: 'London',
        features: ['Captain Chairs', 'Privacy Glass', 'Burmester Audio', 'Foldable Tables'],
        images: [{ url: 'https://images.unsplash.com/photo-1511210967323-575ba38e2171?auto=format&fit=crop&q=80', public_id: 'v-class' }]
      }
    ];

    const createdCars = await Car.insertMany(carsToInsert);
    const carId = createdCars[0]._id;
    const today = new Date();
    
    const bookingsToInsert = [
      {
        user: regularUser1,
        car: carId,
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
        totalDays: 3,
        totalPrice: 1350,
        status: 'confirmed',
        pickupLocation: 'New York',
        returnLocation: 'New York',
        driverLicense: 'DL123456789'
      }
    ];

    await Booking.insertMany(bookingsToInsert);

    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    await Booking.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
