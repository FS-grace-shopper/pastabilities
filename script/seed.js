'use strict'

const db = require('../server/db')
const {User, Product, Review, Address} = require('../server/db/models')

const pastaProduct = [
  {
    name: 'Pasta al Tartufo',
    description: 'Yummy Pasta',
    price: 1000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/p/a/pasta_al_tartufo.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta Duc',
    description: 'Yummy Pasta',
    price: 1500,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/s/p/spaghetti_pomodoro_gift_box_update_1.jpg',
    type: 'gluten-free',
    shape: 'ribbon'
  },
  {
    name: 'Pasta Chris',
    description: 'Yummy Pasta',
    price: 2000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/b/u/bucatini_al_tonno_eataly_update6.jpg',
    type: 'semolina',
    shape: 'tubular'
  },
  {
    name: 'Pasta Grey',
    description: 'Yummy Pasta',
    price: 2500,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/1/1/1128201.jpg',
    type: 'gluten-free',
    shape: 'stuffed'
  },
  {
    name: 'Pasta Kevin',
    description: 'Yummy Pasta',
    price: 2500,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/a/f/afeltra-carta-paglia-calamaro-500g-182405-1.jpg',
    type: 'whole-wheat',
    shape: 'tubular'
    //testing
  },
  {
    name: 'Pasta Sam',
    description: 'Yummy Pasta',
    price: 3000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'semolina',
    shape: 'long'
  }
]

const dummyUsers = [
  {
    email: 'samfortuna@gmail.com',
    password: 'secret',
    firstName: 'Sam',
    lastName: 'Fortuna',
    isAdmin: true
  },
  {
    email: 'ductran@gmail.com',
    password: 'secret1',
    firstName: 'Duc',
    lastName: 'Tran',
    isAdmin: false
  },
  {
    email: 'chriselipas@gmail.com',
    password: 'secret2',
    firstName: 'Chris',
    lastName: 'Elipas',
    isAdmin: true
  },
  {
    email: 'gregapoyando@gmail.com',
    password: 'secret3',
    firstName: 'Grey',
    lastName: 'Apoyando',
    isAdmin: false
  },
  {
    email: 'kevintun@gmail.com',
    password: 'secret4',
    firstName: 'Kevin',
    lastName: 'Tun',
    isAdmin: true
  }
]

const dummyReviews = [
  {
    rating: 3.5,
    comment: 'mehhhhh'
  },
  {
    rating: 2.5,
    comment: 'ewwwww'
  },
  {
    rating: 5.0,
    comment: 'yummmmmmmm'
  },
  {
    rating: 4.5,
    comment: 'could have been better'
  },
  {
    rating: 0,
    comment: 'not edible'
  },
  {
    rating: 3.5,
    comment: 'mehhhhh'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [product, user, review] = await Promise.all([
    Product.bulkCreate(pastaProduct, {returning: true}),
    User.bulkCreate(dummyUsers, {individualHooks: true, returning: true}),
    Review.bulkCreate(dummyReviews, {returning: true})
  ])
  const [pasta1, pasta2, pasta3, pasta4, pasta5, pasta6] = product
  const [user1, user2, user3, user4, user5] = user
  const [review1, review2, review3, review4, review5, review6] = review

  await review1.setUser(user1)
  await review1.setProduct(pasta1)

  await review2.setUser(user2)
  await review2.setProduct(pasta2)

  await review3.setUser(user1)
  await review3.setProduct(pasta3)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
