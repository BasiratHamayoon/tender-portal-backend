require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Company = require('../models/Company');

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    const email = 'admin@tenderportal.com';

    // Delete existing admin record if present to reset clean state
    await User.deleteOne({ email });

    // Create fresh admin user with isActive: true
    await User.create({
      name: 'Admin',
      email: email,
      password: 'Admin@123456',
      role: 'admin',
      isActive: true,
    });

    console.log('-----------------------------------');
    console.log('Admin account created & activated!');
    console.log('Email:    admin@tenderportal.com');
    console.log('Password: Admin@123456');
    console.log('-----------------------------------');

    // Ensure company exists
    const companyName = 'CRIMSON INTERNATIONAL';
    const existingCompany = await Company.findOne({ name: companyName });

    if (!existingCompany) {
      await Company.create({
        name: companyName,
        address: 'HOUSE NO. 1, STREET 45, F-8/1,',
        city: 'ISLAMABAD.',
        phone: '0345-8592229',
        font: 'Times New Roman',
        fontSize: 12,
        isActive: true,
      });
      console.log('Company created:', companyName);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedData();