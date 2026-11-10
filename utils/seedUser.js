const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Company = require('../models/Company');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI or MONGODB_URI is not defined in your .env file!');
  process.exit(1);
}

const initialCompanies = [
  {
    name: 'CRIMSON INTERNATIONAL',
    shortName: 'CI',
    code: 'CI',
    address: 'HOUSE NO. 1, STREET 45, F-8/1,\nISLAMABAD.',
    phone: '0345-8592229',
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: 12,
    primaryColor: 'from-red-600 to-rose-700',
  },
  {
  name: 'GLOBAL LINKS',
  shortName: 'GL',
  code: 'GL',
  address: 'GULISTAN KHAN HOUSE, 3RD FLOOR, 301-2, 82-E,\nFAZL-E-HUQ ROAD, BLUE AREA, ISLAMABAD',
  phone: '091-5711466',
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: 14,
  primaryColor: 'from-blue-600 to-indigo-700',
},
  {
    name: 'UNIVERSAL IT TRADERS',
    shortName: 'UIT',
    code: 'UIT',
    address: 'HOUSE NO. 1, STREET 45, F-8/1,\nISLAMABAD.',
    phone: '0345-8592229',
    fontFamily: "'Calibri', sans-serif",
    fontSize: 12,
    primaryColor: 'from-emerald-600 to-teal-700',
  },
  {
    name: 'AEROTECH SOLUTION AND ENGINEERING',
    shortName: 'ASE',
    code: 'ASE',
    address: 'HOUSE NO. 1, STREET 45, F-8/1,\nISLAMABAD.',
    phone: '0345-8592229',
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: 12,
    primaryColor: 'from-violet-600 to-purple-700',
  },
  {
    name: 'ZENITH CONSTRUCTION AND ENGINEERING SOLUTIONS',
    shortName: 'ZCE',
    code: 'ZCE',
    address: 'HOUSE NO. 1, STREET 45, F-8/1,\nISLAMABAD.',
    phone: '0345-8592229',
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: 12,
    primaryColor: 'from-amber-600 to-orange-700',
  },
  {
    name: 'MIKAB CONSTRUCTION',
    shortName: 'MC',
    code: 'MC',
    address: 'HOUSE NO. 1, STREET 45, F-8/1,\nISLAMABAD.',
    phone: '0345-8592229',
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: 12,
    primaryColor: 'from-pink-600 to-rose-700',
  }
];

async function seedUserAndCompanies() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas Cloud...');

    // 1. Seed Admin User
    const adminEmail = 'admin@tenderportal.com';
    const existingUser = await User.findOne({ email: adminEmail });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Admin@123456', 10);
      await User.create({
        name: 'Crimson Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created (admin@tenderportal.com / Admin@123456)');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // 2. Seed / Update All Companies matching by `name`
    for (const comp of initialCompanies) {
      await Company.findOneAndUpdate(
        { name: comp.name },
        { $set: comp },
        { upsert: true, new: true, strict: false }
      );
    }
    console.log('✅ All 6 companies updated with Islamabad address & phone numbers!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedUserAndCompanies();