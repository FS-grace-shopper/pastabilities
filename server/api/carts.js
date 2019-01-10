const router = require('express').Router()
const {Cart, cartProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//authenticate
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//get all carts from 'Cart' Table -- for admins only
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//get single cart by sessionId -- EAGER LOAD PRODUCTS
router.get('/:sessionId', async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId
    const singleCart = await Cart.findOne({
      where: {
        sessionId
      },
      include: [Product]
    })
    res.json(singleCart)
  } catch (err) {
    next(err)
  }
})

//add or get cart by sessionId
router.post('/:sessionId', async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId
    console.log(req.session)
    //maybe use req.session eventually?
    const [instance, wasCreated] = await Cart.findOrCreate({where: {sessionId}})
    res.json(instance)
  } catch (err) {
    next(err)
  }
})

//add item to cart
router.post('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartId = +req.params.cartId
    const productId = +req.params.productId
    const productAddQty = +req.body.quantity
    //maybe use req.session eventually?
    if (productAddQty > 0) {
      const [instance, wasCreated] = await cartProduct.findOrCreate({
        where: {
          cartId,
          productId
        }
      })
      if (!wasCreated) {
        await instance.update({quantity: instance.quantity + productAddQty})
      } else {
        await instance.update({quantity: productAddQty})
      }
      res.json(instance)
    } else {
      res.json(0)
    }
  } catch (err) {
    next(err)
  }
})

//update item in cart -- deletes if quantity is set to 0
router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartId = +req.params.cartId
    const productId = +req.params.productId
    const productNewQty = +req.body.quantity
    //maybe use req.session eventually?
    let isUpdated
    if (productNewQty === 0) {
      isUpdated = await cartProduct.destroy({
        where: {
          cartId,
          productId
        }
      })
    } else {
      isUpdated = await cartProduct.update(
        {quantity: productNewQty},
        {
          where: {
            cartId,
            productId
          }
        }
      )
    }

    // update with conditions doesn't return the object--returns '1' if updated
    res.json(isUpdated[0])
  } catch (err) {
    next(err)
  }
})

//delete cart in database by sessionId
router.delete('/session/:sessionId', (req, res, next) => {
  try {
    const sessionId = req.params.sessionId
    Cart.destroy({
      where: {
        sessionId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//delete cart in database by userId
router.delete('/user/:userId', (req, res, next) => {
  try {
    const userId = req.params.userId
    Cart.destroy({
      where: {
        userId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
