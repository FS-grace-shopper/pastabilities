const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // sessionId: {
  //   type: Sequelize.STRING
  //   This might not be used
  // }
})

module.exports = Cart
