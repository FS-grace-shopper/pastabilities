/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      const threeProducts = [
        {
          id: 1,
          name: 'Ravioli',
          description: 'The best in the city!',
          quantity: 10,
          image: '/imageUrl',
          type: 'semolina',
          shape: 'shaped',
          price: 995
        },
        {
          id: 2,
          name: 'Linguini',
          description: 'The best in the city!',
          quantity: 7,
          image: '/imageUrl',
          type: 'gluten-free',
          shape: 'long',
          price: 995
        },
        {
          id: 3,
          name: 'Cavatelli',
          description: 'The best in the city!',
          quantity: 5,
          image: '/imageUrl',
          type: 'whole-wheat',
          shape: 'long',
          price: 1995
        }
      ]

      return Product.bulkCreate(threeProducts)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Ravioli')
      expect(res.body[1].name).to.be.equal('Linguini')
      expect(res.body[2].name).to.be.equal('Cavatelli')
    }) //localhost:
  }) // end describe('/api/users')
}) // end describe('User routes')
