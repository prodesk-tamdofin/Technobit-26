/**
 * Migration: Add roll and college columns to participants table
 * Run this file once to update your existing database
 * 
 * Usage: node migrations/001-add-roll-college.js
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    const queryInterface = sequelize.getQueryInterface();

    // Check if columns already exist
    const tableInfo = await queryInterface.describeTable('participants');

    // Add roll column
    if (!tableInfo.roll) {
      console.log('Adding "roll" column...');
      await queryInterface.addColumn('participants', 'roll', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'N/A',
      });
      console.log('✓ Added "roll" column');
    } else {
      console.log('○ "roll" column already exists');
    }

    // Add college column
    if (!tableInfo.college) {
      console.log('Adding "college" column...');
      await queryInterface.addColumn('participants', 'college', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'BNMPC',
      });
      console.log('✓ Added "college" column');
    } else {
      console.log('○ "college" column already exists');
    }

    // Modify fb column to allow null
    if (tableInfo.fb && tableInfo.fb.allowNull === false) {
      console.log('Modifying "fb" column to allow null...');
      await queryInterface.changeColumn('participants', 'fb', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      });
      console.log('✓ Modified "fb" column');
    } else {
      console.log('○ "fb" column already allows null');
    }

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrate();
