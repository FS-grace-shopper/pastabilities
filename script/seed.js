'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Review,
  Order,
  orderProduct,
  Cart,
  cartProduct
} = require('../server/db/models')

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
    name: 'Pasta Greg',
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
  },
  {
    name: 'Paginate Pasta',
    description: 'Tasts awful',
    price: 30000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Fake Pasta',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta1',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta2',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta3',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta4',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
    shape: 'long'
  },
  {
    name: 'Pasta5',
    description: "You'll never remember it",
    price: 100,
    quantity: 1,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'whole-wheat',
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

const dummyOrders = [
  {
    status: 'completed',
    orderDate: new Date(),
    email: 'Test@user.com'
  },
  {
    status: 'cancelled',
    orderDate: new Date(),
    email: 'Test2@user.com'
  },
  {
    status: 'processing',
    orderDate: new Date(),
    email: 'Test3@user.com'
  }
]

const dummyCarts = [{}, {}, {}]

const dummyReviews = [
  {
    rating: 2.5,
    comment: 'mehhhhh'
  },
  {
    rating: 1.5,
    comment: 'ewwwww'
  },
  {
    rating: 5,
    comment: 'yummmmmmmm'
  },
  {
    rating: 4,
    comment: 'could have been better'
  },
  {
    rating: 0.7,
    comment: 'not edible'
  },
  {
    rating: 3,
    comment: 'mehhhhh'
  }
]

const dummyOrderProducts = [
  {
    quantity: 1,
    price: 1999,
    productId: 1,
    orderId: 1
  },
  {
    quantity: 2,
    price: 499,
    productId: 1,
    orderId: 2
  },
  {
    quantity: 3,
    price: 1849,
    productId: 2,
    orderId: 1
  },
  {
    quantity: 2,
    price: 2500,
    productId: 3,
    orderId: 1
  },
  {
    quantity: 1,
    price: 399,
    productId: 4,
    orderId: 3
  },
  {
    quantity: 4,
    price: 2499,
    productId: 4,
    orderId: 2
  }
]

const dummyCartProducts = [
  {
    quantity: 1,
    productId: 1,
    cartId: 1
  },
  {
    quantity: 2,
    productId: 1,
    cartId: 2
  },
  {
    quantity: 3,
    productId: 2,
    cartId: 1
  },
  {
    quantity: 2,
    productId: 3,
    cartId: 1
  },
  {
    quantity: 1,
    productId: 4,
    cartId: 3
  },
  {
    quantity: 4,
    productId: 4,
    cartId: 2
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [product, user, review, order, cart] = await Promise.all([
    Product.bulkCreate(pastaProduct, {returning: true}),
    User.bulkCreate(dummyUsers, {individualHooks: true, returning: true}),
    Cart.bulkCreate(dummyCarts, {returning: true}),
    Review.bulkCreate(dummyReviews, {returning: true}),
    Order.bulkCreate(dummyOrders, {returning: true}),
    Cart.bulkCreate(dummyCarts, {returning: true})
  ])
  const [orderproduct, cartproduct] = await Promise.all([
    orderProduct.bulkCreate(dummyOrderProducts, {returning: true}),
    cartProduct.bulkCreate(dummyCartProducts, {returning: true})
  ])
  const [pasta1, pasta2, pasta3, pasta4, pasta5, pasta6] = product
  const [user1, user2, user3, user4, user5] = user
  const [review1, review2, review3, review4, review5, review6] = review
  const [order1, order2, order3] = order
  const [cart1, cart2, cart3] = cart

  await review1.setUser(user1)
  await review1.setProduct(pasta1)

  await review2.setUser(user2)
  await review2.setProduct(pasta2)

  await review3.setUser(user1)
  await review3.setProduct(pasta2)

  await review4.setUser(user3)
  await review4.setProduct(pasta4)

  await review5.setUser(user4)
  await review5.setProduct(pasta5)

  await review6.setUser(user4)
  await review6.setProduct(pasta6)

  await order1.setUser(user1)
  await order2.setUser(user2)
  await order3.setUser(user1)

  await cart1.setUser(user1)
  await cart2.setUser(user2)
  await cart3.setUser(user3)
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
