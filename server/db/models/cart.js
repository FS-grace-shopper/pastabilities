const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionID: {
    type: Sequelize.STRING
    // Does this need a validator?
  },
  userID: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart