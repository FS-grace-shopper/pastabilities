const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//get all products from 'Product' Table
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//get products with single filter
router.get('/:category', async (req, res, next) => {
  const shapeOrType = req.params.category

  const queryByShapeOrType = shapeOrType => {
    const shapes = ['long', 'ribbon', 'tubular', 'stuffed', 'shaped']
    const types = ['semolina', 'gluten-free', 'whole-wheat']
    console.log(shapeOrType)
    console.log(shapes.indexOf(shapeOrType))
    if (shapes.indexOf(shapeOrType) > -1)
      return Product.findAll({where: {shape: shapeOrType}})
    else if (types.indexOf(shapeOrType) > -1)
      return Product.findAll({where: {type: shapeOrType}})
    else return 'invalid category'
  }

  try {
    const products = queryByShapeOrType(shapeOrType)
    console.log('Found products?', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//get products based on search terms
// router.get('/search/:terms', (req, res, next) => {
//   const searchTerms = req.params.terms.split('+')
//   res.json(searchTerms)
//   try {
//     const products = Product.findAll()
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

//get single product by id
router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const singleProduct = await Product.findById(productId)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

//create new product in database
router.post('/', async (req, res, next) => {
  const {name, description, price, quantity, image, type, shape} = req.body.data

  try {
    newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      image,
      type,
      shape
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

//update existing product in database
//passes req.body directly into Product.update; probably a security risk, fix later? also anyone can update the database, thats not good
router.put('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    Product.update(req.body, {where: {id: productId}})
    const updatedProduct = await Product.findById(productId)
    res.json(updatedProduct.dataValues)
  } catch (err) {
    next(err)
  }
})
