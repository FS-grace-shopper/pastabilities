const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    //inventory
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
      min: 0
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM,
    values: ['gluten-free', 'whole-wheat', 'semolina'],
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shape: {
    type: Sequelize.ENUM,
    values: ['long', 'ribbon', 'tubular', 'shaped', 'stuffed'],
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
